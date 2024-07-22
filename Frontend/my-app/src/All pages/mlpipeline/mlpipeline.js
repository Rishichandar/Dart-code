
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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar from Material-UIs
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";

export default function Mlpipeline() {
    const { csvData } = useContext(CsvContext);
    const [persistedData, setPersistedData] = useState(null);
    // const [processedData, setProcessedData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedTechnique, setSelectedTechnique] = useState(null);
    const [isSelectingTargetColumn1, setIsSelectingTargetColumn1] = useState(false);
    const [isSelectingTargetColumn2, setIsSelectingTargetColumn2] = useState(false);
    const [targetColumn1, setTargetColumn1] = useState('');
    const [targetColumn2, setTargetColumn2] = useState('');
    const [newData, setNewData] = useState({});
    const [predictions, setPredictions] = useState([]);
    const [modelAccuracies, setModelAccuracies] = useState({});
    const [bestModel, setBestModel] = useState('');
    const [bestScore, setBestScore] = useState(null);
    const [showNewDataInput, setShowNewDataInput] = useState(false); // State to manage visibility of new data input
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State to manage snackbar visibility
    const [confirmNewData, setConfirmNewData] = useState(false); // State to track user confirmation for new data

    const navigate = useNavigate();

    // useEffect(() => {
    //     const savedData = localStorage.getItem('processData');
    //     if (savedData) {
    //         const parsedData = JSON.parse(savedData);
    //         console.log("parsed Data",parsedData)
    //         setPersistedData(parsedData);
    //     }
    // }, []);
    useEffect(() => {
        const savedData = localStorage.getItem('processData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setPersistedData(parsedData);
            console.log("parseddata :", parsedData);
        }
    }, []);


    // useEffect(() => {
    //     if (csvData) {
    //         localStorage.setItem('csvData', JSON.stringify(csvData));
    //         setPersistedData(csvData);
    //     }
    // }, [csvData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSidebarOpen(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // const handleConfirmTargetColumn = async (targetColumn, technique) => {
    //     try {
    //         if (!targetColumn) {
    //             alert('Please select a target column');
    //             return;
    //         }

    //         if (!persistedData || !persistedData.data || !persistedData.columns) {
    //             throw new Error('No file found in persistedData');
    //         }

    //         const headers = persistedData.columns;
    //         const rows = persistedData.data;

    //         const data = {
    //             columns: headers,
    //             data: rows
    //         };

    //         const payload = {
    //             data: data,
    //             target_column: targetColumn,
    //             model_type: technique === 'Classification' ? 'Classification' : 'Regression'
    //         };

    //         const response = await axios.post('http://127.0.0.1:5000/train_and_predict', payload, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         if (response.data.error) {
    //             throw new Error(response.data.error);
    //         }

    //         setSelectedTechnique(technique);
    //         setIsSelectingTargetColumn1(false);
    //         setIsSelectingTargetColumn2(false);
    //         toast.success("Process applied successfully");

    //         if (response.data.predictions) {
    //             setPredictions(response.data.predictions);
    //         }

    //         if (response.data.modelAccuracies && response.data.bestModel && response.data.bestScore) {
    //             setModelAccuracies(response.data.modelAccuracies);
    //             setBestModel(response.data.bestModel);
    //             setBestScore(response.data.bestScore);
    //             setSnackbarOpen(true); // Open the snackbar after model accuracies are loaded
    //         }
    //     } catch (error) {
    //         console.error('Error processing the data:', error);
    //         alert('Error processing the data');
    //     }
    // };

    const handleConfirmTargetColumn = async (targetColumn, technique) => {
        try {
            if (!targetColumn) {
                alert('Please select a target column');
                return;
            }

            if (!persistedData || !persistedData.data || !persistedData.columns) {
                throw new Error('No file found in persistedData');
            }

            // Parse the persisted data to ensure it's in the correct format
            const headers = persistedData.columns;
            let rows = persistedData.data;

            // Check if data is a JSON string and parse it if necessary
            if (typeof rows === 'string') {
                rows = JSON.parse(rows);
            }

            // Validate data
            if (!Array.isArray(rows) || !rows.every(row => Array.isArray(row) && row.length === headers.length)) {
                throw new Error("All rows must be arrays and have the same number of elements as columns");
            }

            const data = {
                columns: headers,
                data: rows
            };

            console.log('Sending data to backend:', data); // Add this line for debugging

            const payload = {
                data: data,
                target_column: targetColumn,
                model_type: technique === 'Classification' ? 'Classification' : 'Regression'
            };

            const response = await axios.post('http://127.0.0.1:5000/train_and_predict', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            setSelectedTechnique(technique);
            setIsSelectingTargetColumn1(false);
            setIsSelectingTargetColumn2(false);
            toast.success("Process applied successfully");

            if (response.data.predictions) {
                setPredictions(response.data.predictions);
            }

            if (response.data.modelAccuracies && response.data.bestModel && response.data.bestScore) {
                setModelAccuracies(response.data.modelAccuracies);
                setBestModel(response.data.bestModel);
                setBestScore(response.data.bestScore);
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error processing the data:', error);
            alert('Error processing the data: ' + error.message);
        }
    };


    const handleTargetColumnChange1 = (event) => {
        setTargetColumn1(event.target.value);
    };

    const handleTargetColumnChange2 = (event) => {
        setTargetColumn2(event.target.value);
    };

    const handleCancelTargetColumnSelection1 = () => {
        setIsSelectingTargetColumn1(false);
    };

    const handleCancelTargetColumnSelection2 = () => {
        setIsSelectingTargetColumn2(false);
    };

    const uploadPage = () => {
        navigate('/Imbalanceddataset');
    };

    const handleClassificationClick = () => {
        setIsSelectingTargetColumn1(true);
        setIsSelectingTargetColumn2(false); // Ensure the other selection is closed
    };

    const handleRegressionClick = () => {
        setIsSelectingTargetColumn2(true);
        setIsSelectingTargetColumn1(false); // Ensure the other selection is closed
    };

    const handleNewDataChange = (event) => {
        const { name, value } = event.target;
        setNewData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePredict = async () => {
        try {
            // Convert columns to appropriate types
            const convertedData = {};
            Object.keys(newData).forEach(key => {
                const value = newData[key];
                if (typeof value === 'string') {
                    // Example: Convert to number if it's numeric
                    const numberValue = Number(value);
                    if (!isNaN(numberValue)) {
                        convertedData[key] = numberValue;
                    } else {
                        convertedData[key] = value; // Keep as string if not numeric
                    }
                } else {
                    convertedData[key] = value; // Keep non-string types as is
                }
            });

            const payload = {
                new_data: [convertedData]
            };

            const response = await axios.post('http://127.0.0.1:5000/predict', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            if (response.data.predictions) {
                setPredictions(response.data.predictions);
            }
        } catch (error) {
            console.error('Error predicting the data:', error);
            alert('Error predicting the data');
        }
    };

    const handleConfirmNewData = () => {
        setConfirmNewData(true);
        setSnackbarOpen(false); // Close snackbar after confirming new data
    };

    const handleCancelNewData = () => {
        setConfirmNewData(false);
        setSnackbarOpen(false); // Close snackbar after canceling new data
    };

    useEffect(() => {
        if (confirmNewData) {
            setShowNewDataInput(true); // Show new data input after confirmation
        }
    }, [confirmNewData]);

    // const dataToDisplay = persistedData || csvData;

    return (
        <>
            <span variant="outlined" style={{ float: 'left', position:'relative',left:'265px',top:'270px' }} onClick={uploadPage}><  FaChevronCircleLeft size={25}  /></span>
            <span id="preproccess">Mlpipeline</span>
            {selectedTechnique && (
                <span id='mode-select3'>{selectedTechnique}</span>
            )}

            {Object.keys(modelAccuracies).length > 0 ? (
                <div id='modelAccuracies'>
                    <div className="model-accuracies-container">
                        <table className="model-accuracies-table">
                            <thead>
                                <tr>
                                    <th>Model</th>
                                    <th>Accuracy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(modelAccuracies).map((model, index) => (
                                    <tr key={index}>
                                        <td>{model}</td>
                                        <td>{modelAccuracies[model]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <p id='bestmodel'>Best Model: {bestModel} with a score of {bestScore}</p>
                    </div>
                </div>
            ) : (
                persistedData && (
                    <div className="table-container6">
                        <table className="csv-table6">
                            <thead>
                                <tr>
                                    {persistedData.columns.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            {/* <tbody>
                            {persistedData.data && JSON.parse(persistedData.data).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((cell, colIndex) => (
                                        <td key={colIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody> */}
                            <tbody>
                                {(() => {
                                    if (persistedData.data) {
                                        // Check if the data is in JSON string format
                                        try {
                                            const jsonData = JSON.parse(persistedData.data);
                                            if (Array.isArray(jsonData)) {
                                                return jsonData.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {Object.values(row).map((cell, colIndex) => (
                                                            <td key={colIndex}>{cell}</td>
                                                        ))}
                                                    </tr>
                                                ));
                                            }
                                        } catch (e) {
                                            // If JSON.parse fails, it's not in JSON string format
                                        }

                                        // Check if the data is in array format directly
                                        if (Array.isArray(persistedData.data)) {
                                            return persistedData.data.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {row.map((cell, colIndex) => (
                                                        <td key={colIndex}>{cell}</td>
                                                    ))}
                                                </tr>
                                            ));
                                        }
                                    }

                                    // If the data is in an invalid format, show an error message
                                    return (
                                        <tr>
                                            <td colSpan={persistedData.columns.length}>Invalid data format</td>
                                        </tr>
                                    );
                                })()}
                            </tbody>
                            {/* <tbody>
                                {Array.isArray(persistedData.data) ? (
                                    persistedData.data.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell, colIndex) => (
                                                <td key={colIndex}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={persistedData.columns.length}>Invalid data format</td>
                                    </tr>
                                )}
                            </tbody> */}

                        </table>
                    </div>
                )
            )}

            {/* Snackbar for new data confirmation */}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message="Do you want to predict new data?"
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleCancelNewData}>
                            No
                        </Button>
                        <Button color="primary" size="small" onClick={handleConfirmNewData}>
                            Yes
                        </Button>
                    </React.Fragment>
                }
            />

            {showNewDataInput && (
                <div className="new-data-input" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px', maxWidth: '300px', height: '260px', overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Enter New Data for Prediction</h3>
                    <form style={{ marginBottom: '0' }}>
                        {persistedData && persistedData.columns
                            .filter(column => column !== targetColumn1 && column !== targetColumn2)
                            .map((column, index) => (
                                <div key={index} style={{ marginBottom: '4px' }}>
                                    <label htmlFor={column} style={{ display: 'block', marginBottom: '2px', fontSize: '12px' }}>{column}</label>
                                    <input
                                        type="text"
                                        id={column}
                                        name={column}
                                        onChange={handleNewDataChange}
                                        style={{ width: '100%', fontSize: '12px', padding: '3px', boxSizing: 'border-box' }}
                                    />
                                </div>
                            ))
                        }
                        <div className="button-container"> {/* New container for the button */}
                            <Button variant="outlined" onClick={handlePredict} style={{ fontSize: '12px', padding: '4px 8px' }}>
                                Predict
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className={`sidebar4 ${isSidebarOpen ? 'open' : ''}`}>
                <Tooltip title="Preprocess Technique" arrow>
                    <div className="toggle-button4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
                    </div>
                </Tooltip>
                {isSidebarOpen && (
                    <div className="sidebar-content4">
                        <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
                            {isSelectingTargetColumn1 ? (
                                <div className="target-column-selection">
                                    <label htmlFor="targetColumn1">Select Column:</label>
                                    <select id="targetColumn1" name="targetColumn1" value={targetColumn1} onChange={handleTargetColumnChange1}>
                                        <option value="">Select Column</option>
                                        {persistedData.columns.map((column, index) => (
                                            <option key={index} value={column}>{column}</option>
                                        ))}
                                    </select>
                                    <div>
                                        <span onClick={() => handleConfirmTargetColumn(targetColumn1, 'Classification')}>
                                            <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
                                        </span>
                                        <span onClick={handleCancelTargetColumnSelection1}>
                                            <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <li
                                    style={{ marginBottom: '30px', cursor: 'pointer' }}
                                    onClick={handleClassificationClick}
                                >
                                    Classification
                                </li>
                            )}
                            {isSelectingTargetColumn2 ? (
                                <div className="target-column-selection">
                                    <label htmlFor="targetColumn2">Select Column:</label>
                                    <select id="targetColumn2" name="targetColumn2" value={targetColumn2} onChange={handleTargetColumnChange2}>
                                        <option value="">Select Column</option>
                                        {persistedData.columns.map((column, index) => (
                                            <option key={index} value={column}>{column}</option>
                                        ))}
                                    </select>
                                    <div>
                                        <span onClick={() => handleConfirmTargetColumn(targetColumn2, 'Regression')}>
                                            <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
                                        </span>
                                        <span onClick={handleCancelTargetColumnSelection2}>
                                            <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <li
                                    style={{ marginBottom: '30px', cursor: 'pointer' }}
                                    onClick={handleRegressionClick}
                                >
                                    Regression
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {predictions.length > 0 && (
                <span className="predictions">Predicted Value :<span>{predictions[0]}</span></span>
            )}
        </>
    );
}


