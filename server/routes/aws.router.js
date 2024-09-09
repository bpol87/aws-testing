const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const s3Client = require('./s3.js')
const dotenv = require('dotenv').config();

  router.post("/", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
  
      const contentType = file.mimetype;
  
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: contentType,
      };
  
      const response = await s3Client.send(new PutObjectCommand(params));
      console.log("File uploaded to S3:", response);
  
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${file.originalname}`;
  
      res.status(200).json({ fileUrl: fileUrl });
    } catch (error) {
      console.error("Failed to upload file to S3:", error);
      res.status(500).json({ error: "Failed to upload file to S3" });
    }
  });


  module.exports = router;

