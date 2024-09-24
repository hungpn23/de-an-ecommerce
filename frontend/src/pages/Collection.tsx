import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { assets } from '../assets/frontend_assets';
import { ProductItem, Title } from '../components';
import { IProduct } from '../interfaces';

export default function Collection() {
  const { products, Search, ShowSearch } = useContext(ShopContext);
  const [ShowFilter, setShowFilter] = useState(false);
  const [FilterProducts, setFilterProducts] = useState<IProduct[]>([]);
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [SortType, setSortType] = useState('relavent');

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Category.includes(e.target.value)) {
      setCategory(Category => Category.filter(item => item !== e.target.value));
    } else {
      setCategory(Category => [...Category, e.target.value]);
    }
  };

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (SubCategory.includes(e.target.value)) {
      setSubCategory(SubCategory => SubCategory.filter(item => item !== e.target.value));
    } else {
      setSubCategory(SubCategory => [...SubCategory, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (Search && ShowSearch) {
      productsCopy = productsCopy.filter(p => p.name.toLowerCase().includes(Search.toLowerCase()));
    }

    if (Category.length > 0) {
      productsCopy = productsCopy.filter(p => Category.includes(p.category));
    }

    if (SubCategory.length > 0) {
      productsCopy = productsCopy.filter(p => SubCategory.includes(p.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [Category, SubCategory, Search, ShowSearch]);

  const sortProducts = () => {
    let FilterProductsCopy = FilterProducts.slice();

    switch (SortType) {
      case 'low-high':
        setFilterProducts(FilterProductsCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(FilterProductsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [SortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!ShowFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${ShowFilter ? 'rotate-90' : ''}`} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ShowFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Men'} onChange={toggleCategory} />
              Men
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCategory} />
              Women
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Kids'} onChange={toggleCategory} />
              Kids
            </p>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${ShowFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Top'} onChange={toggleSubCategory} />
              Top
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Bottom'} onChange={toggleSubCategory} />
              Bottom
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Winter'} onChange={toggleSubCategory} />
              Winter
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product sort */}
          <select
            onChange={e => {
              setSortType(e.target.value);
            }}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: None</option>
            <option value="low-high">Price: Low-High</option>
            <option value="high-low">Price: High-Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {FilterProducts.map((p, i) => (
            <ProductItem key={i} id={p._id} image={p.image} name={p.name} price={p.price} />
          ))}
        </div>
      </div>
    </div>
  );
}
