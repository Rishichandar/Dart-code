

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from "react-toastify";
import { MdCloudDownload } from "react-icons/md";
import { IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {Divider} from "@mui/material";
import {Link} from "react-router-dom";

export default function Upload() {
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [processedData, setProcessedData] = useState(null);
    const [fileAdded, setFileAdded] = useState(false);
    const [toggleBoxOpen, setToggleBoxOpen] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileContent(file);
            setFileAdded(true);
            setToggleBoxOpen(true);
            await uploadFile(file);
        } else {
            setFileName('');
            setFileContent(null);
            setFileAdded(false);
            setToggleBoxOpen(false);
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

    const downloadCSV = () => {
        if (!processedData) return;

        const headers = processedData.columns.map(col => `"${col}"`).join(',');
        const rows = processedData.data.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        const csvContent = `${headers}\n${rows}`;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'processed_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleToggleBoxClose = () => {
        setToggleBoxOpen(false);
    };

    const handleToggleBoxOpen = () => {
        setToggleBoxOpen(true);
    };

    return (
        <div>
            {fileAdded && (
                <button id='download' onClick={downloadCSV} style={{ border: 'none', background: "none" }}>
                    <MdCloudDownload color='grey' size={35} />
                </button>
            )}
            <Button
                color="primary"
                id='upload-btn'
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                File
                <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
            </Button>
            {fileAdded && (
            <IconButton onClick={handleToggleBoxOpen} style={{ float: 'right' }}>
                <ChevronLeftIcon id="arrow" />
            </IconButton>
             )}
            <Drawer anchor="right" open={toggleBoxOpen} onClose={handleToggleBoxClose}>
                <div style={{ width: 200, padding: 16 }}>
                    <IconButton onClick={handleToggleBoxClose} style={{ float: 'right' }}>
                        <CloseIcon />
                    </IconButton>
                    <h3>Process</h3>
                    <List >
                        <ListItem button >
                            <Link to="/data-preproccess" style={{ textDecoration: 'none', color: 'black' }}><span>Data-preprocessing</span></Link>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <Link to="/text-preproccess" style={{ textDecoration: 'none', color: 'black' }}><span>Text-preproccessing</span></Link>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                           <Link to="/Featureengineering" style={{ textDecoration: 'none', color: 'black' }}><span>Feature Engineering</span></Link>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <Link to="/Imbalanceddataset" style={{ textDecoration: 'none', color: 'black' }}><span>Handling Imbalanced Dataset</span></Link>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <Link to="/Mlpipeline" style={{ textDecoration: 'none', color: 'black' }}><span>Ml-Pipeline</span></Link>
                        </ListItem>
                        <Divider />
                    </List>
                </div>
            </Drawer>
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
