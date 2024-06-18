import Tooltip from '@mui/material/Tooltip';
import React, { useContext, useEffect, useState } from 'react';
import { CsvContext } from '../csvcontext/csvcontext';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Featureengineer() {
    const { csvData } = useContext(CsvContext);
    const [persistedData, setPersistedData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [processedData, setProcessedData] = useState(null);
    const [selectedTechnique, setSelectedTechnique] = useState(null);
    console.log(processedData)

    const navigate = useNavigate();
    useEffect(() => {
        const savedData = localStorage.getItem('csvData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setPersistedData(parsedData);
        }
    }, []);

    useEffect(() => {
        if (csvData) {
            localStorage.setItem('csvData', JSON.stringify(csvData));
            setPersistedData(csvData);
        }
    }, [csvData]);
    useEffect(() => {
        // Open the sidebar after 1 second
        const timer = setTimeout(() => {
            setIsSidebarOpen(true);
        }, 800);

        // Clear the timer on component unmount
        return () => clearTimeout(timer);
    }, []);
    const handleItemClick = (item) => {
        setActiveItem(activeItem === item ? null : item);
    };

    const dataToDisplay = processedData || csvData || persistedData;

    const uploadPage = () => {
        navigate('/upload');
    };

    const handleFeatureScalingClick = async (method, text) => {
        try {
            if (!persistedData || !persistedData.data || !persistedData.columns) {
                console.error('No file found in persistedData');
                alert('No file found in persistedData');
                return;
            }

            // Prepare CSV content from persistedData
            const headers = persistedData.columns.join(',');
            const rows = persistedData.data.map(row => row.join(',')).join('\n');
            const csvContent = `${headers}\n${rows}`;

            // Create a Blob from CSV content
            const csvData = new Blob([csvContent], { type: 'text/csv' });

            // Create FormData and append CSV file and scaling method
            const formData = new FormData();
            formData.append('file', csvData, 'data.csv');
            formData.append('scaling_method', method);

            // Send POST request to backend
            const response = await axios.post('http://127.0.0.1:5000/scale', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Use multipart/form-data for file uploads
                }
            });

            // Process response from backend
            // setProcessedData(response.data);
            setProcessedData(response.data.scaled_data);
            setSelectedTechnique(text);
        } catch (error) {
            console.error('Error processing the data:', error);
            alert('Error processing the data');
        }
    };

    ///render details
    const renderDetails = (item) => {
        switch (item) {
            case 'Featurescaling':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleFeatureScalingClick('standard', 'Standardization')}>
                            <ArrowRightIcon /> Standardization
                            {/* onClick={() => handleAugmentationClick('mean', 'Mean')} */}
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleFeatureScalingClick('normalization', 'Normalization')} >
                            <ArrowRightIcon /> Normalization
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text"  onClick={() => handleFeatureScalingClick('cliplog', 'Cliplog')}>
                            <ArrowRightIcon /> Clip-log
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text"  onClick={() => handleFeatureScalingClick('z-score', 'Z-score')}>
                            <ArrowRightIcon /> z-score
                        </li>

                    </ul>
                );
            case 'Featureextraction':
                return (

                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> PCA
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> Polynomial
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> Expansion
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> select k-best
                        </li>
                    </ul>

                );
            case 'Featureimportance':
                return (

                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> Randomforest
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> XGboost
                        </li>
                    </ul>
                );
            default:
                return null;
        }
    };



    return (
        <>
            <Button variant="outlined" style={{ float: 'right', marginRight: '50px', marginTop: '15px', }} onClick={uploadPage}>< ArrowBackIcon fontSize="smaller" style={{ position: 'relative', right: '3px' }} />Back</Button>
            <span id='FeatureEngineering'>FeatureEngineering</span>
            {selectedTechnique && (
                <span id='mode-select2'>{selectedTechnique}</span>
            )}
            <div className="data-container3"></div>
            {dataToDisplay && (
                <div className="table-container1">
                    <table className="csv-table1">
                        <thead>
                            <tr>
                                {dataToDisplay.columns.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataToDisplay.data.map((row, rowIndex) => (
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

            <div className={`sidebar2 ${isSidebarOpen ? 'open' : ''}`}>
                <Tooltip title="preprocess technique" arrow>
                    <div className="toggle-button2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
                    </div>
                </Tooltip>
                {isSidebarOpen && (
                    <div className="sidebar-content2">
                        <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
                            <li
                                style={{ marginBottom: '20px', cursor: 'pointer' }}
                                onClick={() => handleItemClick('Featurescaling')}
                            >
                                Featurescaling
                                {activeItem === 'Featurescaling' && renderDetails('Featurescaling')}
                            </li>
                            <li
                                style={{ marginBottom: '30px', cursor: 'pointer' }}
                                onClick={() => handleItemClick('Featureextraction')}
                            >
                                Featureextraction
                                {activeItem === 'Featureextraction' && renderDetails('Featureextraction')}
                            </li>
                            <li
                                style={{ marginBottom: '30px', cursor: 'pointer' }}
                                onClick={() => handleItemClick('Featureimportance')}
                            >
                                Featureimportance
                                {activeItem === 'Featureimportance' && renderDetails('Featureimportance')}
                            </li>

                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}