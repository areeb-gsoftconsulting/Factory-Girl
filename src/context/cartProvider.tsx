import { createContext, useReducer } from "react";
import CartContext from "./cartContext";

const defaultCartState = {
  items: [],
};

const cartReducer = (state: any, action: any) => {
  if (action.type == "ADD") {
    const updatedItems = action.item.items;

    console.log("items==>", updatedItems);
    return {
      items: updatedItems,
    };
  }

  return defaultCartState;
};

const CartProvider = (props: any) => {
  const [cartState, dispatchCartActions] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item: any) => {
    dispatchCartActions({ type: "ADD", item: item });
  };

  const cartContext = {
    items: cartState.items,
    addItem: addItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
