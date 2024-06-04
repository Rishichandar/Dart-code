

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from "react-toastify";
import Fab from '@mui/material/Fab';
import DownloadIcon from '@mui/icons-material/Download';

export default function Upload() {
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [processedData, setProcessedData] = useState(null);
    const [fileAdded, setFileAdded] = useState(false); // State to track if file is added

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileContent(file);
            setFileAdded(true); // Set fileAdded to true when file is added
            await uploadFile(file); // Call uploadFile immediately after setting fileContent
        } else {
            setFileName('');
            setFileContent(null);
            setFileAdded(false); // Set fileAdded to false when no file is added
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
//for download as csv

const downloadCSV = () => {
    if (!processedData) return;

    // Convert columns and rows to CSV format
    const headers = processedData.columns.map(col => `"${col}"`).join(',');
    const rows = processedData.data.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'processed_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

    return (
        <div>
              {fileAdded && ( // Conditionally render the download button
                <Fab color="primary" aria-label="add" id='download' onClick={downloadCSV}>
                    < DownloadIcon />
                </Fab>
            )} 
            <Button
            color="primary"
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
