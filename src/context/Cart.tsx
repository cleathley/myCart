// CartContext.tsx
import React, {createContext, useContext, useReducer} from 'react';
import {
  CartAction,
  CartContextType,
  CartProduct,
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
      return {...state, cartItems: []};

    default:
      return state;
  }
};

// Create the Provider so we can wrap the dom and allow any element to access the
// cart and provide some helper funtions
//
const CartProvider = ({children}: CartProviderProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, {cartItems: []});

  const addToCart = (item: CartProduct): void => {
    dispatch({type: 'ADD_TO_CART', payload: item});
  };

  const clearCart = (): void => {
    dispatch({type: 'CLEAR_CART'});
  };

  const getCartCount = (): number => {
    return cartState.cartItems.length;
  };

  const getCartTotal = (): number => {
    return cartState.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const isItemInCart = (item: CartProduct): boolean => {
    const isItemInCart = cartState.cartItems.find(
      cartItem => cartItem.id === item.id,
    );
    return isItemInCart ? true : false;
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        dispatch,
        addToCart,
        clearCart,
        isItemInCart,
        getCartCount,
        getCartTotal,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export {CartProvider, useCart};
