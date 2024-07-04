

// import Tooltip from '@mui/material/Tooltip';
// import React, { useContext, useEffect, useState } from 'react';
// import { CsvContext } from '../csvcontext/csvcontext';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import axios from "axios";
// import {toast} from "react-toastify"

// export default function Imbalanceddataset(){
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [activeItem, setActiveItem] = useState(null);
//     const [processedData, setProcessedData] = useState(null);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
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
//         // Open the sidebar after 1 second
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         },800);

//         // Clear the timer on component unmount
//         return () => clearTimeout(timer);
//     }, []);
//     const handleItemClick = (item) => {
//         setActiveItem(activeItem === item ? null : item);
//     };

//     const dataToDisplay = processedData || csvData || persistedData;

//     const uploadPage=()=>{
//         navigate('/upload');

//     };

//     const handleUnderSamplingClick = async () => {
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

//             const response = await axios.post('http://127.0.0.1:5000/segment_data', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             toast.success("proccess applied");

//             setSelectedTechnique('Data Segmentation');
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };


//     return (
//         <>
//           <Button variant="outlined" style={{float:'right',marginRight:'50px',marginTop:'15px',}} onClick={uploadPage}>< ArrowBackIcon  fontSize="smaller" style={{position:'relative',right:'3px'}} />Back</Button>
//         <span id='preproccess'>Handling Imbalanced dataset</span>
//          {selectedTechnique && (
//             <span id='mode-select3'>{selectedTechnique}</span>
//          )}
//         <div className="data-container4"></div>
//         {dataToDisplay && (
//             <div className="table-container4">
//                 <table className="csv-table4">
//                     <thead>
//                         <tr>
//                             {dataToDisplay.columns.map((header, index) => (
//                                 <th key={index}>{header}</th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {dataToDisplay.data.map((row, rowIndex) => (
//                             <tr key={rowIndex}>
//                                 {row.map((cell, colIndex) => (
//                                     <td key={colIndex}>{cell}</td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         )}
//         <div className={`sidebar3 ${isSidebarOpen ? 'open' : ''}`}>
//         <Tooltip title="preprocess technique" arrow>
//           <div className="toggle-button3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//               {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//           </div>
//           </Tooltip>
//           {isSidebarOpen && (
//               <div className="sidebar-content3">
//                   <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                       <li
//                           style={{ marginBottom: '20px', cursor: 'pointer' }}
//                           onClick={() =>{ handleItemClick('Under Sampling');handleUnderSamplingClick();}}
//                       >
//                           Under Sampling

//                       </li>
//                       <li
//                           style={{ marginBottom: '30px', cursor: 'pointer' }}
//                           onClick={() => handleItemClick('Over Sampling')}
//                       >
//                           Over Sampling

//                       </li>
//                       <li
//                           style={{ marginBottom: '30px', cursor: 'pointer' }}
//                           onClick={() => handleItemClick('Smote')}
//                       >
//                          Smote

//                       </li>
//                       <li
//                           style={{ marginBottom: '30px', cursor: 'pointer' }}
//                           onClick={() => handleItemClick('Borderline Smote')}
//                       >
//                           Borderline Smote

//                       </li>
//                       <li
//                           style={{ marginBottom: '30px', cursor: 'pointer' }}
//                           onClick={() => handleItemClick('Adasyn')}
//                       >
//                           Adasyn

//                       </li>

//                   </ul>
//               </div>
//           )}
//       </div>
//     </>
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

// export default function Imbalanceddataset() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [activeItem, setActiveItem] = useState(null);
//     const [processedData, setProcessedData] = useState(null);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
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
//         // Open the sidebar after 1 second
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         }, 800);

//         // Clear the timer on component unmount
//         return () => clearTimeout(timer);
//     }, []);

//     const handleItemClick = (item) => {
//         setActiveItem(activeItem === item ? null : item);
//     };

//     const handleUnderSamplingClick = async () => {
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
//             formData.append('method', 'under'); // Adjust method based on your backend API

