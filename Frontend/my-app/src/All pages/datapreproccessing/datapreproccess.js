
// import React, { useContext, useEffect, useState } from 'react';
// import { CsvContext } from '../csvcontext/csvcontext';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// export default function Datapreprocessing() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [activeItem, setActiveItem] = useState(null);

//     useEffect(() => {
//         const savedData = localStorage.getItem('csvData');
//         if (savedData) {
//             setPersistedData(JSON.parse(savedData));
//         }
//     }, []);

//     useEffect(() => {
//         if (csvData) {
//             localStorage.setItem('csvData', JSON.stringify(csvData));
//             setPersistedData(csvData);
//         }
//     }, [csvData]);

//     const dataToDisplay = csvData || persistedData;

//     const handleItemClick = (item) => {
//         setActiveItem(activeItem === item ? null : item);
//     };

//     const renderDetails = (item) => {
//         switch (item) {
//             case 'Data Augmentation':
//                 return (
//                     <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Mean</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Mode</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Median</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Constant</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Linear Regression</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Random Forest</li>
//                     </ul>
//                 );
//             case 'Data Reshaping':
//                 return (
//                     <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Standardize</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Normalize</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Box-cox</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Yoe-Jhonson</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Scaler</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Min-Max</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon /> Log2</li>
//                     </ul>
//                 );
//             case 'Outlier Analysis':
//                 return (
//                     <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon />Z-Score</li>
//                         <li style={{ marginBottom: '7px' }} className="icon-with-text"><ArrowRightIcon />IQR</li>
//                     </ul>
//                 );
//             // Add more cases for other items as needed
//             default:
//                 return null;
//         }
//     };

//     return (
//         <>
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

    useEffect(() => {
        const savedData = localStorage.getItem('csvData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            console.log(parsedData); // Log the persistedData object
            setPersistedData(parsedData);
            console.log(persistedData);
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

    const handleMethodClick = async (method) => {
        try {
            // Check if persistedData contains the file and the key is correct
            console.log('persistedData:', persistedData); // Add this line for debugging
            if (!persistedData || !persistedData.data) {
                console.error('No file found in persistedData');
                return;
            }

            // Convert the CSV data to a Blob object
            const csvData = new Blob([persistedData.data], { type: 'text/csv' });

            // Construct FormData object
            const formData = new FormData();
            formData.append('file', csvData, 'data.csv'); // Assuming the file name is 'data.csv'
            formData.append('method', method); // Confirm that the method parameter is correct

            // Send POST request to the backend
            const response = await axios.post('http://127.0.0.1:5000/handle_missing_values', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Set processed data received from the backend
            setProcessedData(response.data.processed_data);
        } catch (error) {
            console.error('Error processing the data:', error); // Check error handling
            alert('Error processing the data'); // Consider displaying a user-friendly error message
        }
    };


    const renderDetails = (item) => {
        switch (item) {
            case 'Data Augmentation':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleMethodClick('mean')}>
                            <ArrowRightIcon /> Mean
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleMethodClick('mode')}>
                            <ArrowRightIcon /> Mode
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleMethodClick('median')}>
                            <ArrowRightIcon /> Median
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleMethodClick('constant')}>
                            <ArrowRightIcon /> Constant
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleMethodClick('linear')}>
                            <ArrowRightIcon /> Linear Regression
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" onClick={() => handleMethodClick('random_forest')}>
                            <ArrowRightIcon /> Random Forest
                        </li>
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
