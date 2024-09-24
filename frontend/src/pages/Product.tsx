import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import { assets } from '../assets/frontend_assets';
import { IProduct } from '../interfaces';
import { RelatedProducts } from '../components';

export default function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [ProductData, setProductData] = useState<IProduct>(null);
  const [Image, setImage] = useState('');
  const [Size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map(p => {
      if (p._id === productId) {
        setProductData(p);
        setImage(p.image[0]);
        return;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return ProductData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {ProductData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                key={index}
                src={item}
                alt=""
              />
            ))}
          </div>

          <div className="w-full sm:w-4/5 cursor-pointer">
            <img className="w-full h-auto" src={Image} alt="" />
          </div>
        </div>

        {/* ----- Product Info ----- */}
        <div className="flex-1">
          <h1 className="font-medium mt-2 text-2xl">{ProductData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />

            <p className="mx-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {ProductData.price}
          </p>

          <p className="mt-5 text-gray-500">{ProductData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>

            <div className="flex gap-2">
              {ProductData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === Size ? 'bg-orange-200' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(ProductData._id, Size)}
            className="bg-black text-white active:bg-gray-700 px-8 py-3"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="flex flex-col gap-1 text-sm text-gray-500 mt-5">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}
      <div className="mt-20">
        <div className="flex">
          <p className="px-5 py-3 border text-sm">Description</p>
          <p className="px-5 py-3 border text-sm">Review (122)</p>
        </div>

        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts category={ProductData.category} subCategory={ProductData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}
