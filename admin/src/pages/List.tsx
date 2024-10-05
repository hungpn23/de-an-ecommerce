import React, { useEffect, useState } from 'react';
import sendRequest from '../helpers/axios';

export default function List() {
  const [List, setList] = useState<any[]>([]);

  const fetchList = async () => {
    sendRequest('GET', '/product')
      .then(res => {
        setList(res.data);
        console.log(List);
      })
      .catch(e => console.log(e));
  };

  const deleteProduct = async (productId: number) => {
    sendRequest('DELETE', `/product/${productId}`)
      .then(async res => {
        console.log(res);
        await fetchList();
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-200 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Categories</b>
          <b>Price</b>
          <b className="text-center">Actions</b>
        </div>

        {List.map((product, index) => {
          return (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              key={index}
            >
              <img className="w-12" src={product.images[0].path} alt="" />
              <p>{product.name}</p>
              <p>{product.categories[0].name}</p>
              <p>{product.price}</p>
              <p
                onClick={() => {
                  deleteProduct(product.id);
                }}
                className="text-right md:text-center text-lg cursor-pointer"
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
