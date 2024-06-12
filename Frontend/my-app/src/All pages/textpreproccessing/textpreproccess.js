import Tooltip from '@mui/material/Tooltip';
import React, { useContext, useEffect, useState } from 'react';
import { CsvContext } from '../csvcontext/csvcontext';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Textpreproccessing(){
    const { csvData } = useContext(CsvContext);
    const [persistedData, setPersistedData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [processedData, setProcessedData] = useState(null);
    const [selectedTechnique, setSelectedTechnique] = useState(null);
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
        },800);

        // Clear the timer on component unmount
        return () => clearTimeout(timer);
    }, []);
    const handleItemClick = (item) => {
        setActiveItem(activeItem === item ? null : item);
    };

    const dataToDisplay = processedData || csvData || persistedData;

    const uploadPage=()=>{
        navigate('/upload');

    };

    return (
        <>
          <Button variant="outlined" style={{float:'right',marginRight:'50px',marginTop:'15px',}} onClick={uploadPage}>< ArrowBackIcon  fontSize="smaller" style={{position:'relative',right:'3px'}} />Back</Button>
        <span id='Text-preproccess'>Textpreproccessing</span>
         {selectedTechnique && (
            <span id='mode-select1'>{selectedTechnique}</span>
         )}
        <div className="data-container2"></div>
        {dataToDisplay && (
            <div className="table-container2">
                <table className="csv-table2">
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
        <div className={`sidebar1 ${isSidebarOpen ? 'open' : ''}`}>
        <Tooltip title="preprocess technique" arrow>
          <div className="toggle-button1" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
          </div>
          </Tooltip>
          {isSidebarOpen && (
              <div className="sidebar-content1">
                  <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', top: '100px' }}>
                      <li
                          style={{ marginBottom: '20px', cursor: 'pointer' }}
                          onClick={() => handleItemClick('Tokenization')}
                      >
                          Tokenization
                         
                      </li>
                      <li
                          style={{ marginBottom: '30px', cursor: 'pointer' }}
                          onClick={() => handleItemClick('Lowercase')}
                      >
                          Lowercase
                          
                      </li>
                      <li
                          style={{ marginBottom: '30px', cursor: 'pointer' }}
                          onClick={() => handleItemClick('Remove punctuation')}
                      >
                         Remove punctuation
                          
                      </li>
                      <li
                          style={{ marginBottom: '30px', cursor: 'pointer' }}
                          onClick={() => handleItemClick('Expand contraction')}
                      >
                          Expand contraction
                          
                      </li>
                      <li
                          style={{ marginBottom: '30px', cursor: 'pointer' }}
                          onClick={() => handleItemClick('Remove noise text')}
                      >
                          Remove noise text
                          
                      </li>
                      <li
                          style={{ marginBottom: '30px', cursor: 'pointer' }}
                          onClick={() => handleItemClick('Remove special character')}
                      >
                          Remove special character
                          
                      </li>
                      <li
                          style={{ marginBottom: '30px', cursor: 'pointer' }}
                          onClick={() => handleItemClick('Padding')}
                      >
                          Padding
                          
                      </li>
                      <li
                          style={{ marginBottom: '30px', cursor: 'pointer' }}
                          onClick={() => handleItemClick('Truncation')}
                      >
                          Truncation
                          
                      </li>
                      <li
                          style={{ marginBottom: '30px', cursor: 'pointer' }}
                          onClick={() => handleItemClick('Nlp normalization')}
                      >
                          Nlp normalization
                          
                      </li>
                      <li
                          style={{ marginBottom: '30px', cursor: 'pointer' }}
                          onClick={() => handleItemClick('Part of speech')}
                      >
                          Part of speech
                          
                      </li>
                  </ul>
              </div>
          )}
      </div>
    </>
    );
}