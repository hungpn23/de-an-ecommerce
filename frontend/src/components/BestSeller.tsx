import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

export default function BestSeller() {
  const { products } = useContext(ShopContext);
  const [BestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    const bestProducts = products.filter(p => p.bestseller);
    setBestSellers(bestProducts.slice(0, 5));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div>
      {/* Render Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {BestSellers.map((p, i) => (
          <ProductItem key={i} id={p._id} image={p.image} name={p.name} price={p.price} />
        ))}
      </div>
    </div>
  );
}
