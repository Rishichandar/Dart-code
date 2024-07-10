// export default function Mlpipeline(){
//     return (
//         <h1>Mlpipeline</h1>
//     )
// }

// import React, { useContext, useEffect, useState } from 'react';
// import Tooltip from '@mui/material/Tooltip';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { CsvContext } from '../csvcontext/csvcontext';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';


// export default function Mlpipeline() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [processedData, setProcessedData] = useState(null);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [isSelectingTargetColumn1, setIsSelectingTargetColumn1] = useState(false);
//     const [isSelectingTargetColumn2, setIsSelectingTargetColumn2] = useState(false);
//     const [targetColumn1, setTargetColumn1] = useState('');
//     const [targetColumn2, setTargetColumn2] = useState('');
//     const navigate = useNavigate();

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

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         }, 800);

//         return () => clearTimeout(timer);
//     }, []);




//     const handleConfirmTargetColumn1 = async () => {
//         try {
//             if (!targetColumn1) {
//                 alert('Please select a target column');
//                 return;
//             }

//             if (!persistedData || !persistedData.columns) {
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
//             formData.append('targetColumn', targetColumn1); // Append targetColumn to FormData

//             const response = await axios.post('http://127.0.0.1:5000/aggregate_data', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });


//             setSelectedTechnique('Classification');
//             setIsSelectingTargetColumn1(false); // Reset state after successful aggregation
//             toast.success("proccess applied");
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };
//     const handleConfirmTargetColumn2 = async () => {
//         try {
//             if (!targetColumn2) {
//                 alert('Please select a target column');
//                 return;
//             }

//             if (!persistedData || !persistedData.columns) {
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
//             formData.append('targetColumn', targetColumn2); // Append targetColumn to FormData

//             const response = await axios.post('http://127.0.0.1:5000/aggregate_data', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });


//             setSelectedTechnique('Regression');
//             setIsSelectingTargetColumn2(false); // Reset state after successful aggregation
//             toast.success("proccess applied");
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };
//     const handleTargetColumnChange1 = (event) => {
//         setTargetColumn1(event.target.value);
//     };
//     const handleTargetColumnChange2 = (event) => {
//         setTargetColumn2(event.target.value);
//     };
//     const handleCancelTargetColumnSelection1 = () => {
//         setIsSelectingTargetColumn1(false); // Reset state when canceling target column selection
//     };
//     const handleCancelTargetColumnSelection2 = () => {
//         setIsSelectingTargetColumn2(false); // Reset state when canceling target column selection
//     };



//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const dataToDisplay = csvData || persistedData;
//     const handleClassificationClick = () => {
//         setIsSelectingTargetColumn1(true);
//     };
//     const handleRegressionClick = () => {
//         setIsSelectingTargetColumn2(true);
//     };

//     return (
//         <>
//             <Button
//                 variant="outlined"
//                 style={{ float: 'right', marginRight: '50px', marginTop: '15px' }}
//                 onClick={uploadPage}
//             >
//                 <ArrowBackIcon fontSize="smaller" style={{ position: 'relative', right: '3px' }} />
//                 Back
//             </Button>
//             <span id="preproccess">Mlpipeline</span>
//             {selectedTechnique && (
//                 <span id='mode-select3'>{selectedTechnique}</span>
//             )}
//             <div className="data-container5"></div>
//             {dataToDisplay &&  (
//                 <div className="table-container6">
//                     <table className="csv-table6">
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


//             <div className={`sidebar4 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="preprocess technique" arrow>
//                     <div className="toggle-button4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content4">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             {/* <li
//                                 style={{ marginBottom: '20px', cursor: 'pointer' }}>
//                                 Classification


//                             </li> */}
//                             {isSelectingTargetColumn1 ? (
//                                 <div>
//                                     <label htmlFor="targetColumn">Select Column:</label>
//                                     <select id="targetColumn" style={{marginLeft:'33px'}} name="targetColumn" value={targetColumn1} onChange={handleTargetColumnChange1}>
//                                         <option value="" >Select Column</option>
//                                         {persistedData && persistedData.columns.map((column, index) => (
//                                             <option key={index} value={column}>{column}</option>
//                                         ))}
//                                     </select>
//                                     <span  onClick={handleConfirmTargetColumn1}><CheckIcon style={{fontSize:'larger',position:'relative',top:'5px',left:'10px'}}/></span>
//                                     <span onClick={handleCancelTargetColumnSelection1}><CloseIcon style={{fontSize:'larger',position:'relative',top:'5px',left:'15px'}}/></span>
//                                 </div>
//                             ) : (
//                                 <li
//                                     style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                     onClick={handleClassificationClick}
//                                 >
//                                      Classification
//                                 </li>
//                             )}
//                             {isSelectingTargetColumn2 ? (
//                                 <div>
//                                     <label htmlFor="targetColumn">Select Column:</label>
//                                     <select id="targetColumn" style={{marginLeft:'33px'}} name="targetColumn" value={targetColumn2} onChange={handleTargetColumnChange2}>
//                                         <option value="" >Select Column</option>
//                                         {persistedData && persistedData.columns.map((column, index) => (
//                                             <option key={index} value={column}>{column}</option>
//                                         ))}
//                                     </select>
//                                     <span  onClick={handleConfirmTargetColumn2}><CheckIcon style={{fontSize:'larger',position:'relative',top:'5px',left:'10px'}}/></span>
//                                     <span onClick={handleCancelTargetColumnSelection2}><CloseIcon style={{fontSize:'larger',position:'relative',top:'5px',left:'15px'}}/></span>
//                                 </div>
//                             ) : (
//                                 <li
//                                     style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                     onClick={handleRegressionClick}
//                                 >
//                                      Regression
//                                 </li>
//                             )}

//                         </ul>
//                     </div>
//                 )}
//             </div>

//         </>
//     );
// }


// import React, { useContext, useEffect, useState } from 'react';
// import Tooltip from '@mui/material/Tooltip';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { CsvContext } from '../csvcontext/csvcontext';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';

