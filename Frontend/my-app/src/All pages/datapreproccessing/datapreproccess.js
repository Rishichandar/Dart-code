
// import React, { useContext, useEffect, useState } from 'react';
// import { CsvContext } from '../csvcontext/csvcontext';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// import axios from 'axios';

// export default function Datapreprocessing() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [activeItem, setActiveItem] = useState(null);
//     const [processedData, setProcessedData] = useState(null);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);

//     useEffect(() => {
//         const savedData = localStorage.getItem('csvData');
//         if (savedData) {
//             const parsedData = JSON.parse(savedData);
//             setPersistedData(parsedData);
//         }
//     }, []);

//     useEffect(() => {
//         if (csvData) {
//             localStorage.setItem('csvData', JSON.stringify(csvData));
//             setPersistedData(csvData);
//         }
//     }, [csvData]);

//     const dataToDisplay = processedData || csvData || persistedData;

//     const handleItemClick = (item) => {
//         setActiveItem(activeItem === item ? null : item);
//     };

//     const handleReshapingClick = async (method, text) => {
//         try {
//             if (!persistedData || !persistedData.data || !persistedData.columns) {
//                 console.error('No file found in persistedData');
//                 alert('No file found in persistedData');
//                 return;
//             }

//             const headers = persistedData.columns.join(',');
//             const rows = persistedData.data.map(row => row.join(',')).join('\n');
//             const csvContent = `${headers}\n${rows}`;

//             const csvData = new Blob([csvContent], { type: 'text/csv' });
//             const formData = new FormData();
//             formData.append('file', csvData, 'data.csv');
//             formData.append('method', method);

//             const response = await axios.post('http://127.0.0.1:5000/transform_data', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             setProcessedData(response.data.transformed_data);
//             setSelectedTechnique(text);
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };

//     const handleAugmentationClick = async (method, text) => {
//         try {
//             if (!persistedData || !persistedData.data || !persistedData.columns) {
//                 console.error('No file found in persistedData');
//                 alert('No file found in persistedData');
//                 return;
//             }

//             const headers = persistedData.columns.join(',');
//             const rows = persistedData.data.map(row => row.join(',')).join('\n');
//             const csvContent = `${headers}\n${rows}`;

//             const csvData = new Blob([csvContent], { type: 'text/csv' });
//             const formData = new FormData();
//             formData.append('file', csvData, 'data.csv');
//             formData.append('method', method);

//             const response = await axios.post('http://127.0.0.1:5000/handle_missing_values', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             setProcessedData(response.data.processed_data);
//             setSelectedTechnique(text);
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };

//     const renderDetails = (item) => {
//         switch (item) {
//             case 'Data Augmentation':
//                 return (
//                     <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('mean', 'Mean')}>
//                             <ArrowRightIcon /> Mean
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('mode', 'Mode')}>
//                             <ArrowRightIcon /> Mode
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('median', 'Median')}>
//                             <ArrowRightIcon /> Median
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('constant', 'Constant')}>
//                             <ArrowRightIcon /> Constant
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('linear', 'Linear Regression')}>
//                             <ArrowRightIcon /> Linear Regression
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('random_forest', 'Random Forest')}>
//                             <ArrowRightIcon /> Random Forest
//                         </li>
//                     </ul>
//                 );
//             case 'Data Reshaping':
//                 return (
//                     <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('standardize', 'Standardize')}>
//                             <ArrowRightIcon /> Standardize
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('normalize', 'Normalize')}>
//                             <ArrowRightIcon /> Normalize
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('boxcox', 'Box-Cox')}>
//                             <ArrowRightIcon /> Box-Cox
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('yeojohnson', 'Yeo-Johnson')}>
//                             <ArrowRightIcon /> Yeo-Johnson
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('scaler', 'Scaler')}>
//                             <ArrowRightIcon /> Scaler
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('minmax', 'Min-Max')}>
//                             <ArrowRightIcon /> Min-Max
//                         </li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('log2', 'Log2')}>
//                             <ArrowRightIcon /> Log2
//                         </li>
//                     </ul>
//                 );
//             case 'Outlier Analysis':
//                 return (
//                     <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Z-Score</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> IQR</li>
//                     </ul>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <>
//             <span id='data-preproccess'>Datapreprocessing</span>
//             {selectedTechnique && (
//                 <span id='mode-select'>{selectedTechnique}</span>
//             )}
//             <div className="data-container"></div>
//             {dataToDisplay && (
//                 <div className="table-container1">
//                     <table className="csv-table1">
//                         <thead>
//                             <tr>
//                                 {dataToDisplay.columns.map((header, index) => (
//                                     <th key={index}>{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {dataToDisplay.data.map((row, rowIndex) => (
//                                 <tr key={rowIndex}>
//                                     {row.map((cell, colIndex) => (
//                                         <td key={colIndex}>{cell}</td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//             <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//                 <div className="toggle-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                     {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                 </div>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li
//                                 style={{ marginBottom: '20px', cursor: 'pointer' }}
//                                 onClick={() => handleItemClick('Data Augmentation')}
//                             >
//                                 Data Augmentation
//                                 {activeItem === 'Data Augmentation' && renderDetails('Data Augmentation')}
//                             </li>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={() => handleItemClick('Data Reshaping')}
//                             >
//                                 Data Reshaping
//                                 {activeItem === 'Data Reshaping' && renderDetails('Data Reshaping')}
//                             </li>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={() => handleItemClick('Data Aggregation')}
//                             >
//                                 Data Aggregation
//                                 {activeItem === 'Data Aggregation' && renderDetails('Data Aggregation')}
//                             </li>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={() => handleItemClick('Data Segmentation')}
//                             >
//                                 Data Segmentation
//                                 {activeItem === 'Data Segmentation' && renderDetails('Data Segmentation')}
//                             </li>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={() => handleItemClick('Outlier Analysis')}
//                             >
//                                 Outlier Analysis
//                                 {activeItem === 'Outlier Analysis' && renderDetails('Outlier Analysis')}
//                             </li>
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }



