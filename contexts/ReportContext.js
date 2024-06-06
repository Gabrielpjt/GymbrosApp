import React, { createContext, useState } from 'react';

const ReportsContext = createContext();

const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([
    // { jenisLatihan: 'latihan lengan', latihan1: 0, latihan2: 0, latihan3: 0 }
  ]);

  return (
    <ReportsContext.Provider value={{ reports, setReports }}>
      {children}
    </ReportsContext.Provider>
  );
};

export { ReportsContext, ReportsProvider };
