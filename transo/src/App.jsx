import { useContext, useState } from "react";
import "./App.css";
import ResultTable from "./components/ResultTable";
import UploadImage from "./components/UploadImage";
import { ScannedDataContext } from "./helperhooks/ScannedDataContext";
import { InputBox } from "./components/InputBox";

function App() {
  const { scannedData } = useContext(ScannedDataContext);
  const [enableInput, setEnableInput] = useState(false);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Receipt Upload</h1>
      <UploadImage />
      <br></br>
      {!enableInput && (
        <button onClick={() => setEnableInput(true)}>Enter Amount</button>
      )}
      {enableInput && <InputBox />}
      {scannedData.length > 0 && <ResultTable />}
    </div>
  );
}

export default App;
