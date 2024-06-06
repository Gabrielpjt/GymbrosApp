import { createContext, useReducer } from 'react';

export const ReportContext = createContext({
  report: [],
  addReport: ({ title, price, stock, image, composition, description }) => {},
  setReports: (flowers) => {},
  deleteReport: (id) => {},
  updateReport: (id, { title, price, stock, image, composition, description }) => {},
});

function reportsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload;
      return inverted;
    case 'UPDATE':
      const updatableReportIndex = state.findIndex(
        (report) => report.id === action.payload.id
      );
      const updatableReport = state[updatableReportIndex];
      const updatedItem = { ...updatableReport, ...action.payload.data };
      const updatedReports = [...state];
      updatedReports[updatableReportIndex] = updatedItem;
      return updatedReports;
    case 'DELETE':
      return state.filter((report) => report.id !== action.payload);
    default:
      return state;
  }
}

function ReportsContextProvider({ children }) {
  const [usersState, dispatch] = useReducer(reportsReducer, []);

  function addReport(reportData) {
    dispatch({ type: 'ADD', payload: reportData });
  }

  function setReports(reports) {
    dispatch({ type: 'SET', payload: reports });
  }

  function deleteReport(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateReport(id, reportData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: reportData } });
  }

  const value = {
    reports: reportsState,
    setReports: setReports,
    addReport: addReport,
    deleteReport: deleteReport,
    updateReport: updateReport,
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
}

export default ReportsContextProvider;
