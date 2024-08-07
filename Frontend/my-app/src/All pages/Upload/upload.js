
import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from "react-toastify";
import { MdCloudDownload } from "react-icons/md";
import { IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { CsvContext } from '../csvcontext/csvcontext';
import { useNavigate } from 'react-router-dom';
import { MdCloudUpload } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';

export default function Upload() {
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const [processedData, setProcessedData] = useState(null);
    const [fileAdded, setFileAdded] = useState(false);
    const [toggleBoxOpen, setToggleBoxOpen] = useState(false);
    const { csvData, setCsvData } = useContext(CsvContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve CSV data from localStorage on component mount
        const savedData = localStorage.getItem('csvData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setProcessedData(parsedData);
            setCsvData(parsedData);
            setFileAdded(true);
        }
    }, []);

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
            const parsedData = parseCSV(data.data);
            setProcessedData(parsedData);
            setCsvData(parsedData); // Store the data in context

            // Save the processed data to localStorage
            localStorage.setItem('csvData', JSON.stringify(parsedData));

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

    const handleDataPreprocessClick = () => {
        navigate('/data-preproccess');
    };

    return (
        <div>
            {fileAdded && (
                <button id='download' onClick={downloadCSV} style={{ border: 'none', background: "none" }}>
                    <MdCloudDownload color='grey' size={35} />
                </button>
            )}
            <Button
                component="label"
                id='upload-btn'
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload your file
                <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
            </Button>
            
            {fileAdded && (
                <IconButton onClick={handleToggleBoxOpen} style={{ float: 'left', position: 'relative', left: '100px' }}>
                    <ArrowForwardIosIcon id="arrow" />
                </IconButton>
            )}
            <Drawer anchor="left" open={toggleBoxOpen} onClose={handleToggleBoxClose}>
                <div style={{ width: 200, padding: 20 }}>
                    <IconButton onClick={handleToggleBoxClose} style={{ float: 'right' }}>
                        <CloseIcon />
                    </IconButton>
                    <h3>Process</h3>
                    <List style={{ marginTop: '150px' }}>
                        <ListItem button onClick={handleDataPreprocessClick}>
                            <Link to="/data-preproccess" style={{ textDecoration: 'none', color: 'black' }}><span>Data-preprocessing</span></Link>
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
                        
                        <ListItem button>
                            <Link to="/text-preproccess" style={{ textDecoration: 'none', color: 'black' }}><span>Text-preproccessing</span></Link>
                        </ListItem>
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

