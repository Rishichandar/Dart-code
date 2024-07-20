
import React, { useContext, useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
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
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Snackbar from '@mui/material/Snackbar';

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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [showNewDataInput, setShowNewDataInput] = useState(false);
    const [newData, setNewData] = useState({});
    const [predictions, setPredictions] = useState([]);
    const [targetColumn, setTargetColumn] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem('processData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setPersistedData(parsedData);
            console.log("saved data",savedData);
        }
    }, []);

    // useEffect(() => {
    //     if (processedData) {
    //         console.log(processedData);
    //         localStorage.setItem('processData', JSON.stringify(processedData));
    //         setPersistedData(processedData);
    //         checkForNullValues(processedData);
    //     }
    // }, [processedData]);
    useEffect(() => {
                if (processedData) {
                    const columns = processedData.columns;
                    const data = JSON.parse(processedData.data).map(row => Object.values(row));
                    const index = data.map((_, idx) => idx);
        
                    const transformedData = { columns, data, index };
        
                    console.log("Transformed data:", transformedData);
                    localStorage.setItem('processData', JSON.stringify(transformedData));
                    setPersistedData(transformedData);
                    checkForNullValues(transformedData);
                }
            }, [processedData]);
        

//     useEffect(() => {
//     if (processedData) {
//         const dataArray = Array.isArray(processedData) ? processedData : [processedData];
//         console.log(dataArray);
//         localStorage.setItem('processData', JSON.stringify(dataArray));
//         setPersistedData(dataArray);
//         checkForNullValues(dataArray);
//     }
// }, [processedData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSidebarOpen(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const checkForNullValues = (data) => {
        if (data && Array.isArray(data.data)) {
            const hasNulls = data.data.some(row => row.some(cell => cell === null || cell === ''));
            setHasNullValues(hasNulls);
        } else {
            setHasNullValues(true);
        }
    };

    const handleItemClick = async (item) => {
        try {
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
            formData.append('target_column', targetColumn);

            const response = await axios.post('http://127.0.0.1:5000/balance', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Full Response:", response.data);

            const { balanced_data, image_url } = response.data;

            if (balanced_data && image_url) {
                setProcessedData(balanced_data);
                console.log("balanced data", balanced_data);
                setClassDistributionImage(`data:image/png;base64,${image_url}`);
                setSelectedTechnique(item);
                toast.success('Process applied successfully');
                setSnackbarOpen(true);
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

    const handleNewDataChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        });
    };

    const handlePredict = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', newData);
            setPredictions(response.data.predictions);
        } catch (error) {
            console.error('Error predicting the data:', error);
            toast.error('Error predicting the data. Please try again.');
        }
    };

    const handleConfirmNewData = () => {
        setShowNewDataInput(true);
        setSnackbarOpen(false);
    };

    const handleCancelNewData = () => {
        setShowNewDataInput(false);
        setSnackbarOpen(false);
    };

    const uploadPage = () => {
        navigate('/Featureengineering');
    };

    const nextPage = () => {
        navigate('/Mlpipeline');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dataToDisplay = persistedData || csvData;

    return (
        <>
            <span variant="outlined" style={{ float: 'right', marginRight: '50px', marginTop: '15px' }} onClick={nextPage}><KeyboardDoubleArrowRightIcon /></span>
            <span variant="outlined" style={{ float: 'left', position: 'relative', left: '255px', top: '15px' }} onClick={uploadPage}><KeyboardDoubleArrowLeftIcon /></span>
            <span id="preproccess">Handling Imbalanced dataset</span>
            {selectedTechnique && (
                <span id='mode-select3'>{selectedTechnique}</span>
            )}
            <div className="data-container4"></div>
            {dataToDisplay && !processedData && Array.isArray(dataToDisplay.data) && (
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
                    <img src={classDistributionImage} alt="Class Distribution" style={{ maxWidth: '35%', position: 'absolute', bottom: '60px', right: '10px' }} />
                </div>
            )}
           

            {showNewDataInput && (
                <div className="new-data-input" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px', margin: '10px 0' }}>
                    {persistedData.columns.map((column) => (
                        <div key={column} style={{ marginBottom: '10px' }}>
                            <label style={{ marginRight: '10px' }}>{column}</label>
                            <input
                                type="text"
                                name={column}
                                value={newData[column] || ''}
                                onChange={handleNewDataChange}
                                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                    ))}
                    <Button variant="contained" color="primary" onClick={handlePredict}>
                        Predict
                    </Button>
                </div>
            )}
            {predictions.length > 0 && (
                <div className="predictions" style={{ marginTop: '20px' }}>
                    <h3>Predictions</h3>
                    <ul>
                        {predictions.map((prediction, index) => (
                            <li key={index}>{prediction}</li>
                        ))}
                    </ul>
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
            {/* Select Target Column Dropdown */}
            <div style={{ position:'relative',left: '40px' }}>
                <label>Target Column:</label>
                <select value={targetColumn} onChange={(e) => setTargetColumn(e.target.value)}>
                    <option value="">Select Column</option>
                    {persistedData && persistedData.columns.map((column) => (
                        <option key={column} value={column}>{column}</option>
                    ))}
                </select>
            </div>

            {/* Preprocess Technique List */}
            <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '90px',right:'60px' }}>
                <li style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => handleItemClick('under')}>
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

// import React, { useContext, useEffect, useState } from 'react';
// import Tooltip from '@mui/material/Tooltip';
// import SwitchRightIcon from '@mui/icons-material/SwitchRight';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { CsvContext } from '../csvcontext/csvcontext';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Slide from '@mui/material/Slide';
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
// import Snackbar from '@mui/material/Snackbar';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

// export default function Imbalanceddataset() {
//     const { csvData } = useContext(CsvContext);
//     const [persistedData, setPersistedData] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [processedData, setProcessedData] = useState(null);
//     const [classDistributionImage, setClassDistributionImage] = useState(null);
//     const [selectedTechnique, setSelectedTechnique] = useState(null);
//     const [hasNullValues, setHasNullValues] = useState(false);
//     const [open, setOpen] = useState(false);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [showNewDataInput, setShowNewDataInput] = useState(false);
//     const [newData, setNewData] = useState({});
//     const [predictions, setPredictions] = useState([]);
//     const [targetColumn, setTargetColumn] = useState('');

//     const navigate = useNavigate();

//     useEffect(() => {
//         const savedData = localStorage.getItem('processData');
//         if (savedData) {
//             const parsedData = JSON.parse(savedData);
//             setPersistedData(parsedData);
//             console.log("Saved data:", parsedData);
//         }
//     }, []);

//     useEffect(() => {
//         if (processedData) {
//             const columns = processedData.columns;
//             const data = JSON.parse(processedData.data).map(row => Object.values(row));
//             const index = data.map((_, idx) => idx);

//             const transformedData = { columns, data, index };

//             console.log("Transformed data:", transformedData);
//             localStorage.setItem('processData', JSON.stringify(transformedData));
//             setPersistedData(transformedData);
//             checkForNullValues(transformedData);
//         }
//     }, [processedData]);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsSidebarOpen(true);
//         }, 800);

//         return () => clearTimeout(timer);
//     }, []);

//     const checkForNullValues = (data) => {
//         if (data && Array.isArray(data.data)) {
//             const hasNulls = data.data.some(row => row.some(cell => cell === null || cell === ''));
//             setHasNullValues(hasNulls);
//         } else {
//             setHasNullValues(true);
//         }
//     };

//     const handleItemClick = async (item) => {
//         try {
//             if (['smote', 'borderline-smote', 'adasyn'].includes(item) && hasNullValues) {
//                 handleClickOpen();
//                 return;
//             }

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
//             formData.append('target_column', targetColumn);

//             const response = await axios.post('http://127.0.0.1:5000/balance', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             console.log("Full Response:", response.data);

//             const { balanced_data, image_url } = response.data;

//             if (balanced_data && image_url) {
//                 setProcessedData(balanced_data);
//                 console.log("Balanced data:", balanced_data);
//                 setClassDistributionImage(`data:image/png;base64,${image_url}`);
//                 setSelectedTechnique(item);
//                 toast.success('Process applied successfully');
//                 setSnackbarOpen(true);
//             } else {
//                 console.error('Missing balanced_data or image_url in response:', response.data);
//                 throw new Error('Missing balanced_data or image_url in response');
//             }
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

//     const handleNewDataChange = (e) => {
//         setNewData({
//             ...newData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handlePredict = async () => {
//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', newData);
//             setPredictions(response.data.predictions);
//         } catch (error) {
//             console.error('Error predicting the data:', error);
//             toast.error('Error predicting the data. Please try again.');
//         }
//     };

//     const handleConfirmNewData = () => {
//         setShowNewDataInput(true);
//         setSnackbarOpen(false);
//     };

//     const handleCancelNewData = () => {
//         setShowNewDataInput(false);
//         setSnackbarOpen(false);
//     };

//     const uploadPage = () => {
//         navigate('/Featureengineering');
//     };

//     const nextPage = () => {
//         navigate('/Mlpipeline');
//     };

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const dataToDisplay = persistedData || csvData;

//     return (
//         <>
//             <span variant="outlined" style={{ float: 'right', marginRight: '50px', marginTop: '15px' }} onClick={nextPage}><KeyboardDoubleArrowRightIcon /></span>
//             <span variant="outlined" style={{ float: 'left', position: 'relative', left: '255px', top: '15px' }} onClick={uploadPage}><KeyboardDoubleArrowLeftIcon /></span>
//             <span id="preproccess">Handling Imbalanced dataset</span>
//             {selectedTechnique && (
//                 <span id='mode-select3'>{selectedTechnique}</span>
//             )}
//             <div className="data-container4"></div>
//             {dataToDisplay && !processedData && Array.isArray(dataToDisplay.data) && (
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
//             {processedData && (
//                 <div className="table-container5">
//                     <table className="csv-table5">
//                         <thead>
//                             <tr>
//                                 {processedData.columns.map((header, index) => (
//                                     <th key={index}>{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {processedData.data && JSON.parse(processedData.data).map((row, rowIndex) => (
//                                 <tr key={rowIndex}>
//                                     {Object.values(row).map((cell, colIndex) => (
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
//                     <img src={classDistributionImage} alt="Class Distribution" style={{ maxWidth: '35%', position: 'absolute', bottom: '60px', right: '10px' }} />
//                 </div>
//             )}
//             <div style={{ margin: '20px 0' }}>
//                 <label>Select Target Column:</label>
//                 <select value={targetColumn} onChange={(e) => setTargetColumn(e.target.value)}>
//                     <option value="">Select Column</option>
//                     {dataToDisplay && dataToDisplay.columns.map((column) => (
//                         <option key={column} value={column}>{column}</option>
//                     ))}
//                 </select>
//             </div>
           
//             <Dialog
//                 open={open}
//                 TransitionComponent={Transition}
//                 keepMounted
//                 onClose={handleClose}
//                 aria-describedby="alert-dialog-slide-description"
//             >
//                 <DialogTitle>{"Null Values Detected"}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-slide-description">
//                         The selected technique cannot handle null values. Please preprocess your data to remove null values before applying this technique.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Close</Button>
//                 </DialogActions>
//             </Dialog>
//             <div className={`sidebar3 ${isSidebarOpen ? 'open' : ''}`}>
//                 <Tooltip title="preprocess technique" arrow>
// //                     <div className="toggle-button3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
// //                         {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
// //                     </div>
//                 </Tooltip>
//                 {isSidebarOpen && (
//                     <div className="sidebar-content3">
//                         <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
//                             <li style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={() => handleItemClick('under')}>
//                                 Under Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('over')}>
//                                 Over Sampling
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('smote')}>
//                                 SMOTE
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('borderline-smote')}>
//                                 Borderline SMOTE
//                             </li>
//                             <li style={{ marginBottom: '30px', cursor: 'pointer' }} onClick={() => handleItemClick('adasyn')}>
//                                 ADASYN
//                             </li>
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             {showNewDataInput && (
//                 <div>
//                     <h3>Input New Data</h3>
//                     {dataToDisplay.columns.map((column) => (
//                         <div key={column}>
//                             <label>{column}:</label>
//                             <input
//                                 type="text"
//                                 name={column}
//                                 value={newData[column] || ''}
//                                 onChange={handleNewDataChange}
//                             />
//                         </div>
//                     ))}
//                     <Button onClick={handlePredict}>Predict</Button>
//                     {predictions.length > 0 && (
//                         <div>
//                             <h3>Predictions</h3>
//                             {predictions.map((prediction, index) => (
//                                 <p key={index}>{prediction}</p>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             )}
//         </>
//     );
// }