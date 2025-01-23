import { createContext, useState } from "react";
import { products } from "../data/Data";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [input, setInput] = useState("");

  const data = products[0].items.filter((product) =>
    product.Name.toLowerCase().includes(input.toLowerCase()));

  const value = {
    input,
    setInput,
    data,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