// export default function Mlpipeline() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [isSelectingTargetColumn1, setIsSelectingTargetColumn1] = useState(false);
//     const [isSelectingTargetColumn2, setIsSelectingTargetColumn2] = useState(false);
//     const [targetColumn1, setTargetColumn1] = useState('');
//     const [targetColumn2, setTargetColumn2] = useState('');
//     const [predictions, setPredictions] = useState([]);
//     const navigate = useNavigate();

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

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         }, 800);

//         return () => clearTimeout(timer);
//     }, []);

//     const handleConfirmTargetColumn = async (targetColumn, technique) => {
//         try {
//             if (!targetColumn) {
//                 alert('Please select a target column');
//                 return;
//             }

//             if (!persistedData || !persistedData.columns) {
//                 console.error('No file found in persistedData');
//                 alert('No file found in persistedData');
//                 return;
//             }

//             const formData = new FormData();
//             formData.append('file', csvData.file);
//             formData.append('targetColumn', targetColumn);

//             const response = await axios.post(`http://127.0.0.1:5000/train_and_predict`, {
//                 data: persistedData,
//                 target_column: targetColumn,
//                 model_type: technique === 'Classification' ? 'Classification' : 'Regression'
//             });

//             if (response.data.error) {
//                 throw new Error(response.data.error);
//             }

//             setSelectedTechnique(technique);
//             setIsSelectingTargetColumn1(false);
//             setIsSelectingTargetColumn2(false);
//             toast.success("Process applied successfully");

//             if (response.data.predictions) {
//                 setPredictions(response.data.predictions);
//             }
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };

//     const handleTargetColumnChange1 = (event) => {
//         setTargetColumn1(event.target.value);
//     };

//     const handleTargetColumnChange2 = (event) => {
//         setTargetColumn2(event.target.value);
//     };

//     const handleCancelTargetColumnSelection1 = () => {
//         setIsSelectingTargetColumn1(false);
//     };

//     const handleCancelTargetColumnSelection2 = () => {
//         setIsSelectingTargetColumn2(false);
//     };

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const handleClassificationClick = () => {
//         setIsSelectingTargetColumn1(true);
//         setIsSelectingTargetColumn2(false); // Ensure the other selection is closed
//     };

//     const handleRegressionClick = () => {
//         setIsSelectingTargetColumn2(true);
//         setIsSelectingTargetColumn1(false); // Ensure the other selection is closed
//     };

//     return (
//         <>
//             <Button
//                 variant="outlined"
//                 style={{ float: 'right', marginRight: '50px', marginTop: '15px' }}
//                 onClick={uploadPage}
//             >
//                 <ArrowBackIcon fontSize="smaller" style={{ position: 'relative', right: '3px' }} />
//                 Back
//             </Button>
//             <span id="preproccess">Mlpipeline</span>
//             {selectedTechnique && (
//                 <span id='mode-select3'>{selectedTechnique}</span>
//             )}
//             <div className="data-container5"></div>
//             {persistedData && (
//                 <div className="table-container6">
//                     <table className="csv-table6">
//                         <thead>
//                             <tr>
//                                 {persistedData.columns.map((header, index) => (
//                                     <th key={index}>{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {persistedData.data.map((row, rowIndex) => (
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

//             <div className={`sidebar4 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="Preprocess Technique" arrow>
//                     <div className="toggle-button4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content4">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={handleClassificationClick}
//                             >
//                                 Classification
//                             </li>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={handleRegressionClick}
//                             >
//                                 Regression
//                             </li>
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             {isSelectingTargetColumn1 && (
//                 <div className="target-column-selection">
//                     <label htmlFor="targetColumn1">Select Column:</label>
//                     <select id="targetColumn1" name="targetColumn1" value={targetColumn1} onChange={handleTargetColumnChange1}>
//                         <option value="">Select Column</option>
//                         {persistedData.columns.map((column, index) => (
//                             <option key={index} value={column}>{column}</option>
//                         ))}
//                     </select>
//                     <div>
//                         <span onClick={() => handleConfirmTargetColumn(targetColumn1, 'Classification')}>
//                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                         </span>
//                         <span onClick={handleCancelTargetColumnSelection1}>
//                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                         </span>
//                     </div>
//                 </div>
//             )}

//             {isSelectingTargetColumn2 && (
//                 <div className="target-column-selection">
//                     <label htmlFor="targetColumn2">Select Column:</label>
//                     <select id="targetColumn2" name="targetColumn2" value={targetColumn2} onChange={handleTargetColumnChange2}>
//                         <option value="">Select Column</option>
//                         {persistedData.columns.map((column, index) => (
//                             <option key={index} value={column}>{column}</option>
//                         ))}
//                     </select>
//                     <div>
//                         <span onClick={() => handleConfirmTargetColumn(targetColumn2, 'Regression')}>
//                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                         </span>
//                         <span onClick={handleCancelTargetColumnSelection2}>
//                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                         </span>
//                     </div>
//                 </div>
//             )}

//             {predictions.length > 0 && (
//                 <div className="predictions-container">
//                     <h3>Predictions</h3>
//                     <ul>
//                         {predictions.map((prediction, index) => (
//                             <li key={index}>{prediction}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </>
//     );
// }


// import React, { useContext, useEffect, useState } from 'react';
// import Tooltip from '@mui/material/Tooltip';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { CsvContext } from '../csvcontext/csvcontext';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';

// export default function Mlpipeline() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [isSelectingTargetColumn1, setIsSelectingTargetColumn1] = useState(false);
//     const [isSelectingTargetColumn2, setIsSelectingTargetColumn2] = useState(false);
//     const [targetColumn1, setTargetColumn1] = useState('');
//     const [targetColumn2, setTargetColumn2] = useState('');
//     const [predictions, setPredictions] = useState([]);
//     const navigate = useNavigate();

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

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         }, 800);

//         return () => clearTimeout(timer);
//     }, []);

//     const handleConfirmTargetColumn = async (targetColumn, technique) => {
//         try {
//             if (!targetColumn) {
//                 alert('Please select a target column');
//                 return;
//             }

//             if (!persistedData || !persistedData.columns) {
//                 console.error('No file found in persistedData');
//                 alert('No file found in persistedData');
//                 return;
//             }

//             const formData = new FormData();
//             formData.append('file', csvData.file);
//             formData.append('targetColumn', targetColumn);

//             const response = await axios.post(`http://127.0.0.1:5000/train_and_predict`, {
//                 data: persistedData,
//                 target_column: targetColumn,
//                 model_type: technique === 'Classification' ? 'Classification' : 'Regression'
//             });

//             if (response.data.error) {
//                 throw new Error(response.data.error);
//             }

//             setSelectedTechnique(technique);
//             setIsSelectingTargetColumn1(false);
//             setIsSelectingTargetColumn2(false);
//             toast.success("Process applied successfully");

//             if (response.data.predictions) {
//                 setPredictions(response.data.predictions);
//             }
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };

//     const handleTargetColumnChange1 = (event) => {
//         setTargetColumn1(event.target.value);
//     };

//     const handleTargetColumnChange2 = (event) => {
//         setTargetColumn2(event.target.value);
//     };

//     const handleCancelTargetColumnSelection1 = () => {
//         setIsSelectingTargetColumn1(false);
//     };

//     const handleCancelTargetColumnSelection2 = () => {
//         setIsSelectingTargetColumn2(false);
//     };

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const handleClassificationClick = () => {
//         setIsSelectingTargetColumn1(true);
//         setIsSelectingTargetColumn2(false); // Ensure the other selection is closed
//     };

//     const handleRegressionClick = () => {
//         setIsSelectingTargetColumn2(true);
//         setIsSelectingTargetColumn1(false); // Ensure the other selection is closed
//     };

//     return (
//         <>
//             <Button
//                 variant="outlined"
//                 style={{ float: 'right', marginRight: '50px', marginTop: '15px' }}
//                 onClick={uploadPage}
//             >
//                 <ArrowBackIcon fontSize="smaller" style={{ position: 'relative', right: '3px' }} />
//                 Back
//             </Button>
//             <span id="preproccess">Mlpipeline</span>
//             {selectedTechnique && (
//                 <span id='mode-select3'>{selectedTechnique}</span>
//             )}
//             <div className="data-container5"></div>
//             {persistedData && (
//                 <div className="table-container6">
//                     <table className="csv-table6">
//                         <thead>
//                             <tr>
//                                 {persistedData.columns.map((header, index) => (
//                                     <th key={index}>{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {persistedData.data.map((row, rowIndex) => (
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

//             <div className={`sidebar4 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="Preprocess Technique" arrow>
//                     <div className="toggle-button4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content4">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={handleClassificationClick}
//                             >
//                                 Classification
//                             </li>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={handleRegressionClick}
//                             >
//                                 Regression
//                             </li>
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             {isSelectingTargetColumn1 && (
//                 <div className="target-column-selection">
//                     <label htmlFor="targetColumn1">Select Column:</label>
//                     <select id="targetColumn1" name="targetColumn1" value={targetColumn1} onChange={handleTargetColumnChange1}>
//                         <option value="">Select Column</option>
//                         {persistedData.columns.map((column, index) => (
//                             <option key={index} value={column}>{column}</option>
//                         ))}
//                     </select>
//                     <div>
//                         <span onClick={() => handleConfirmTargetColumn(targetColumn1, 'Classification')}>
//                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                         </span>
//                         <span onClick={handleCancelTargetColumnSelection1}>
//                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                         </span>
//                     </div>
//                 </div>
//             )}

//             {isSelectingTargetColumn2 && (
//                 <div className="target-column-selection">
//                     <label htmlFor="targetColumn2">Select Column:</label>
//                     <select id="targetColumn2" name="targetColumn2" value={targetColumn2} onChange={handleTargetColumnChange2}>
//                         <option value="">Select Column</option>
//                         {persistedData.columns.map((column, index) => (
//                             <option key={index} value={column}>{column}</option>
//                         ))}
//                     </select>
//                     <div>
//                         <span onClick={() => handleConfirmTargetColumn(targetColumn2, 'Regression')}>
//                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                         </span>
//                         <span onClick={handleCancelTargetColumnSelection2}>
//                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                         </span>
//                     </div>
//                 </div>
//             )}

//             {predictions.length > 0 && (
//                 <div className="predictions-container">
//                     <h3>Predictions</h3>
//                     <ul>
//                         {predictions.map((prediction, index) => (
//                             <li key={index}>{prediction}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </>
//     );
// }


// import React, { useContext, useEffect, useState } from 'react';
// import Tooltip from '@mui/material/Tooltip';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { CsvContext } from '../csvcontext/csvcontext';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';

// export default function Mlpipeline() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [isSelectingTargetColumn1, setIsSelectingTargetColumn1] = useState(false);
//     const [isSelectingTargetColumn2, setIsSelectingTargetColumn2] = useState(false);
//     const [targetColumn1, setTargetColumn1] = useState('');
//     const [targetColumn2, setTargetColumn2] = useState('');
//     const [predictions, setPredictions] = useState([]);
//     const navigate = useNavigate();

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

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         }, 800);

//         return () => clearTimeout(timer);
//     }, []);

//     const handleConfirmTargetColumn = async (targetColumn, technique) => {
//         try {
//             if (!targetColumn) {
//                 alert('Please select a target column');
//                 return;
//             }

//             if (!persistedData || !persistedData.columns) {
//                 console.error('No file found in persistedData');
//                 alert('No file found in persistedData');
//                 return;
//             }

//             const formData = new FormData();
//             formData.append('file', csvData.file);
//             formData.append('targetColumn', targetColumn);

//             const response = await axios.post(`http://127.0.0.1:5000/train_and_predict`, {
//                 data: persistedData,
//                 target_column: targetColumn,
//                 model_type: technique === 'Classification' ? 'Classification' : 'Regression'
//             });

//             if (response.data.error) {
//                 throw new Error(response.data.error);
//             }

//             setSelectedTechnique(technique);
//             setIsSelectingTargetColumn1(false);
//             setIsSelectingTargetColumn2(false);
//             toast.success("Process applied successfully");

//             if (response.data.predictions) {
//                 setPredictions(response.data.predictions);
//             }
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };

//     const handleTargetColumnChange1 = (event) => {
//         setTargetColumn1(event.target.value);
//     };

//     const handleTargetColumnChange2 = (event) => {
//         setTargetColumn2(event.target.value);
//     };

//     const handleCancelTargetColumnSelection1 = () => {
//         setIsSelectingTargetColumn1(false);
//     };

//     const handleCancelTargetColumnSelection2 = () => {
//         setIsSelectingTargetColumn2(false);
//     };

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const handleClassificationClick = () => {
//         setIsSelectingTargetColumn1(true);
//         setIsSelectingTargetColumn2(false); // Ensure the other selection is closed
//     };

//     const handleRegressionClick = () => {
//         setIsSelectingTargetColumn2(true);
//         setIsSelectingTargetColumn1(false); // Ensure the other selection is closed
//     };

//     return (
//         <>
//             <Button
//                 variant="outlined"
//                 style={{ float: 'right', marginRight: '50px', marginTop: '15px' }}
//                 onClick={uploadPage}
//             >
//                 <ArrowBackIcon fontSize="smaller" style={{ position: 'relative', right: '3px' }} />
//                 Back
//             </Button>
//             <span id="preproccess">Mlpipeline</span>
//             {selectedTechnique && (
//                 <span id='mode-select3'>{selectedTechnique}</span>
//             )}
//             <div className="data-container5"></div>
//             {persistedData && (
//                 <div className="table-container6">
//                     <table className="csv-table6">
//                         <thead>
//                             <tr>
//                                 {persistedData.columns.map((header, index) => (
//                                     <th key={index}>{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {persistedData.data.map((row, rowIndex) => (
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

//             <div className={`sidebar4 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="Preprocess Technique" arrow>
//                     <div className="toggle-button4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content4">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={handleClassificationClick}
//                             >
//                                 Classification
//                             </li>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={handleRegressionClick}
//                             >
//                                 Regression
//                             </li>
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             {isSelectingTargetColumn1 && (
//                 <div className="target-column-selection">
//                     <label htmlFor="targetColumn1">Select Column:</label>
//                     <select id="targetColumn1" name="targetColumn1" value={targetColumn1} onChange={handleTargetColumnChange1}>
//                         <option value="">Select Column</option>
//                         {persistedData.columns.map((column, index) => (
//                             <option key={index} value={column}>{column}</option>
//                         ))}
//                     </select>
//                     <div>
//                         <span onClick={() => handleConfirmTargetColumn(targetColumn1, 'Classification')}>
//                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                         </span>
//                         <span onClick={handleCancelTargetColumnSelection1}>
//                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                         </span>
//                     </div>
//                 </div>
//             )}

//             {isSelectingTargetColumn2 && (
//                 <div className="target-column-selection">
//                     <label htmlFor="targetColumn2">Select Column:</label>
//                     <select id="targetColumn2" name="targetColumn2" value={targetColumn2} onChange={handleTargetColumnChange2}>
//                         <option value="">Select Column</option>
//                         {persistedData.columns.map((column, index) => (
//                             <option key={index} value={column}>{column}</option>
//                         ))}
//                     </select>
//                     <div>
//                         <span onClick={() => handleConfirmTargetColumn(targetColumn2, 'Regression')}>
//                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                         </span>
//                         <span onClick={handleCancelTargetColumnSelection2}>
//                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                         </span>
//                     </div>
//                 </div>
//             )}

//             {predictions.length > 0 && (
//                 <div className="predictions-container">
//                     <h3>Predictions</h3>
//                     <ul>
//                         {predictions.map((prediction, index) => (
//                             <li key={index}>{prediction}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </>
//     );
// }



// import React, { useContext, useEffect, useState } from 'react';
// import Tooltip from '@mui/material/Tooltip';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { CsvContext } from '../csvcontext/csvcontext';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';


// export default function Mlpipeline() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [processedData, setProcessedData] = useState(null);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [isSelectingTargetColumn1, setIsSelectingTargetColumn1] = useState(false);
//     const [isSelectingTargetColumn2, setIsSelectingTargetColumn2] = useState(false);
//     const [targetColumn1, setTargetColumn1] = useState('');
//     const [targetColumn2, setTargetColumn2] = useState('');
//     const [predictions, setPredictions] = useState([]);
//     const navigate = useNavigate();

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

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         }, 800);

//         return () => clearTimeout(timer);
//     }, []);




//     // const handleConfirmTargetColumn1 = async () => {
//     //     try {
//     //         if (!targetColumn1) {
//     //             alert('Please select a target column');
//     //             return;
//     //         }

//     //         if (!persistedData || !persistedData.columns) {
//     //             console.error('No file found in persistedData');
//     //             alert('No file found in persistedData');
//     //             return;
//     //         }

//     //         const headers = persistedData.columns.join(',');
//     //         const rows = persistedData.data.map(row => row.join(',')).join('\n');
//     //         const csvContent = `${headers}\n${rows}`;
//     //         const csvData = new Blob([csvContent], { type: 'text/csv' });

//     //         const formData = new FormData();
//     //         formData.append('file', csvData, 'data.csv');
//     //         formData.append('targetColumn', targetColumn1); // Append targetColumn to FormData

//     //         const response = await axios.post('http://127.0.0.1:5000/aggregate_data', formData, {
//     //             headers: {
//     //                 'Content-Type': 'multipart/form-data'
//     //             }
//     //         });


//     //         setSelectedTechnique('Classification');
//     //         setIsSelectingTargetColumn1(false); // Reset state after successful aggregation
//     //         toast.success("proccess applied");
//     //     } catch (error) {
//     //         console.error('Error processing the data:', error);
//     //         alert('Error processing the data');
//     //     }
//     // };
//     // const handleConfirmTargetColumn2 = async () => {
//     //     try {
//     //         if (!targetColumn2) {
//     //             alert('Please select a target column');
//     //             return;
//     //         }

//     //         if (!persistedData || !persistedData.columns) {
//     //             console.error('No file found in persistedData');
//     //             alert('No file found in persistedData');
//     //             return;
//     //         }

//     //         const headers = persistedData.columns.join(',');
//     //         const rows = persistedData.data.map(row => row.join(',')).join('\n');
//     //         const csvContent = `${headers}\n${rows}`;
//     //         const csvData = new Blob([csvContent], { type: 'text/csv' });

//     //         const formData = new FormData();
//     //         formData.append('file', csvData, 'data.csv');
//     //         formData.append('targetColumn', targetColumn2); // Append targetColumn to FormData

//     //         const response = await axios.post('http://127.0.0.1:5000/aggregate_data', formData, {
//     //             headers: {
//     //                 'Content-Type': 'multipart/form-data'
//     //             }
//     //         });


//     //         setSelectedTechnique('Regression');
//     //         setIsSelectingTargetColumn2(false); // Reset state after successful aggregation
//     //         toast.success("proccess applied");
//     //     } catch (error) {
//     //         console.error('Error processing the data:', error);
//     //         alert('Error processing the data');
//     //     }
//     // };
//     const handleConfirmTargetColumn = async (targetColumn, technique) => {
//                 try {
//                     if (!targetColumn) {
//                         alert('Please select a target column');
//                         return;
//                     }
        
//                     if (!persistedData || !persistedData.columns) {
//                         console.error('No file found in persistedData');
//                         alert('No file found in persistedData');
//                         return;
//                     }
        
//                     const formData = new FormData();
//                     formData.append('file', csvData.file);
//                     formData.append('targetColumn', targetColumn);
        
//                     const response = await axios.post(`http://127.0.0.1:5000/train_and_predict`, {
//                         data: persistedData,
//                         target_column: targetColumn,
//                         model_type: technique === 'Classification' ? 'Classification' : 'Regression'
//                     });
        
//                     if (response.data.error) {
//                         throw new Error(response.data.error);
//                     }
        
//                     setSelectedTechnique(technique);
//                     setIsSelectingTargetColumn1(false);
//                     setIsSelectingTargetColumn2(false);
//                     toast.success("Process applied successfully");
        
//                     if (response.data.predictions) {
//                         setPredictions(response.data.predictions);
//                     }
//                 } catch (error) {
//                     console.error('Error processing the data:', error);
//                     alert('Error processing the data');
//                 }
//             };
        
//     const handleTargetColumnChange1 = (event) => {
//         setTargetColumn1(event.target.value);
//     };
//     const handleTargetColumnChange2 = (event) => {
//         setTargetColumn2(event.target.value);
//     };
//     const handleCancelTargetColumnSelection1 = () => {
//         setIsSelectingTargetColumn1(false); // Reset state when canceling target column selection
//     };
//     const handleCancelTargetColumnSelection2 = () => {
//         setIsSelectingTargetColumn2(false); // Reset state when canceling target column selection
//     };



//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const dataToDisplay = csvData || persistedData;
//     const handleClassificationClick = () => {
//         setIsSelectingTargetColumn1(true);
//     };
//     const handleRegressionClick = () => {
//         setIsSelectingTargetColumn2(true);
//     };

//     return (
//         <>
//             <Button
//                 variant="outlined"
//                 style={{ float: 'right', marginRight: '50px', marginTop: '15px' }}
//                 onClick={uploadPage}
//             >
//                 <ArrowBackIcon fontSize="smaller" style={{ position: 'relative', right: '3px' }} />
//                 Back
//             </Button>
//             <span id="preproccess">Mlpipeline</span>
//             {selectedTechnique && (
//                 <span id='mode-select3'>{selectedTechnique}</span>
//             )}
//             <div className="data-container5"></div>
//             {dataToDisplay && (
//                 <div className="table-container6">
//                     <table className="csv-table6">
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


//             <div className={`sidebar4 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="preprocess technique" arrow>
//                     <div className="toggle-button4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content4">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             {/* <li
//                                 style={{ marginBottom: '20px', cursor: 'pointer' }}>
//                                 Classification
                            
                              
//                             </li> */}
//                             {/* {isSelectingTargetColumn1 ? (
//                                 <div>
//                                     <label htmlFor="targetColumn">Select Column:</label>
//                                     <select id="targetColumn" style={{marginLeft:'33px'}} name="targetColumn" value={targetColumn1} onChange={handleTargetColumnChange1}>
//                                         <option value="" >Select Column</option>
//                                         {persistedData && persistedData.columns.map((column, index) => (
//                                             <option key={index} value={column}>{column}</option>
//                                         ))}
//                                     </select>
//                                     <span  onClick={handleConfirmTargetColumn1}><CheckIcon style={{fontSize:'larger',position:'relative',top:'5px',left:'10px'}}/></span>
//                                     <span onClick={handleCancelTargetColumnSelection1}><CloseIcon style={{fontSize:'larger',position:'relative',top:'5px',left:'15px'}}/></span>
//                                 </div>
//                             ) : (
//                                 <li
//                                     style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                     onClick={handleClassificationClick}
//                                 >
//                                      Classification
//                                 </li>
//                             )}
//                             {isSelectingTargetColumn2 ? (
//                                 <div>
//                                     <label htmlFor="targetColumn">Select Column:</label>
//                                     <select id="targetColumn" style={{marginLeft:'33px'}} name="targetColumn" value={targetColumn2} onChange={handleTargetColumnChange2}>
//                                         <option value="" >Select Column</option>
//                                         {persistedData && persistedData.columns.map((column, index) => (
//                                             <option key={index} value={column}>{column}</option>
//                                         ))}
//                                     </select>
//                                     <span  onClick={handleConfirmTargetColumn2}><CheckIcon style={{fontSize:'larger',position:'relative',top:'5px',left:'10px'}}/></span>
//                                     <span onClick={handleCancelTargetColumnSelection2}><CloseIcon style={{fontSize:'larger',position:'relative',top:'5px',left:'15px'}}/></span>
//                                 </div>
//                             ) : (
//                                 <li
//                                     style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                     onClick={handleRegressionClick}
//                                 >
//                                      Regression
//                                 </li>
//                             )} */}
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={handleClassificationClick}
//                             >
//                                 Classification
//                             </li>
//                             <li
//                                 style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                 onClick={handleRegressionClick}
//                             >
//                                 Regression
//                             </li>
//                             {isSelectingTargetColumn1 && (
//                                 <div className="target-column-selection">
//                                     <label htmlFor="targetColumn1">Select Column:</label>
//                                     <select id="targetColumn1" name="targetColumn1" value={targetColumn1} onChange={handleTargetColumnChange1}>
//                                         <option value="">Select Column</option>
//                                         {persistedData.columns.map((column, index) => (
//                                             <option key={index} value={column}>{column}</option>
//                                         ))}
//                                     </select>
//                                     <div>
//                                         <span onClick={() => handleConfirmTargetColumn(targetColumn1, 'Classification')}>
//                                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                                         </span>
//                                         <span onClick={handleCancelTargetColumnSelection1}>
//                                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                                         </span>
//                                     </div>
//                                 </div>
//                             )}

//                             {isSelectingTargetColumn2 && (
//                                 <div className="target-column-selection">
//                                     <label htmlFor="targetColumn2">Select Column:</label>
//                                     <select id="targetColumn2" name="targetColumn2" value={targetColumn2} onChange={handleTargetColumnChange2}>
//                                         <option value="">Select Column</option>
//                                         {persistedData.columns.map((column, index) => (
//                                             <option key={index} value={column}>{column}</option>
//                                         ))}
//                                     </select>
//                                     <div>
//                                         <span onClick={() => handleConfirmTargetColumn(targetColumn2, 'Regression')}>
//                                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                                         </span>
//                                         <span onClick={handleCancelTargetColumnSelection2}>
//                                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                                         </span>
//                                     </div>
//                                 </div>
//                             )}


//                         </ul>
//                     </div>
//                 )}
//             </div>
//             {predictions.length > 0 && (
//                 <div className="predictions-container">
//                     <h3>Predictions</h3>
//                     <ul>
//                         {predictions.map((prediction, index) => (
//                             <li key={index}>{prediction}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//         </>
//     );
// }


// import React, { useContext, useEffect, useState } from 'react';
// import Tooltip from '@mui/material/Tooltip';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { CsvContext } from '../csvcontext/csvcontext';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';

// export default function Mlpipeline() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [isSelectingTargetColumn1, setIsSelectingTargetColumn1] = useState(false);
//     const [isSelectingTargetColumn2, setIsSelectingTargetColumn2] = useState(false);
//     const [targetColumn1, setTargetColumn1] = useState('');
//     const [targetColumn2, setTargetColumn2] = useState('');
//     const [predictions, setPredictions] = useState([]);
//     const navigate = useNavigate();

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

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         }, 800);