//             const response = await axios.post('http://127.0.0.1:5000/balance', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             setProcessedData(response.data.balanced_data);
//             setSelectedTechnique('Under Sampling');
//             toast.success('Process applied successfully');
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const dataToDisplay = processedData || csvData || persistedData;

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
//             <span id="preproccess">Handling Imbalanced dataset</span>
//             {selectedTechnique && <span id="mode-select3">{selectedTechnique}</span>}
//             <div className="data-container4"></div>
//             {dataToDisplay && (
//                 <div className="table-container4">
//                     <table className="csv-table4">
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
//             <div className={`sidebar3 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="preprocess technique" arrow>
//                     <div className="toggle-button3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content3">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li
//                                 style={{ marginBottom: '20px', cursor: 'pointer' }}
//                                 onClick={() => {
//                                     handleItemClick('Under Sampling');
//                                     handleUnderSamplingClick();
//                                 }}
//                             >
//                                 Under Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Over Sampling')}>
//                                 Over Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Smote')}>
//                                 Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Borderline Smote')}>
//                                 Borderline Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Adasyn')}>
//                                 Adasyn
//                             </li>
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

// export default function Imbalanceddataset() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [activeItem, setActiveItem] = useState(null);
//     const [processedData, setProcessedData] = useState(null);
//     console.log("data",processedData)
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [classDistributionImage, setClassDistributionImage] = useState(null); // State to hold the image URL
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
//         // Open the sidebar after 1 second
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         }, 800);

//         // Clear the timer on component unmount
//         return () => clearTimeout(timer);
//     }, []);

//     // const handleItemClick = async (item) => {
//     //     setActiveItem(item);
//     //     try {
//     //         if (!persistedData || !persistedData.data || !persistedData.columns) {
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
//     //         formData.append('method', item.toLowerCase()); // Adjust method based on your backend API

//     //         const response = await axios.post('http://127.0.0.1:5000/balance', formData, {
//     //             headers: {
//     //                 'Content-Type': 'multipart/form-data'
//     //             }
//     //         });
//     //         console.log('Response Data:', response.data); // Log entire response data for debugging
//     //         console.log('dataframe:', response.data.balanced_data);
//     //         if (response.data.balanced_data) {
//     //             console.log("data added")
//     //             setProcessedData(response.data.balanced_data);
//     //         }
//     //          if (response.data.image) {
//     //             setClassDistributionImage(`data:image/png;base64,${response.data.image}`); // Set the image URL

//     //         }
//     //         setSelectedTechnique(item);
//     //         if (response.data.image) {
//     //             setClassDistributionImage(response.data.image); // Set the image URL
//     //         }
//     //         toast.success('Process applied successfully');
//     //     } catch (error) {
//     //         console.error('Error processing the data:', error);
//     //         alert('Error processing the data');
//     //     }
//     // };

//     const handleItemClick = async (item) => {
//         setActiveItem(item);
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
//             formData.append('method', item.toLowerCase());

//             const response = await axios.post('http://127.0.0.1:5000/balance', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             console.log('Response Data:', response.data);
//             console.log("Processed Data:", response.data.processed_data);
//             if (response.data.processed_data) {
//                 const { balanced_data, image } = response.data.processed_data;
//                 console.log("Processed Data:", response.data.processed_data);

//                 if (balanced_data && balanced_data.columns && balanced_data.data) {
//                     console.log("Balanced Data:", balanced_data);
//                     setProcessedData({
//                         columns: balanced_data.columns,
//                         data: balanced_data.data
//                     });
//                 } else {
//                     console.error('Incomplete balanced data:', balanced_data);
//                     toast.error('Incomplete balanced data');
//                 }

//                 if (image) {
//                     setClassDistributionImage(`data:image/png;base64,${image}`);
//                 } else {
//                     console.error('Missing image data:', image);
//                     toast.error('Missing image data');
//                 }

