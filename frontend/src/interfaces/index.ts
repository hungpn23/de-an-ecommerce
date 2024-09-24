export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

export interface IShopContext {
  products: IProduct[];
  currency: string;
  delivery_fee: number;
  Search: string;
  ShowSearch: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  CartItems: ICart;
  addToCart: (itemId: string, size: string) => Promise<void>;
  getCartCount: () => number;
  updateCartItemQuantity: (itemId: string, size: string, quantity: number) => Promise<void>;
  getCartAmount: () => number;
}

export interface IProductItemProps {
  id: string;
  image: string[];
  name: string;
  price: number;
}

export interface ITitleProps {
  text1: string;
  text2: string;
}

export interface IRelatedProductsProps {
  category: string;
  subCategory: string;
}

export interface ICart {
  [itemId: string]: {
    [size: string]: number;
  };
}

export interface ICartItem {
  itemId: string;
  size: string;
  quantity: number;
}
