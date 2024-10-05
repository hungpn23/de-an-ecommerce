import { useEffect, useState } from 'react';
import { assets } from '../assets/admin_assets';
import sendRequest from '../helpers/axios';

export default function Add() {
  const [Image1, setImage1] = useState<File>();
  const [Image2, setImage2] = useState<File>();
  const [Image3, setImage3] = useState<File>();
  const [Image4, setImage4] = useState<File>();

  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Category, setCategory] = useState('Men');
  const [Subcategory, setSubcategory] = useState('Top');
  const [IsBestSeller, setIsBestSeller] = useState(false);
  const [Sizes, setSizes] = useState<string[]>([]);

  const [Response, setResponse] = useState<string>();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: Name,
      description: Description,
      price: Price,
      quantity: Quantity,
      categories: [Category, Subcategory],
      is_best_seller: IsBestSeller,
      sizes: Sizes,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    if (Image1) formData.append('images', Image1);
    if (Image2) formData.append('images', Image2);
    if (Image3) formData.append('images', Image3);
    if (Image4) formData.append('images', Image4);

    // for (let [key, value] of formData.entries()) {
    //   if (value instanceof File) {
    //     console.log(`Hình ảnh đã upload: ${key}, ${value.name}`);
    //   } else {
    //     console.log(key, value);
    //   }
    // }

    sendRequest('POST', '/product/create', formData, 'multipart/form-data')
      .then(res => {
        console.log(res.statusText);
        setResponse(res.statusText);
        setImage1(undefined);
        setImage2(undefined);
        setImage3(undefined);
        setImage4(undefined);
        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setSizes([]);
      })
      .catch(e => console.log(e.response));
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Images</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={Image1 ? URL.createObjectURL(Image1) : assets.upload_area} alt="" />
            <input
              onChange={e => setImage1(e.target.files ? e.target.files[0] : undefined)}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img className="w-20" src={Image2 ? URL.createObjectURL(Image2) : assets.upload_area} alt="" />
            <input
              onChange={e => setImage2(e.target.files ? e.target.files[0] : undefined)}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img className="w-20" src={Image3 ? URL.createObjectURL(Image3) : assets.upload_area} alt="" />
            <input
              onChange={e => setImage3(e.target.files ? e.target.files[0] : undefined)}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img className="w-20" src={Image4 ? URL.createObjectURL(Image4) : assets.upload_area} alt="" />
            <input
              onChange={e => setImage4(e.target.files ? e.target.files[0] : undefined)}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={e => setName(e.target.value)}
          value={Name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={e => setDescription(e.target.value)}
          value={Description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Enter product description"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Subcategory</p>
          <select onChange={e => setSubcategory(e.target.value)} className="w-full px-3 py-2">
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
            <option value="Winter">Winter</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={e => setPrice(e.target.value)}
            value={Price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="100"
            required
          />
        </div>

        <div>
          <p className="mb-2">Product Quantity</p>
          <input
            onChange={e => setQuantity(e.target.value)}
            value={Quantity}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="100"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes(Sizes => (Sizes.includes('XS') ? Sizes.filter(item => item !== 'XS') : [...Sizes, 'XS']))
            }
          >
            <p className={`${Sizes.includes('XS') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XS</p>
          </div>

          <div
            onClick={() =>
              setSizes(Sizes => (Sizes.includes('S') ? Sizes.filter(item => item !== 'S') : [...Sizes, 'S']))
            }
          >
            <p className={`${Sizes.includes('S') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div
            onClick={() =>
              setSizes(Sizes => (Sizes.includes('M') ? Sizes.filter(item => item !== 'M') : [...Sizes, 'M']))
            }
          >
            <p className={`${Sizes.includes('M') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div
            onClick={() =>
              setSizes(Sizes => (Sizes.includes('L') ? Sizes.filter(item => item !== 'L') : [...Sizes, 'L']))
            }
          >
            <p className={`${Sizes.includes('L') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div
            onClick={() =>
              setSizes(Sizes => (Sizes.includes('XL') ? Sizes.filter(item => item !== 'XL') : [...Sizes, 'XL']))
            }
          >
            <p className={`${Sizes.includes('XL') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input onClick={() => setIsBestSeller(prev => !prev)} checked={IsBestSeller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
          ADD
        </button>

        <p className="text-green-600">{Response}</p>
      </div>
    </form>
  );
}
