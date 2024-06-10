import Tooltip from '@mui/material/Tooltip';
import React, { useContext, useEffect, useState } from 'react';
import { CsvContext } from '../csvcontext/csvcontext';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Textpreproccessing(){
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

    const renderDetails = (item) => {
        switch (item) {
            case 'Data Augmentation':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" >
                            <ArrowRightIcon /> Mean
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> Mode
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> Median
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" >
                            <ArrowRightIcon /> Constant
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" >
                            <ArrowRightIcon /> Linear Regression
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> Random Forest
                        </li>
                    </ul>
                );
            case 'Data Reshaping':
                return (
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> Standardize
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" >
                            <ArrowRightIcon /> Normalize
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text" >
                            <ArrowRightIcon /> Box-Cox
                        </li>
                        <li style={{ marginBottom: '7px' }} className="icon-with-text">
                            <ArrowRightIcon /> Yeo-Johnson
                        </li>
                       
                    </ul>
                );
            case 'Outlier Analysis':
                return (
                    
                    <ul style={{ listStyleType: 'none', padding: '10px', textAlign: 'left' }}>
                    <li style={{ marginBottom: '7px' }} className="icon-with-text">
                        <ArrowRightIcon /> Z-Score
                    </li>
                    <li style={{ marginBottom: '7px' }} className="icon-with-text" >
                        <ArrowRightIcon /> IQR
                    </li>
                </ul>
                );
            default:
                return null;
        }
    };
    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Tooltip title="preprocess technique" arrow>
          <div className="toggle-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
          </div>
          </Tooltip>
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
    )
}