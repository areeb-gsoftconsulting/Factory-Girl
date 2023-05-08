import React, { createContext } from "react";

interface ContextType {
  items: any[];
  addItem: React.Dispatch<React.SetStateAction<any>>;
}

const CartContext = createContext<ContextType>({
  items: [],
  addItem: (item: any) => {},
});

export default CartContext;
