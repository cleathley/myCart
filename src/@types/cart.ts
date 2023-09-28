export interface CartProduct {
  id: string;
  name: string;
  price: number;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

export type CartState = {
  cartItems: CartItem[];
};

export type CartAction =
  | {type: 'ADD_TO_CART'; payload: CartProduct}
  | {type: 'REMOVE_FROM_CART'; payload: CartProduct}
  | {type: 'CLEAR_CART'};

export type CartContextType = {
  // from the reducer
  cartState: CartState;
  dispatch: React.Dispatch<CartAction>;
  // methods of the context provider
  addToCart(item: CartProduct): void;
  removeFromCart(item: CartProduct): void;
  clearCart(): void;
  isItemInCart(item: CartProduct): boolean;
  getCartCount(): number;
  getCartTotal(): number;
};

export type CartProviderProps = {
  children: React.ReactNode;
};
