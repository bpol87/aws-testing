const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const multer = require('multer');
const dotenv = require('dotenv');
const axios = require('axios');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

// AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer configuration for file upload
const storage = multer.memoryStorage(); // Store file in memory buffer
const upload = multer({ storage: storage });

// Upload image to S3 using AWS SDK v3
const uploadToS3 = async (file) => {
  const fileKey = `${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_PHOTO_BUCKET_NAME,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const s3Url = `https://${process.env.AWS_PHOTO_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    return s3Url;
  } catch (err) {
    console.error('Error uploading to S3:', err);
    throw new Error('S3 upload failed');
  }
};

// Route for uploading image and text inputs
router.post('/upload', upload.single('image'), async (req, res) => {
  const { name, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Image not uploaded' });
  }

  try {
    // Upload the file to S3
    const imageUrl = await uploadToS3(req.file);
    console.log(imageUrl)

  //   // Insert data into PostgreSQL
  //   const query = 'INSERT INTO items(name, description, image_url) VALUES($1, $2, $3) RETURNING *';
  //   const values = [name, description, imageUrl];

  //   const result = await pool.query(query, values);
  //   res.status(200).json({
  //     message: 'Data saved successfully!',
  //     data: result.rows[0],
  //   });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

  module.exports = router;

