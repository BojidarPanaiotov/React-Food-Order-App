import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartSte = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    return { items: updatedItems, totalAmount: newTotalAmount };
  }

  return defaultCartSte;
};

const CartProvider = (props) => {
  const [cartState, despatchCartAction] = useReducer(
    cartReducer,
    defaultCartSte
  );

  const addItemToCartHandler = (item) => {
    despatchCartAction({ type: "ADD", item });
  };

  const removeItemFromCartHandler = (id) => {
    despatchCartAction({ type: "REMOVE", id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
