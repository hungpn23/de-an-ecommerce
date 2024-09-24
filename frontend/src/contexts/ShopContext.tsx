import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { products } from '../assets/frontend_assets';
import { ICart, IShopContext } from '../interfaces';
import { toast } from 'react-toastify';

export const ShopContext = createContext<IShopContext | undefined>(undefined);

const ShopContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currency = '$';
  const delivery_fee = 10;
  const [Search, setSearch] = useState('');
  const [ShowSearch, setShowSearch] = useState(false);
  const [CartItems, setCartItems] = useState<ICart>({});

  const addToCart = async (itemId: string, size: string) => {
    if (!size) {
      toast.error('Please select product size');
      return;
    }

    let cartData = structuredClone(CartItems);

    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in CartItems) {
      for (const size in CartItems[itemId]) {
        try {
          if (CartItems[itemId][size] > 0) {
            totalCount += CartItems[itemId][size];
          }
        } catch (err) {}
      }
    }

    return totalCount;
  };

  const updateCartItemQuantity = async (itemId: string, size: string, quantity: number) => {
    let cartData = structuredClone(CartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in CartItems) {
      let product = products.find(p => p._id === itemId);
      for (const size in CartItems[itemId]) {
        if (CartItems[itemId][size] > 0) {
          totalAmount += product.price * CartItems[itemId][size];
        }
      }
    }

    return totalAmount;
  };

  const value: IShopContext = {
    products,
    currency,
    delivery_fee,
    Search,
    setSearch,
    ShowSearch,
    setShowSearch,
    CartItems,
    addToCart,
    getCartCount,
    updateCartItemQuantity,
    getCartAmount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
