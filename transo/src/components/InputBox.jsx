import { useContext,useState } from "react";
import { ScannedDataContext } from "../helperhooks/ScannedDataContext";

export const InputBox = () => {
  const { handleManualInput } = useContext(ScannedDataContext);
  const [amount, setAmount] = useState("");

  const handleInput = (e) => {
    setAmount(e.target.value);
  };

  const handleChangeValue = () => {
    handleManualInput({
      inrAmount: Number(amount),
    });
    setAmount("");
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        placeholder="Enter Amount"
        onChange={handleInput}
      />
      <button onClick={handleChangeValue}>Add</button>
    </div>
  );
};
