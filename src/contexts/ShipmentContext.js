"use client";
import { createContext, useState, useEffect, useContext } from "react";

const ShipmentContext = createContext();

export const useShipment = () => {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error("useShipment must be used within a ShipmentProvider");
  }
  return context;
};

export const ShipmentProvider = ({ children }) => {
  const [selected, setSelected] = useState(() => {
    if (typeof window !== "undefined") {
      const savedSelected = localStorage.getItem("selected");
      return savedSelected ? JSON.parse(savedSelected) : [];
    } else {
      return [];
    }
  });

  // const [selected, setSelected] = useState("");
  console.log(selected);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selected", JSON.stringify(selected));
    }
  }, [selected]);

  const addToShipment = (puppy) => {
    setSelected((prev) => [...prev, puppy]);
  };

  const removeFromShipment = (puppyId) => {
    setSelected((prev) => prev.filter((item) => item.id !== puppyId));
  };

  const clearShipment = () => {
    setSelected([]);
  };

  return (
    <ShipmentContext.Provider
      value={{
        selected,
        setSelected,
        addToShipment,
        removeFromShipment,
        clearShipment,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};

export default ShipmentContext;
