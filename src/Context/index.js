import React from "react";
import dataMock from "../mockData/data.json";

export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [data, setData] = React.useState(dataMock);
  const [dataEditor, setDataEditor] = React.useState({
    hashtag: "",
    listLyThuyet: [
      {
        noiDung: {
          text: "",
          listText: [],
          image: []
        },
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

  console.log('dataEditor: ', dataEditor);
  

  const store = {
    data: [data, setData],
    editorState: [dataEditor, setDataEditor]
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
