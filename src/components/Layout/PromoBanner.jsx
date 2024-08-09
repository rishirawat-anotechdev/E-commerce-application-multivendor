import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
const PromoBanner = () => {
  return (
    <div className="relative bg-purple-100 py-2 px-6 flex items-center justify-center">
      <div className="flex items-center leading-tight tracking-wide whitespace-nowrap overflow-hidden text-ellipsis ">
        <span className="mr-2 font-semibold">SHOP AND</span>
        <span className=" mr-2 font-bold text-black">SAVE BIG</span>
        <span className=" mr-3 font-semibold">ON LATEST PRODUCTS</span>
        <div className="flex  bg-white p-2 items-center whitespace-nowrap overflow-hidden text-ellipsis mr-2 ">
        <span className="font-semibold  text-[9px] mr-1">STARTING FROM</span>
        <span className="bg-white text-black font-bold">$55</span>
      </div>
        <span className="my-2 text-purple-600 font-bold">UP TO 30% OFF</span>
        {/* <img className='w-10 h-10   ' src={promoImg} alt="promoImg" /> */}
      
      </div>
     
      <button className="absolute top-2 right-2 text-gray-400 font-bold"><CloseIcon /></button>
    </div>
  );
};

export default PromoBanner;
