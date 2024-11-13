import React, { createContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

export const ScannedDataContext = createContext();

export const ScannedDataProvider = ({ children }) => {
  const [scannedData, setScannedData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const saveDatatoFireStore = async (data) => {
    try {
      await addDoc(collection(db, "scannedData"), data);
      getDataFromFirestore();
    } catch (error) {
      console.error("Error adding document", error);
    }
  };

  const getDataFromFirestore = async (data) => {
    try {
      const querySnapshot = await getDocs(collection(db, "scannedData"), data);
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setScannedData(dataList);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await deleteDoc(doc(db, "scannedData", id));
      setScannedData((prevData) => prevData.filter((item) => item.id !== id));
      setSelectedImage(null);
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };
  const handleImageDataExtracted = (data) => {
    const imageExtracted = {
      inrAmount: data.inrAmount,
      date: new Date().toLocaleString(),
      manualEntry: false,
    };
    saveDatatoFireStore(imageExtracted);
    setScannedData((prevData) => [...prevData, imageExtracted]);
  };

  const handleManualInput = (data) => {
    const manualInput = {
      inrAmount: data.inrAmount,
      date: new Date().toLocaleString(),
      manualEntry: true,
    };

    setScannedData((prevData) => [...prevData, manualInput]);
    saveDatatoFireStore(manualInput);
  };

  const handleImageUpload = (file) => {
    setSelectedImage(file);
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);
  return (
    <ScannedDataContext.Provider
      value={{
        scannedData,
        handleImageDataExtracted,
        handleDeleteData,
        selectedImage,
        setSelectedImage,
        handleImageUpload,
        handleManualInput,
      }}
    >
      {children}
    </ScannedDataContext.Provider>
  );
};
