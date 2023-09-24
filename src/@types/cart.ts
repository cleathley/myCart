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
  cartState: CartState;
  dispatch: React.Dispatch<CartAction>;
};

export type CartProviderProps = {
  children: React.ReactNode;
};
