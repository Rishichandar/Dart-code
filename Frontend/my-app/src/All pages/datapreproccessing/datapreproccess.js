

import React, { useContext, useEffect, useState } from 'react';
import { CsvContext } from '../csvcontext/csvcontext';
import { Divider } from "@mui/material";
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

export default function Datapreproccessing() {
    const { csvData } = useContext(CsvContext);
    const [persistedData, setPersistedData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem('csvData');
        if (savedData) {
            setPersistedData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        if (csvData) {
            localStorage.setItem('csvData', JSON.stringify(csvData));
            setPersistedData(csvData);
        }
    }, [csvData]);

    const dataToDisplay = csvData || persistedData;

    const handleItemClick = (item) => {
        setActiveItem(activeItem === item ? null : item);
    };

    const renderDetails = (item) => {
        switch(item) {
            case 'Data Augmentation':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px' }}>
                        <li style={{ marginBottom: '7px' }}>Mean</li>
                        <li style={{ marginBottom: '7px' }}>Mode</li>
                        <li style={{ marginBottom: '7px' }}>Meadian</li>
                        <li style={{ marginBottom: '7px' }}>Constant</li>
                        <li style={{ marginBottom: '7px' }}>Linear Regression</li>
                        <li style={{ marginBottom: '7px' }}>Random Forest</li>
                    </ul>
                );
            case 'Data Reshaping':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px' }}>
                        <li style={{ marginBottom: '7px' }}>Standardize</li>
                        <li style={{ marginBottom: '7px' }}>Normalize</li>
                        <li style={{ marginBottom: '7px' }}>Box-cox</li>
                        <li style={{ marginBottom: '7px' }}>Yoe-Jhonson</li>
                        <li style={{ marginBottom: '7px' }}>Scaler</li>
                        <li style={{ marginBottom: '7px' }}>Min-Max</li>
                        <li style={{ marginBottom: '7px' }}>Log2</li>
                    </ul>
                );
            case 'Outlier Analysis':
                return(
                       <ul style={{ listStyleType: 'none', padding: '10px' }}>
                        <li style={{ marginBottom: '7px' }}>Z-Score</li>
                        <li style={{ marginBottom: '7px' }}>IQR</li>
                        </ul>
                );
            // Add more cases for other items as needed
            default:
                return null;
        }
    };

    return (
        <>
            <div className="data-container"></div>
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
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="toggle-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <SwitchLeftIcon/> : <SwitchRightIcon/>}
                </div>
                {isSidebarOpen && (
                    <div className="sidebar-content">
                        <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
                            <li 
                                style={{ marginBottom: '30px', cursor: 'pointer' }} 
                                onClick={() => handleItemClick('Data Augmentation')}
                            >
                                Data Augmentation
                                {activeItem === 'Data Augmentation' && renderDetails('Data Augmentation')}
                            </li>
                            <li 
                                style={{ marginBottom: '30px', cursor: 'pointer' }} 
                                onClick={() => handleItemClick('Data Reshaping')}
                            >
                                Data Reshaping 
                                {activeItem === 'Data Reshaping' && renderDetails('Data Reshaping')}
                            </li>
                            <li 
                                style={{ marginBottom: '30px', cursor: 'pointer' }} 
                                onClick={() => handleItemClick('Data Aggregation')}
                            >
                                Data Aggregation
                                {activeItem === 'Data Aggregation' && renderDetails('Data Aggregation')}
                            </li>
                            <li 
                                style={{ marginBottom: '30px', cursor: 'pointer' }} 
                                onClick={() => handleItemClick('Data Segmentation')}
                            >
                                Data Segmentation 
                                {activeItem === 'Data Segmentation' && renderDetails('Data Segmentation')}
                            </li>
                            <li 
                                style={{ marginBottom: '30px', cursor: 'pointer' }} 
                                onClick={() => handleItemClick('Outlier Analysis')}
                            >
                                Outlier Analysis
                                {activeItem === 'Outlier Analysis' && renderDetails('Outlier Analysis')}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
