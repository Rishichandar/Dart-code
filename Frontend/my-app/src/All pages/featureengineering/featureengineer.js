



import React, { useContext, useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { CsvContext } from '../csvcontext/csvcontext';
import { toast } from "react-toastify";

export default function Featureengineer() {
    const { csvData } = useContext(CsvContext);
    const [persistedData, setPersistedData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [pca, setPca] = useState(null);
    const [processedData, setProcessedData] = useState(null);
    const [selectedTechnique, setSelectedTechnique] = useState(null);
    console.log("selectedtech", selectedTechnique);
    const [numComponents, setNumComponents] = useState(2);
    const [selectKBest, setSelectKBest] = useState(null);
    const [kValue, setKValue] = useState(5);
    const [isSelectingTargetColumn, setIsSelectingTargetColumn] = useState(false);
    const [targetColumn, setTargetColumn] = useState('');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
    const [featureRanking, setFeatureRanking] = useState(null);
    console.log("Ranking", featureRanking)
    const [plotUrl, setPlotUrl] = useState(null);
    const [loadingPlot, setLoadingPlot] = useState(false);

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
        const timer = setTimeout(() => {
            setIsSidebarOpen(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleItemClick = (item) => {
        setActiveItem(activeItem === item ? null : item);
        setSelectedTechnique(null); // Reset selected technique when clicking different item
        setPlotUrl(null); // Reset plot URL when clicking different item
        setFeatureRanking(null); // Reset feature ranking when clicking different item
    };

    const handleItemClick1 = (item) => {
        if (item === 'PCA') {
            setPca(item);
        } else {
            setPca(null);
        }
        setSelectKBest(item);
    };

    const handleFeatureScalingClick = async (method, text) => {
        try {
            if (!persistedData || !persistedData.data || !persistedData.columns) {
                console.error('No file found in persistedData');
                alert('No file found in persistedData');
                return;
            }

            const headers = persistedData.columns.join(',');
            const rows = persistedData.data.map(row => row.join(',')).join('\n');
            const csvContent = `${headers}\n${rows}`;
            const csvData = new Blob([csvContent], { type: 'text/csv' });
            const formData = new FormData();
            formData.append('file', csvData, 'data.csv');
            formData.append('scaling_method', method);

            const response = await axios.post('http://127.0.0.1:5000/scale', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProcessedData(response.data.scaled_data);
            setSelectedTechnique(text);
            toast.success("proccess applied");
        } catch (error) {
            console.error('Error processing the data:', error);
            alert('Error processing the data');
        }
    };

    const handleFeatureExtractionClick = async (method, text, nComponents = 2) => {
        try {
            if (!persistedData || !persistedData.data || !persistedData.columns) {
                console.error('No file found in persistedData');
                alert('No file found in persistedData');
                return;
            }

            const headers = persistedData.columns.join(',');
            const rows = persistedData.data.map(row => row.join(',')).join('\n');
            const csvContent = `${headers}\n${rows}`;
            const csvData = new Blob([csvContent], { type: 'text/csv' });
            const formData = new FormData();
            formData.append('file', csvData, 'data.csv');
            formData.append('method', method);
            formData.append('n_components', nComponents);

            if (method === 'select k-best') {
                formData.append('k', kValue);
            }

            const response = await axios.post('http://127.0.0.1:5000/feature-extraction', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProcessedData(response.data);
            setSelectedTechnique(text);
            toast.success("proccess applied");
        } catch (error) {
            console.error('Error processing the data:', error);
            alert('Error processing the data');
        }
    };

    const handleConfirmTargetColumn = (algorithm, text) => {
        setIsSelectingTargetColumn(true);
        setSelectedAlgorithm(algorithm);

        console.log(text)
    };

    const handleFeatureImportance = async (text) => {
        try {
            if (!targetColumn) {
                alert('Please select a target column');
                return;
            }

            if (!persistedData || !persistedData.columns) {
                console.error('No file found in persistedData');
                alert('No file found in persistedData');
                return;
            }

            const headers = persistedData.columns.join(',');
            const rows = persistedData.data.map(row => row.join(',')).join('\n');
            const csvContent = `${headers}\n${rows}`;
            const csvData = new Blob([csvContent], { type: 'text/csv' });

            const formData = new FormData();
            formData.append('file', csvData, 'data.csv');
            formData.append('targetColumn', targetColumn);
            formData.append('algorithm', selectedAlgorithm);
            console.log("selected algorithm", selectedAlgorithm)

            setLoadingPlot(true);

            const response = await axios.post('http://127.0.0.1:5000/feature-importance', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setFeatureRanking(response.data.feature_ranking);
            setPlotUrl(`data:image/png;base64,${response.data.plot_url}`);
            setSelectedTechnique(text);
            toast.success("proccess applied");
        } catch (error) {
            console.error('Error processing the data:', error);
            toast.error("select only target column");
        } finally {
            setLoadingPlot(false);
            setIsSelectingTargetColumn(false);
        }
    };

    const renderDetails = (item) => {
        switch (item) {
            case 'Featurescaling':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleFeatureScalingClick('standard', 'Standardization')}>
                            <ArrowRightIcon /> Standardization
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleFeatureScalingClick('normalization', 'Normalization')}>
                            <ArrowRightIcon /> Normalization
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleFeatureScalingClick('cliplog', 'Cliplog')}>
                            <ArrowRightIcon /> Clip-log
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleFeatureScalingClick('z-score', 'Z-score')}>
                            <ArrowRightIcon /> Z-score
                        </li>
                    </ul>
                );
            case 'Featureextraction':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleItemClick1('PCA')}>
                            <ArrowRightIcon /> PCA
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleFeatureExtractionClick('polynomial', 'Polynomial')}>
                            <ArrowRightIcon /> Polynomial
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleFeatureExtractionClick('rfe', 'RFE')}>
                            <ArrowRightIcon /> RFE
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleItemClick1('SelectKBest')}>
                            <ArrowRightIcon /> SelectKBest
                        </li>
                    </ul>
                );
            case 'Featureimportance':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} onClick={() => handleConfirmTargetColumn('Random Forest', 'Random Forest')}>
                            <ArrowRightIcon style={{position:'relative',top:'8px'}}/> Randomforest
                        </li>
                        <li style={{ marginBottom: '7px' }} onClick={() => handleConfirmTargetColumn('XGBoost', 'XGBoost')}>
                            <ArrowRightIcon style={{position:'relative',top:'8px'}} /> Xgboost
                        </li>
                    </ul>
                );
            default:
                return null;
        }
    };

    const uploadPage = () => {
        navigate('/upload');
    };

    const handleTargetColumnChange = (event) => {
        setTargetColumn(event.target.value);
    };

    const handleCancelTargetColumnSelection = () => {
        setIsSelectingTargetColumn(false);
    };

    const dataToDisplay = processedData || csvData || persistedData;

    return (
        <>
            <Button variant="outlined" style={{ float: 'right', marginRight: '50px', marginTop: '15px' }} onClick={uploadPage}><ArrowBackIcon fontSize="smaller" style={{ position: 'relative', right: '3px' }} />Back</Button>
            <span id='FeatureEngineering'>FeatureEngineering</span>
            {selectedTechnique && (
                <span id='mode-select2'>{selectedTechnique}</span>
            )}
            <div className="data-container3"></div>
            {plotUrl ? (
                <div>
                    <h2>Plot</h2>
                    {loadingPlot ? (
                        <p>Loading plot...</p>
                    ) : (
                        <img src={plotUrl} alt="Feature Importance Plot" style={{ maxWidth: '52%', position: 'relative', bottom: '40px', left: '270px' }} />
                    )}
                </div>
            ) : (
                dataToDisplay && (
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
                )
            )}
            <div className={`sidebar2 ${isSidebarOpen ? 'open' : ''}`}>
                <Tooltip title="Preprocess technique" arrow>
                    <div className="toggle-button2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
                    </div>
                </Tooltip>
                {isSidebarOpen && (
                    <div className="sidebar-content2">
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
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
                                {pca === 'PCA' && (
                                    <ul style={{ listStyleType: 'none', padding: '10px' }}>
                                        <li style={{ marginBottom: '7px' }}>
                                            Select a range:
                                            <input
                                                type="range"
                                                min="1"
                                                max={persistedData?.columns?.length || 1}
                                                value={numComponents}
                                                onChange={(e) => setNumComponents(Number(e.target.value))}
                                            />
                                            {numComponents}
                                            <Button onClick={() => handleFeatureExtractionClick('pCA', 'PCA', numComponents)}>Apply PCA</Button>
                                            <Button onClick={() => setPca(null)}>Cancel</Button>
                                        </li>
                                    </ul>
                                )}
                                {selectKBest === 'SelectKBest' && (
                                    <ul style={{ listStyleType: 'none', padding: '10px' }}>
                                        <li style={{ marginBottom: '7px' }}>
                                            Select the range:
                                            <input
                                                type="range"
                                                min="1"
                                                max={persistedData?.columns?.length || 1}
                                                value={kValue}
                                                onChange={(e) => setKValue(Number(e.target.value))}
                                            />
                                            {kValue}
                                            <Button onClick={() => handleFeatureExtractionClick('select k-best', 'Select k-best', kValue)}>Apply Selectkbest</Button>
                                            <Button onClick={() => setSelectKBest(null)}>Cancel</Button>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            {isSelectingTargetColumn ? (
                                <div>
                                    <label htmlFor="targetColumn">Select Column:</label>
                                    <select id="targetColumn" style={{ marginLeft: '20px' }} name="targetColumn" value={targetColumn} onChange={handleTargetColumnChange}>
                                        <option value="">Select Column</option>
                                        {persistedData && persistedData.columns.map((column, index) => (
                                            <option key={index} value={column}>{column}</option>
                                        ))}
                                    </select>
                                    <span onClick={() => handleFeatureImportance(selectedAlgorithm)}><CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '5px' }} /></span>
                                    <span onClick={handleCancelTargetColumnSelection}><CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '0px' }} /></span>
                                </div>
                            ) : (
                                <li
                                    style={{ marginBottom: '30px', cursor: 'pointer' }}
                                    onClick={() => handleItemClick('Featureimportance')}
                                >
                                    Featureimportance
                                    {activeItem === 'Featureimportance' && renderDetails('Featureimportance')}
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            {featureRanking && (selectedTechnique === 'Randomforest' || selectedTechnique === 'XGBoost') && (
                <div id='featuretable'>
                    <span id='FeatureRanking'>Feature Ranking</span>
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        {featureRanking.map((feature, index) => (
                            <li key={index}>
                                {feature.feature_name} - Rank: {feature.rank} - Importance: {feature.importance}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
