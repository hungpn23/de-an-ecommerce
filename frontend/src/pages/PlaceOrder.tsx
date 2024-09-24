import React, { useState } from 'react';
import { Title } from '../components';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets';
import { useNavigate } from 'react-router-dom';

export default function PlaceOrder() {
  const [Method, setMethod] = useState('cod');

  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* --- Left Side --- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFOMATION'} />
        </div>

        <div className="flex gap-3">
          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name" />
          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name" />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Phone" />
      </div>

      {/* --- Right Side --- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                onClick={() => setMethod('stripe')}
                className={`min-w-3.5 h-3.5 border rounded-full ${Method === 'stripe' ? 'bg-green-500' : ''}`}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>

            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                onClick={() => setMethod('razorpay')}
                className={`min-w-3.5 h-3.5 border rounded-full ${Method === 'razorpay' ? 'bg-green-500' : ''}`}
              ></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
            </div>

            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                onClick={() => setMethod('cod')}
                className={`min-w-3.5 h-3.5 border rounded-full ${Method === 'cod' ? 'bg-green-500' : ''}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button onClick={() => navigate('/order')} className="bg-black text-white text-sm px-16 py-3">
            ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