//         return () => clearTimeout(timer);
//     }, []);

   

    
//     const handleConfirmTargetColumn = async (targetColumn, technique) => {
//         try {
//             if (!targetColumn) {
//                 alert('Please select a target column');
//                 return;
//             }
    
//             if (!persistedData || !persistedData.data || !persistedData.columns) {
//                 throw new Error('No file found in persistedData');
//             }
    
//             const headers = persistedData.columns;
//             const rows = persistedData.data;
//            console.log(rows)
//             const data = {
//                 columns: headers,
//                 data: rows
//             };
    
//             const payload = {
//                 data: data,
//                 target_column: targetColumn,
//                 model_type: technique === 'Classification' ? 'Classification' : 'Regression'
//             };
    
//             const response = await axios.post('http://127.0.0.1:5000/train_and_predict', payload, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (response.data.error) {
//                 throw new Error(response.data.error);
//             }
    
//             setSelectedTechnique(technique);
//             setIsSelectingTargetColumn1(false);
//             setIsSelectingTargetColumn2(false);
//             toast.success("Process applied successfully");
//             console.log("predicted data",response.data.predictions);
//             if (response.data.predictions) {
                
//                 setPredictions(response.data.predictions);
//             }
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };
    

//     const handleTargetColumnChange1 = (event) => {
//         setTargetColumn1(event.target.value);
//     };

