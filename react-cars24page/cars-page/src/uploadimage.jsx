import React, { useState } from 'react';
import axios from 'axios';
//#0682e8 COLOR REQUIRED FOR DARK BLUE
//&#8592
//&#9664

const UploadImageForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setUploadError(null); // Reset error when selecting a new file
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        if (!selectedFile) {
            setUploadError('Please select an image to upload.');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('imageData', selectedFile);
        formData.append('description', description);

        try {
            const response = await axios.post('http://localhost:3000/uploadImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Image uploaded successfully:', response.data);
            window.alert('Image uploaded successfully!');
            setSelectedFile(null);
            setDescription('');
            // Handle success, if needed
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadError('Error uploading image. Please try again.');
            // Handle error, if needed
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && <span>Selected file: {selectedFile.name}</span>}
            <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />
            <button type="submit" disabled={uploading}>Upload Image</button>
            {uploading && <span>Uploading...</span>}
            {uploadError && <span style={{ color: 'red' }}>{uploadError}</span>}
        </form>
    );
};

export default UploadImageForm;
