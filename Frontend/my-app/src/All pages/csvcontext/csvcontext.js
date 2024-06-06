import React, { createContext, useState } from 'react';

export const CsvContext = createContext();

export const CsvProvider = ({ children }) => {
    const [csvData, setCsvData] = useState(null);

    return (
        <CsvContext.Provider value={{ csvData, setCsvData }}>
            {children}
        </CsvContext.Provider>
    );
};