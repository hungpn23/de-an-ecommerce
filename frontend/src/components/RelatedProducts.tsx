import { useContext, useEffect, useState } from 'react';
import { IProduct, IRelatedProductsProps } from '../interfaces';
import { ShopContext } from '../contexts/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

export default function RelatedProducts({ category, subCategory }: IRelatedProductsProps) {
  const { products } = useContext(ShopContext);
  const [RelatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter(p => p.category === category || p.subCategory === subCategory);

      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCT'} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {RelatedProducts.map((p, i) => (
          <ProductItem key={i} id={p._id} image={p.image} name={p.name} price={p.price} />
        ))}
      </div>
    </div>
  );
}
