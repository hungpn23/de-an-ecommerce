import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import Title from './Title';

export default function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl ">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>
            {currency}
            {delivery_fee}
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Total</p>
          <p>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
          </p>
        </div>
      </div>
    </div>
  );
}
