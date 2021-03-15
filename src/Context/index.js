import React from "react";
import dataMock from "../mockData/date.json";

export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [data, setData] = React.useState(dataMock);
  const [dataEditor, setDataEditor] = React.useState({
    hashtag: "",
    listLyThuyet: [
      {
        noiDung: "",
        viDu: "",
        listCauHoi: [
          {
            cauHoi: "",
            dapAn: [],
            dapAnDung: "A",
            giaiThich: "",
          },
        ],
      },
    ],
  });

  const store = {
    data: [data, setData],
    dataEditor: [dataEditor, setDataEditor]
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
