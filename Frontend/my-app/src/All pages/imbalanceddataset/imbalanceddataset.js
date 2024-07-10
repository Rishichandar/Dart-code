

import React, { useContext, useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CsvContext } from '../csvcontext/csvcontext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Imbalanceddataset() {
    const { csvData } = useContext(CsvContext);
    const [persistedData, setPersistedData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [processedData, setProcessedData] = useState(null);
    const [classDistributionImage, setClassDistributionImage] = useState(null);
    const [selectedTechnique, setSelectedTechnique] = useState(null);
    const [hasNullValues, setHasNullValues] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem('csvData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setPersistedData(parsedData);
            checkForNullValues(parsedData);
        }
    }, []);

    useEffect(() => {
        if (csvData) {
            localStorage.setItem('csvData', JSON.stringify(csvData));
            setPersistedData(csvData);
            checkForNullValues(csvData);
        }
    }, [csvData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSidebarOpen(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const checkForNullValues = (data) => {
        if (data && data.data) {
            const hasNulls = data.data.some(row => row.some(cell => cell === null || cell === ''));
            setHasNullValues(hasNulls);
        } else {
            setHasNullValues(true);
        }
    };

    const handleItemClick = async (item) => {
        try {
            // Check if the selected item requires null check
            if (['smote', 'borderline-smote', 'adasyn'].includes(item) && hasNullValues) {
                handleClickOpen();
                return;
            }

            if (!persistedData || !persistedData.data || !persistedData.columns) {
                throw new Error('No file found in persistedData');
            }

            const headers = persistedData.columns.join(',');
            const rows = persistedData.data.map(row => row.join(',')).join('\n');
            const csvContent = `${headers}\n${rows}`;

            const csvData = new Blob([csvContent], { type: 'text/csv' });
            const formData = new FormData();
            formData.append('file', csvData, 'data.csv');
            formData.append('method', item.toLowerCase());

            // Send request to backend
            const response = await axios.post('http://127.0.0.1:5000/balance', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Full Response:", response.data);

            // Check if balanced_data and image_url exist
            const { balanced_data, image_url } = response.data;

            if (balanced_data && image_url) {
                setProcessedData(balanced_data);
                setClassDistributionImage(`data:image/png;base64,${image_url}`);
                setSelectedTechnique(item);
                toast.success('Process applied successfully');
            } else {
                console.error('Missing balanced_data or image_url in response:', response.data);
                throw new Error('Missing balanced_data or image_url in response');
            }
        } catch (error) {
            console.error('Error processing the data:', error);
            toast.error('Error processing the data. Please try again.');

            if (error.response) {
                if (error.response.status === 400) {
                    console.log('Bad request:', error.response.data.error);
                } else if (error.response.status === 500) {
                    console.log('Internal server error:', error.response.data.error);
                }
            }
        }
    };

    const uploadPage = () => {
        navigate('/upload');
    };

    const dataToDisplay = csvData || persistedData;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="outlined"
                style={{ float: 'right', marginRight: '50px', marginTop: '15px' }}
                onClick={uploadPage}
            >
                <ArrowBackIcon fontSize="smaller" style={{ position: 'relative', right: '3px' }} />
                Back
            </Button>
            <span id="preproccess">Handling Imbalanced dataset</span>
            {selectedTechnique && (
                <span id='mode-select3'>{selectedTechnique}</span>
            )}
            <div className="data-container4"></div>
            {dataToDisplay && !processedData && (
                <div className="table-container4">
                    <table className="csv-table4">
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
            {processedData && (
                <div className="table-container5">
                    <table className="csv-table5">
                        <thead>
                            <tr>
                                {processedData.columns.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {processedData.data && JSON.parse(processedData.data).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((cell, colIndex) => (
                                        <td key={colIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {classDistributionImage && (
                <div className="image-container">
                    <img src={classDistributionImage} alt="Class Distribution" style={{ maxWidth: '35%', position: 'absolute', bottom: '60px', right: '10px ' }} />
                </div>
            )}
            <div className={`sidebar3 ${isSidebarOpen ? 'open' : ''}`}>
                <Tooltip title="preprocess technique" arrow>
                    <div className="toggle-button3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
                    </div>
                </Tooltip>
                {isSidebarOpen && (
                    <div className="sidebar-content3">
                        <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
                            <li
                                style={{ marginBottom: '20px', cursor: 'pointer' }}
                                onClick={() => handleItemClick('under')}
                            >
                                Under Sampling
                            </li>
                            <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('over')}>
                                Over Sampling
                            </li>
                            <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('smote')}>
                                SMOTE
                            </li>
                            <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('borderline-smote')}>
                                Borderline SMOTE
                            </li>
                            <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('adasyn')}>
                                ADASYN
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Warning"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Table contains null or nan values and doesn't support the selected preprocessing technique.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