//                 setSelectedTechnique(item);
//                 toast.success('Process applied successfully');
//             } else {
//                 console.error('Incomplete or unexpected response format:', response.data);
//                 toast.error('Incomplete or unexpected response format');
//             }
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const dataToDisplay = processedData || csvData || persistedData;

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
//             <span id="preproccess">Handling Imbalanced dataset</span>
//             {selectedTechnique && <span id="mode-select3">{selectedTechnique}</span>}
//             <div className="data-container4"></div>
//             {dataToDisplay && (
//                 <div className="table-container4">
//                     <table className="csv-table4">
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
//             {classDistributionImage && ( // Render the image if available
//                 <div className="image-container">
//                     <img src={classDistributionImage} alt="Class Distribution" />
//                 </div>
//             )}
//             <div className={`sidebar3 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="preprocess technique" arrow>
//                     <div className="toggle-button3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content3">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li
//                                 style={{ marginBottom: '20px', cursor: 'pointer' }}
//                                 onClick={() => handleItemClick('under')}
//                             >
//                                 Under Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('over')}>
//                                 Over Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('smote')}>
//                                 Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Borderline Smote')}>
//                                 Borderline Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Adasyn')}>
//                                 Adasyn
//                             </li>
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

// export default function Imbalanceddataset() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [activeItem, setActiveItem] = useState(null);
//     const [processedData, setProcessedData] = useState(null);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [classDistributionImage, setClassDistributionImage] = useState(null);
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

//     const handleItemClick = async (item) => {
//         setActiveItem(item);
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
//             formData.append('method', item.toLowerCase());

//             const response = await axios.post('http://127.0.0.1:5000/balance', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             console.log('Response Data:', response.data);

//             if (response.data && response.data.processed_data) {
//                 const { balanced_data, image } = response.data.processed_data;

//                 if (balanced_data && balanced_data.columns && balanced_data.data) {
//                     setProcessedData({
//                         columns: balanced_data.columns,
//                         data: balanced_data.data
//                     });
//                 } else {
//                     console.error('Incomplete balanced data:', balanced_data);
//                     toast.error('Incomplete balanced data');
//                 }

//                 if (image) {
//                     setClassDistributionImage(`data:image/png;base64,${image}`);
//                 } else {
//                     console.error('Missing image data:', image);
//                     toast.error('Missing image data');
//                 }

//                 setSelectedTechnique(item);
//                 toast.success('Process applied successfully');
//             } else {
//                 console.error('Incomplete or unexpected response format:', response.data);
//                 toast.error('Incomplete or unexpected response format');
//             }
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             alert('Error processing the data');
//         }
//     };

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const dataToDisplay = processedData || csvData || persistedData;

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
//             <span id="preproccess">Handling Imbalanced dataset</span>
//             {selectedTechnique && <span id="mode-select3">{selectedTechnique}</span>}
//             <div className="data-container4"></div>
//             {dataToDisplay && (
//                 <div className="table-container4">
//                     <table className="csv-table4">
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
//             {classDistributionImage && (
//                 <div className="image-container">
//                     <img src={classDistributionImage} alt="Class Distribution" />
//                 </div>
//             )}
//             <div className={`sidebar3 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="preprocess technique" arrow>
//                     <div className="toggle-button3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content3">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li
//                                 style={{ marginBottom: '20px', cursor: 'pointer' }}
//                                 onClick={() => handleItemClick('under')}
//                             >
//                                 Under Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('over')}>
//                                 Over Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('smote')}>
//                                 Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Borderline Smote')}>
//                                 Borderline Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Adasyn')}>
//                                 Adasyn
//                             </li>
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

// export default function Imbalanceddataset() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [activeItem, setActiveItem] = useState(null);
//     const [processedData, setProcessedData] = useState(null);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [classDistributionImage, setClassDistributionImage] = useState(null);
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

//     const handleItemClick = async (item) => {
//         setActiveItem(item);
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
//             formData.append('method', item.toLowerCase());

//             // Send request to backend
//             const response = await axios.post('http://127.0.0.1:5000/balance', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             // Handle response
//             console.log('Response Data:', response.data);

//             if (response.status === 200) {
//                 const { balanced_data, image_url } = response.data;

//                 if (balanced_data && balanced_data.columns && balanced_data.data) {
//                     setProcessedData(balanced_data);
//                 } else {
//                     console.error('Incomplete balanced data:', balanced_data);
//                     toast.error('Incomplete balanced data');
//                 }

