import React from 'react';
import dataMock from "../mockData/date.json";

export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [data, setData] = React.useState(dataMock);

  const store = {
    data: [data, setData],
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
};
