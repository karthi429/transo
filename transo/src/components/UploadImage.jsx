import React, { useContext } from "react";
import { useEffect } from "react";
import { createWorker } from "tesseract.js";
import { ScannedDataContext } from "../helperhooks/ScannedDataContext";

const UploadImage = () => {
  const {
    handleImageDataExtracted,
    handleImageUpload,
    selectedImage,
  } = useContext(ScannedDataContext);

  async function convertImageToText() {
    const worker = await createWorker("eng");
    const { data } = await worker.recognize(selectedImage);
    const inrRegex = /\d{1,3}(,\d{3})*(\.\d{2})?\s*INR/;
    const inrAmount =
      inrRegex
        .exec(data.text)?.[0]
        ?.replace(/,/g, "")
        .replace("INR", "")
        .trim() || "0.00";
        handleImageDataExtracted({
      inrAmount: parseFloat(inrAmount),
    });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (selectedImage != null) {
      convertImageToText();
    } else {
      document.getElementById("file-input").value = "";
    }
  }, [selectedImage]);

  return (
    <div>
      <input
        type="file"
        onChange={handleImageChange}
        id="file-input"
        accept="image/*"
      />
      {/* {selectedImage && (
        <img src={selectedImage} alt="Selected" style={{ width: "100px" }} />
      )} */}
    </div>
  );
};

export default UploadImage;