//                 if (image_url) {
//                     setClassDistributionImage(image_url);
//                 } else {
//                     console.error('Missing image URL:', image_url);
//                     toast.error('Missing image URL');
//                 }

//                 setSelectedTechnique(item);
//                 toast.success('Process applied successfully');
//             } else {
//                 console.error('Incomplete or unexpected response format:', response.data);
//                 toast.error('Incomplete or unexpected response format');
//             }
//         } catch (error) {
//             console.error('Error processing the data:', error.message);
//             toast.error('Error processing the data: ' + error.message);
//         }
//     };

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const dataToDisplay = processedData || csvData || persistedData;

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
//             <span id="preproccess">Handling Imbalanced dataset</span>
//             {selectedTechnique && <span id="mode-select3">{selectedTechnique}</span>}
//             <div className="data-container4"></div>
//             {dataToDisplay && (
//                 <div className="table-container4">
//                     <table className="csv-table4">
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
//             {classDistributionImage && (
//                 <div className="image-container">
//                     <img src={classDistributionImage} alt="Class Distribution" />
//                 </div>
//             )}
//             <div className={`sidebar3 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="preprocess technique" arrow>
//                     <div className="toggle-button3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content3">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li
//                                 style={{ marginBottom: '20px', cursor: 'pointer' }}
//                                 onClick={() => handleItemClick('under')}
//                             >
//                                 Under Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('over')}>
//                                 Over Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('smote')}>
//                                 Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Borderline Smote')}>
//                                 Borderline Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Adasyn')}>
//                                 Adasyn
//                             </li>
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

// export default function Imbalanceddataset() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [activeItem, setActiveItem] = useState(null);
//     const [processedData, setProcessedData] = useState(null);
//     // console.log("process",processedData)
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [classDistributionImage, setClassDistributionImage] = useState(null);
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

//     const handleItemClick = async (item) => {
//         setActiveItem(item);
//         try {
//             if (!persistedData || !persistedData.data || !persistedData.columns) {
//                 throw new Error('No file found in persistedData');
//             }
    
//             const headers = persistedData.columns.join(',');
//             const rows = persistedData.data.map(row => row.join(',')).join('\n');
//             const csvContent = `${headers}\n${rows}`;
    
//             const csvData = new Blob([csvContent], { type: 'text/csv' });
//             const formData = new FormData();
//             formData.append('file', csvData, 'data.csv');
//             formData.append('method', item.toLowerCase());
    
//             // Send request to backend
//             const response = await axios.post('http://127.0.0.1:5000/balance', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log(response.data.balanced_data)
//             setProcessedData(response.data)  
//             // Handle successful response
//             setProcessedData({
//                 columns: response.data.balanced_data.columns,
//                 data: response.data.balanced_data.data
//             });
    
//             setClassDistributionImage(`data:image/png;base64,${response.data.image_url}`);
    
//         } catch (error) {
//             console.error('Error processing the data:', error);
    
//             // Display user-friendly error message
//             toast.error('Error processing the data. Please try again.');
    
//             // Optionally, you can handle specific errors
//             if (error.response && error.response.status === 400) {
//                 console.log('Bad request:', error.response.data.error);
//             } else if (error.response && error.response.status === 500) {
//                 console.log('Internal server error:', error.response.data.error);
//             }
//         }
//     };
    

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const dataToDisplay = processedData || csvData || persistedData;

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
//             <span id="preproccess">Handling Imbalanced dataset</span>
//             {selectedTechnique && <span id="mode-select3">{selectedTechnique}</span>}
//             <div className="data-container4"></div>
//             {dataToDisplay && (
//                 <div className="table-container4">
//                     <table className="csv-table4">
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
//             {classDistributionImage && (
//                 <div className="image-container">
//                     <img src={classDistributionImage} alt="Class Distribution"  style={{ maxWidth: '52%', position: 'relative', bottom: '40px', left: '270px' }} />
//                 </div>
//             )}
//             <div className={`sidebar3 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="preprocess technique" arrow>
//                     <div className="toggle-button3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content3">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li
//                                 style={{ marginBottom: '20px', cursor: 'pointer' }}
//                                 onClick={() => handleItemClick('under')}
//                             >
//                                 Under Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('over')}>
//                                 Over Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('smote')}>
//                                 Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Borderline Smote')}>
//                                 Borderline Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Adasyn')}>
//                                 Adasyn
//                             </li>
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