import React, { useContext, useEffect, useState } from 'react';
import { CsvContext } from '../csvcontext/csvcontext';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import axios from 'axios';

export default function Datapreprocessing() {
    const { csvData } = useContext(CsvContext);
    const [persistedData, setPersistedData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [processedData, setProcessedData] = useState(null);
    const [selectedTechnique, setSelectedTechnique] = useState(null);

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

    const dataToDisplay = processedData || csvData || persistedData;

    const handleItemClick = (item) => {
        setActiveItem(activeItem === item ? null : item);
    };

    const handleReshapingClick = async (method, text) => {
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

            const response = await axios.post('http://127.0.0.1:5000/transform_data', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProcessedData(response.data.transformed_data);
            setSelectedTechnique(text);
        } catch (error) {
            console.error('Error processing the data:', error);
            alert('Error processing the data');
        }
    };

    const handleAugmentationClick = async (method, text) => {
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

            const response = await axios.post('http://127.0.0.1:5000/handle_missing_values', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProcessedData(response.data.processed_data);
            setSelectedTechnique(text);
        } catch (error) {
            console.error('Error processing the data:', error);
            alert('Error processing the data');
        }
    };

    const handleOutlierClick = async (method, text, threshold = 3, action = 'remove') => {
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
            formData.append('threshold', threshold);
            formData.append('action', action);

            const response = await axios.post('http://127.0.0.1:5000/handle_outliers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProcessedData(response.data.processed_data);
            setSelectedTechnique(text);
        } catch (error) {
            console.error('Error processing outliers:', error);
            alert('Error processing outliers');
        }
    };

    const renderDetails = (item) => {
        switch (item) {
            case 'Data Augmentation':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('mean', 'Mean')}>
                            <ArrowRightIcon /> Mean
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('mode', 'Mode')}>
                            <ArrowRightIcon /> Mode
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('median', 'Median')}>
                            <ArrowRightIcon /> Median
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('constant', 'Constant')}>
                            <ArrowRightIcon /> Constant
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('linear', 'Linear Regression')}>
                            <ArrowRightIcon /> Linear Regression
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleAugmentationClick('random_forest', 'Random Forest')}>
                            <ArrowRightIcon /> Random Forest
                        </li>
                    </ul>
                );
            case 'Data Reshaping':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('standardize', 'Standardize')}>
                            <ArrowRightIcon /> Standardize
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('normalize', 'Normalize')}>
                            <ArrowRightIcon /> Normalize
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('boxcox', 'Box-Cox')}>
                            <ArrowRightIcon /> Box-Cox
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('yeojohnson', 'Yeo-Johnson')}>
                            <ArrowRightIcon /> Yeo-Johnson
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('scaler', 'Scaler')}>
                            <ArrowRightIcon /> Scaler
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('minmax', 'Min-Max')}>
                            <ArrowRightIcon /> Min-Max
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleReshapingClick('log2', 'Log2')}>
                            <ArrowRightIcon /> Log2
                        </li>
                    </ul>
                );
            case 'Outlier Analysis':
                return (
                    
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                    <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleOutlierClick('z-score', 'Z-Score')}>
                        <ArrowRightIcon /> Z-Score
                    </li>
                    <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleOutlierClick('iqr', 'IQR')}>
                        <ArrowRightIcon /> IQR
                    </li>
                </ul>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <span id='data-preproccess'>Datapreprocessing</span>
            {selectedTechnique && (
                <span id='mode-select'>{selectedTechnique}</span>
            )}
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
                    {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
                </div>
                {isSidebarOpen && (
                    <div className="sidebar-content">
                        <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
                            <li
                                style={{ marginBottom: '20px', cursor: 'pointer' }}
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


