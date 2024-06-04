

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from "react-toastify";

export default function Upload() {
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [processedData, setProcessedData] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileContent(file);
            await uploadFile(file); // Call uploadFile immediately after setting fileContent
        } else {
            setFileName('');
            setFileContent(null);
        }
    };

    const parseCSV = (csvText) => {
        const jsonData = JSON.parse(csvText);
        return jsonData;
    };

    const uploadFile = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://127.0.0.1:5000/upload-csv', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setProcessedData(parseCSV(data.data));
            toast.success("File uploaded successfully");
        } catch (error) {
            console.error('Error:', error);
            toast.error("Error uploading file");
        }
    };

    return (
        <div>
            <Button
                id='upload-btn'
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                file
                <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
            </Button>
            {fileName && <span id="file-name">{fileName}</span>}
            <div className="container">
                {processedData && (
                    <div className="table-container">
                        <table className="csv-table">
                            <thead>
                                <tr>
                                    {processedData.columns.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {processedData.data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, colIndex) => (
                                            <td key={colIndex}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
