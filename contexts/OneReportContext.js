import React, { createContext, useState } from 'react';

const OneReportsContext = createContext();

const OneReportsProvider = ({ children }) => {
  const [onereports, setOneReports] = useState([
    // { jenisLatihan: 'latihan lengan', latihan1: 0, latihan2: 0, latihan3: 0 }
  ]);

  return (
    <OneReportsContext.Provider value={{ onereports, setOneReports }}>
      {children}
    </OneReportsContext.Provider>
  );
};

export { OneReportsContext, OneReportsProvider };
