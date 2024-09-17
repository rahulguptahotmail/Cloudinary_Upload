import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'djzuahch'); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dluxlnvq7/upload', // Replace with your Cloudinary cloud name
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        }
      );
      setUploadResult(response.data);
      console.log(response.data);
    } catch (error) {
      setUploadError(error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
      {uploadResult && (
        <div>
          <h3>Upload Successful</h3>
          <img src={uploadResult.secure_url} alt="Uploaded" style={{ maxWidth: '300px' }} />
        </div>
      )}
      {uploadError && <div>Error: {uploadError}</div>}
    </div>
  );
};

export default FileUpload;
