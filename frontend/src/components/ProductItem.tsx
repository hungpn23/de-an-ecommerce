import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { Link } from 'react-router-dom';
import { IProductItemProps } from '../interfaces';

export default function ProductItem({ id, image, name, price }: IProductItemProps) {
  const { currency } = useContext<{ currency: string }>(ShopContext);
  return (
    <Link className="text-gray-700" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img className="hover:scale-110 transition ease-in-out" src={image[0]} alt="" />
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
}