// export default function Imbalanceddataset() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [processedData, setProcessedData] = useState(null);
//     const [classDistributionImage, setClassDistributionImage] = useState(null);
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

//     const handleItemClick = async (item) => {
//         try {
//             if (!persistedData || !persistedData.data || !persistedData.columns) {
//                 throw new Error('No file found in persistedData');
//             }

//             const headers = persistedData.columns.join(',');
//             const rows = persistedData.data.map(row => row.join(',')).join('\n');
//             const csvContent = `${headers}\n${rows}`;

//             const csvData = new Blob([csvContent], { type: 'text/csv' });
//             const formData = new FormData();
//             formData.append('file', csvData, 'data.csv');
//             formData.append('method', item.toLowerCase());

//             // Send request to backend
//             const response = await axios.post('http://127.0.0.1:5000/balance', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             console.log("Full Response:", response.data);

//             // Set processed data
//             setProcessedData(response.data);
//             toast.success('Process applied successfully');
//         } catch (error) {
//             console.error('Error processing the data:', error);
//             toast.error('Error processing the data. Please try again.');

//             if (error.response) {
//                 if (error.response.status === 400) {
//                     console.log('Bad request:', error.response.data.error);
//                 } else if (error.response.status === 500) {
//                     console.log('Internal server error:', error.response.data.error);
//                 }
//             }
//         }
//     };

//     const uploadPage = () => {
//         navigate('/upload');
//     };

//     const dataToDisplay =  csvData || persistedData;

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
//             <span id="preproccess">Handling Imbalanced dataset</span>
//             <div className="data-container4"></div>
//             {dataToDisplay && (
//                 <div className="table-container4">
//                     <table className="csv-table4">
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
//             {classDistributionImage && (
//                 <div className="image-container">
//                     <img src={classDistributionImage} alt="Class Distribution" style={{ maxWidth: '100%', position: 'relative', bottom: '40px', left: '0' }} />
//                 </div>
//             )}
//             <div className={`sidebar3 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="preprocess technique" arrow>
//                     <div className="toggle-button3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
//                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content3">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li
//                                 style={{ marginBottom: '20px', cursor: 'pointer' }}
//                                 onClick={() => handleItemClick('under')}
//                             >
//                                 Under Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('over')}>
//                                 Over Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('smote')}>
//                                 Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Borderline Smote')}>
//                                 Borderline Smote
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Adasyn')}>
//                                 Adasyn
//                             </li>
//                         </ul>
//                     </div>
//                 )}
//             </div>
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

export default function Imbalanceddataset() {
    const { csvData } = useContext(CsvContext);
    const [persistedData, setPersistedData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [processedData, setProcessedData] = useState(null);
    const [classDistributionImage, setClassDistributionImage] = useState(null);
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

    const handleItemClick = async (item) => {
        try {
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

            // Set processed data
            if (response.data && response.data.balanced_data) {
                setProcessedData({
                    columns: response.data.balanced_data.columns,
                    data: response.data.balanced_data.data
                });
                if (response.data.image_url) {
                    setClassDistributionImage(`data:image/png;base64,${response.data.image_url}`);
                }
            } else {
                throw new Error('Invalid data received from server');
            }

            toast.success('Process applied successfully');
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

    const dataToDisplay = processedData || csvData || persistedData;

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
            <div className="data-container4"></div>
            {dataToDisplay && (
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
            {classDistributionImage && (
                <div className="image-container">
                    <img src={classDistributionImage} alt="Class Distribution" style={{ maxWidth: '100%', position: 'relative', bottom: '40px', left: '0' }} />
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
                                Smote
                            </li>
                            <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Borderline Smote')}>
                                Borderline Smote
                            </li>
                            <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('Adasyn')}>
                                Adasyn
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