//     const handleTargetColumnChange2 = (event) => {
//         setTargetColumn2(event.target.value);
//     };

//     const handleCancelTargetColumnSelection1 = () => {
//         setIsSelectingTargetColumn1(false);
//     };

//     const handleCancelTargetColumnSelection2 = () => {
//         setIsSelectingTargetColumn2(false);
//     };

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const handleClassificationClick = () => {
//         setIsSelectingTargetColumn1(true);
//         setIsSelectingTargetColumn2(false); // Ensure the other selection is closed
//     };

//     const handleRegressionClick = () => {
//         setIsSelectingTargetColumn2(true);
//         setIsSelectingTargetColumn1(false); // Ensure the other selection is closed
//     };

//     return (
//         <>
//             <Button
//                 variant="outlined"
//                 style={{ float: 'right', marginRight: '50px', marginTop: '15px' }}
//                 onClick={uploadPage}
//             >
//                 <ArrowBackIcon fontSize="smaller" style={{ position: 'relative', right: '3px' }} />
//                 Back
//             </Button>
//             <span id="preproccess">Mlpipeline</span>
//             {selectedTechnique && (
//                 <span id='mode-select3'>{selectedTechnique}</span>
//             )}
//             <div className="data-container5"></div>
//             {persistedData && (
//                 <div className="table-container6">
//                     <table className="csv-table6">
//                         <thead>
//                             <tr>
//                                 {persistedData.columns.map((header, index) => (
//                                     <th key={index}>{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {persistedData.data.map((row, rowIndex) => (
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

//             <div className={`sidebar4 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="Preprocess Technique" arrow>
//                     <div className="toggle-button4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content4">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             {isSelectingTargetColumn1 ? (
//                                 <div className="target-column-selection">
//                                     <label htmlFor="targetColumn1">Select Column:</label>
//                                     <select id="targetColumn1" name="targetColumn1" value={targetColumn1} onChange={handleTargetColumnChange1}>
//                                         <option value="">Select Column</option>
//                                         {persistedData.columns.map((column, index) => (
//                                             <option key={index} value={column}>{column}</option>
//                                         ))}
//                                     </select>
//                                     <div>
//                                         <span onClick={() => handleConfirmTargetColumn(targetColumn1, 'Classification')}>
//                                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                                         </span>
//                                         <span onClick={handleCancelTargetColumnSelection1}>
//                                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                                         </span>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <li
//                                     style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                     onClick={handleClassificationClick}
//                                 >
//                                     Classification
//                                 </li>
//                             )}
//                             {isSelectingTargetColumn2 ? (
//                                 <div className="target-column-selection">
//                                     <label htmlFor="targetColumn2">Select Column:</label>
//                                     <select id="targetColumn2" name="targetColumn2" value={targetColumn2} onChange={handleTargetColumnChange2}>
//                                         <option value="">Select Column</option>
//                                         {persistedData.columns.map((column, index) => (
//                                             <option key={index} value={column}>{column}</option>
//                                         ))}
//                                     </select>
//                                     <div>
//                                         <span onClick={() => handleConfirmTargetColumn(targetColumn2, 'Regression')}>
//                                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                                         </span>
//                                         <span onClick={handleCancelTargetColumnSelection2}>
//                                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                                         </span>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <li
//                                     style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                     onClick={handleRegressionClick}
//                                 >
//                                     Regression
//                                 </li>
//                             )}
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             {predictions.length > 0 && (
//                 <div className="predictions-container">
//                     <h3>Predictions</h3>
//                     <ul>
//                         {predictions.map((prediction, index) => (
//                             <li key={index}>{prediction}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </>
//     );
// }


// import React, { useContext, useEffect, useState } from 'react';
// import Tooltip from '@mui/material/Tooltip';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { CsvContext } from '../csvcontext/csvcontext';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';

// export default function Mlpipeline() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [isSelectingTargetColumn1, setIsSelectingTargetColumn1] = useState(false);
//     const [isSelectingTargetColumn2, setIsSelectingTargetColumn2] = useState(false);
//     const [targetColumn1, setTargetColumn1] = useState('');
//     const [targetColumn2, setTargetColumn2] = useState('');
//     const [predictions, setPredictions] = useState([]);
//     const [modelAccuracies, setModelAccuracies] = useState({});
//     const [bestModel, setBestModel] = useState('');
//     const [bestScore, setBestScore] = useState(0);
//     const navigate = useNavigate();

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

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         }, 800);

//         return () => clearTimeout(timer);
//     }, []);

//     const handleConfirmTargetColumn = async (targetColumn, technique) => {
//         try {
//             if (!targetColumn) {
//                 alert('Please select a target column');
//                 return;
//             }
    
//             if (!persistedData || !persistedData.data || !persistedData.columns) {
//                 throw new Error('No file found in persistedData');
//             }
    
//             const headers = persistedData.columns;
//             const rows = persistedData.data;
    
//             const data = {
//                 columns: headers,
//                 data: rows
//             };
    
//             const payload = {
//                 data: data,
//                 target_column: targetColumn,
//                 model_type: technique === 'Classification' ? 'Classification' : 'Regression'
//             };
    
//             const response = await axios.post('http://127.0.0.1:5000/train_and_predict', payload, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (response.data.error) {
//                 throw new Error(response.data.error);
//             }
    
//             setSelectedTechnique(technique);
//             setIsSelectingTargetColumn1(false);
//             setIsSelectingTargetColumn2(false);
//             toast.success("Process applied successfully");
//             console.log('Response from backend:', response.data);
//             if (response.data.predictions) {
//                 setPredictions(response.data.predictions);
//                 console.log("hiiiiiiii");
//             }
    
//             if (response.data.modelAccuracies && response.data.bestModel && response.data.bestScore) {
//                 setModelAccuracies(response.data.modelAccuracies);
//                 setBestModel(response.data.bestModel);
//                 setBestScore(response.data.bestScore);
//             }
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };
    
