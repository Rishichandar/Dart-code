// import React, { createContext, useState } from 'react';

// export const CsvContext = createContext();

// export const CsvProvider = ({ children }) => {
//     const [csvData, setCsvData] = useState(null);

//     return (
//         <CsvContext.Provider value={{ csvData, setCsvData }}>
//             {children}
//         </CsvContext.Provider>
//     );
// };

import React, { createContext, useState } from 'react';

export const CsvContext = createContext();

export const CsvProvider = ({ children }) => {
    const [csvData, setCsvData] = useState(null);
    const [processData, setProcessData] = useState(null);

    return (
        <CsvContext.Provider value={{ csvData, setCsvData, processData, setProcessData }}>
            {children}
        </CsvContext.Provider>
    );
}
