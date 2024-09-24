import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { ICart, ICartItem } from '../interfaces';
import { Title } from '../components';
import { assets } from '../assets/frontend_assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { products, currency, CartItems, updateCartItemQuantity } = useContext(ShopContext);

  const [Cart, setCart] = useState<ICartItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const cartData = [];
    for (const itemId in CartItems) {
      for (const size in CartItems[itemId]) {
        if (CartItems[itemId][size] > 0) {
          const cartItem: ICartItem = {
            itemId,
            size,
            quantity: CartItems[itemId][size],
          };
          cartData.push(cartItem);
        }
      }
    }

    setCart(cartData);
  }, [CartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {Cart.map(({ itemId, size, quantity }, index) => {
          const product = products.find(p => p._id === itemId);

          return (
            <div
              key={index}
              className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={product.image[0]} alt="" />

                <div>
                  <p className="text-xs sm:text-lg font-medium">{product.name}</p>

                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {product.price}
                    </p>

                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{size}</p>
                  </div>
                </div>
              </div>

              <input
                onChange={e =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateCartItemQuantity(itemId, size, +e.target.value)
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={quantity}
              />

              <img
                onClick={() => updateCartItemQuantity(itemId, size, 0)}
                src={assets.bin_icon}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                alt=""
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
