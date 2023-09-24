// CartContext.tsx
import React, {createContext, useContext, useReducer, ReactNode} from 'react';
import log from '../support/logger';
import {
  CartAction,
  CartContextType,
  CartProviderProps,
  CartState,
} from '../@types/cart';

// Create the CartContext
//
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a custom hook for using the CartContext in our components
//
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Create the cartReducer to handle the dispatch methods from the app
//
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    // add the item (in action payload) to the cart. If it alreadt exists increase the quantity
    case 'ADD_TO_CART':
      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity++;
        return {...state, cartItems: updatedCartItems};
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, {...action.payload, quantity: 1}],
        };
      }

    // remove the item (in action payload) from the cart (this removed it completly and
    // dosn't reduce the quantity)
    case 'REMOVE_FROM_CART':
      const updatedCartItems = state.cartItems.filter(
        item => item.id !== action.payload.id,
      );
      return {...state, cartItems: updatedCartItems};

    // reset the cart
    case 'CLEAR_CART':
      log.info('CLEAR_CART');
      return {...state, cartItems: []};

    default:
      return state;
  }
};

// Create the Provider so we can wrap the dom and allow any element to access the card
//
const CartProvider = ({children}: CartProviderProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, {cartItems: []});

  return (
    <CartContext.Provider value={{cartState, dispatch}}>
      {children}
    </CartContext.Provider>
  );
};

export {useCart, CartProvider};
