import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  // Dropzone hook for file selection
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
    multiple: false,
  });

  // Handle form submission
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile || !name || !description) {
      setUploadStatus('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('name', name);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:5001/api/aws/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus(`Data uploaded successfully: ${response.data.data.image_url}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading data.');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>

      {selectedFile && <p>Selected File: {selectedFile.name}</p>}

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
      </div>

      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
      </div>

      <button type="submit">Upload</button>

      {uploadStatus && <p>{uploadStatus}</p>}
    </form>
  );
};

// Basic dropzone styling
const dropzoneStyle = {
  border: '2px dashed #007bff',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '20px',
};

export default FileUploadForm;
