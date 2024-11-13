import React, { useContext } from "react";
import { ScannedDataContext } from "../helperhooks/ScannedDataContext";

const ResultTable = () => {
  const { scannedData, handleDeleteData } = useContext(ScannedDataContext);
  const totalInr = scannedData.reduce((acc, item) => acc + item.inrAmount, 0);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Amount (INR)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scannedData.map((item, index) => (
            <tr key={item.id || index}>
              <td>₹{item.inrAmount.toFixed(2)}</td>
              <td>{item.date}</td>
              <td>
                <button onClick={() => handleDeleteData(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total INR: ₹{totalInr.toFixed(2)}</h2>
    </div>
  );
};

export default ResultTable;