//     const handleTargetColumnChange1 = (event) => {
//         setTargetColumn1(event.target.value);
//     };

//     const handleTargetColumnChange2 = (event) => {
//         setTargetColumn2(event.target.value);
//     };

//     const handleCancelTargetColumnSelection1 = () => {
//         setIsSelectingTargetColumn1(false);
//     };

//     const handleCancelTargetColumnSelection2 = () => {
//         setIsSelectingTargetColumn2(false);
//     };

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const handleClassificationClick = () => {
//         setIsSelectingTargetColumn1(true);
//         setIsSelectingTargetColumn2(false); // Ensure the other selection is closed
//     };

//     const handleRegressionClick = () => {
//         setIsSelectingTargetColumn2(true);
//         setIsSelectingTargetColumn1(false); // Ensure the other selection is closed
//     };

//     return (
//         <>
//             <Button
//                 variant="outlined"
//                 style={{ float: 'right', marginRight: '50px', marginTop: '15px' }}
//                 onClick={uploadPage}
//             >
//                 <ArrowBackIcon fontSize="smaller" style={{ position: 'relative', right: '3px' }} />
//                 Back
//             </Button>
//             <span id="preproccess">Mlpipeline</span>
//             {selectedTechnique && (
//                 <span id='mode-select3'>{selectedTechnique}</span>
//             )}
//             <div className="data-container5"></div>
//             {persistedData && (
//                 <div className="table-container6">
//                     <table className="csv-table6">
//                         <thead>
//                             <tr>
//                                 {persistedData.columns.map((header, index) => (
//                                     <th key={index}>{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {persistedData.data.map((row, rowIndex) => (
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

//             <div className={`sidebar4 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="Preprocess Technique" arrow>
//                     <div className="toggle-button4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content4">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             {isSelectingTargetColumn1 ? (
//                                 <div className="target-column-selection">
//                                     <label htmlFor="targetColumn1">Select Column:</label>
//                                     <select id="targetColumn1" name="targetColumn1" value={targetColumn1} onChange={handleTargetColumnChange1}>
//                                         <option value="">Select Column</option>
//                                         {persistedData.columns.map((column, index) => (
//                                             <option key={index} value={column}>{column}</option>
//                                         ))}
//                                     </select>
//                                     <div>
//                                         <span onClick={() => handleConfirmTargetColumn(targetColumn1, 'Classification')}>
//                                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                                         </span>
//                                         <span onClick={handleCancelTargetColumnSelection1}>
//                                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                                         </span>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <li
//                                     style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                     onClick={handleClassificationClick}
//                                 >
//                                     Classification
//                                 </li>
//                             )}
//                             {isSelectingTargetColumn2 ? (
//                                 <div className="target-column-selection">
//                                     <label htmlFor="targetColumn2">Select Column:</label>
//                                     <select id="targetColumn2" name="targetColumn2" value={targetColumn2} onChange={handleTargetColumnChange2}>
//                                         <option value="">Select Column</option>
//                                         {persistedData.columns.map((column, index) => (
//                                             <option key={index} value={column}>{column}</option>
//                                         ))}
//                                     </select>
//                                     <div>
//                                         <span onClick={() => handleConfirmTargetColumn(targetColumn2, 'Regression')}>
//                                             <CheckIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '10px' }} />
//                                         </span>
//                                         <span onClick={handleCancelTargetColumnSelection2}>
//                                             <CloseIcon style={{ fontSize: 'larger', position: 'relative', top: '5px', left: '15px' }} />
//                                         </span>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <li
//                                     style={{ marginBottom: '30px', cursor: 'pointer' }}
//                                     onClick={handleRegressionClick}
//                                 >
//                                     Regression
//                                 </li>
//                             )}
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             {Object.keys(modelAccuracies).length > 0 && (
//                 <div className="model-accuracy-container">
//                     <h3>Model Accuracies</h3>
//                     <table className="model-accuracy-table">
//                         <thead>
//                             <tr>
//                                 <th>Model</th>
//                                 <th>Accuracy</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {Object.keys(modelAccuracies).map((model, index) => (
//                                 <tr key={index}>
//                                     <td>{model}</td>
//                                     <td>{modelAccuracies[model]}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <p>Best Model: {bestModel} with a score of {bestScore}</p>
//                 </div>
//             )}

//             {predictions.length > 0 && (
//                 <div className="predictions-container">
//                     <h3>Predictions</h3>
//                     <ul>
//                         {predictions.map((prediction, index) => (
//                             <li key={index}>{prediction}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </>
//     );
// }

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

export default function Mlpipeline() {
    const { csvData } = useContext(CsvContext);
    const [persistedData, setPersistedData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedTechnique, setSelectedTechnique] = useState(null);
    const [isSelectingTargetColumn1, setIsSelectingTargetColumn1] = useState(false);
    const [isSelectingTargetColumn2, setIsSelectingTargetColumn2] = useState(false);
    const [targetColumn1, setTargetColumn1] = useState('');
    const [targetColumn2, setTargetColumn2] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [modelAccuracies, setModelAccuracies] = useState({});
    const [bestModel, setBestModel] = useState('');
    const [bestScore, setBestScore] = useState(null);
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

    const handleConfirmTargetColumn = async (targetColumn, technique) => {
        try {
            if (!targetColumn) {
                alert('Please select a target column');
                return;
            }

            if (!persistedData || !persistedData.data || !persistedData.columns) {
                throw new Error('No file found in persistedData');
            }

            const headers = persistedData.columns;
            const rows = persistedData.data;

            const data = {
                columns: headers,
                data: rows
            };

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
            }
        } catch (error) {
            console.error('Error processing the data:', error);
            alert('Error processing the data');
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
        navigate('/upload');
    };

    const handleClassificationClick = () => {
        setIsSelectingTargetColumn1(true);
        setIsSelectingTargetColumn2(false); // Ensure the other selection is closed
    };

    const handleRegressionClick = () => {
        setIsSelectingTargetColumn2(true);
        setIsSelectingTargetColumn1(false); // Ensure the other selection is closed
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
            <span id="preproccess">Mlpipeline</span>
            {selectedTechnique && (
                <span id='mode-select3'>{selectedTechnique}</span>
            )}
            <div className="data-container5"></div>
            {persistedData && (
                <div className="table-container6">
                    <table className="csv-table6">
                        <thead>
                            <tr>
                                {persistedData.columns.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {persistedData.data.map((row, rowIndex) => (
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

            {Object.keys(modelAccuracies).length > 0 && (
                <div className="model-accuracies-container">
                    <h3>Model Accuracies</h3>
                    <ul>
                        {Object.keys(modelAccuracies).map((model, index) => (
                            <li key={index}>{model}: {modelAccuracies[model]}</li>
                        ))}
                    </ul>
                    <p>Best Model: {bestModel} with a score of {bestScore}</p>
                </div>
            )}

            {predictions.length > 0 && (
                <div className="predictions-container">
                    <h3>Predictions</h3>
                    <ul>
                        {predictions.map((prediction, index) => (
                            <li key={index}>{prediction}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
