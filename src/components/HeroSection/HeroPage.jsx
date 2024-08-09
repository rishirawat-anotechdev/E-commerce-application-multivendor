import React from 'react';
import '../../app.css';
import hero from '../../assets/hero.png' // Include custom styles for animation
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
const HeroPage = () => {
  return (
    <div className="relative  min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        <div className="text-center md:text-left md:w-1/2 z-0">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
            Take Organic Food and Stay Healthy
          </h1>
          <p className="text-gray-600 mb-6">
            A trusted brand for organic food
          </p>
          <button className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition">
            Shop Now
          </button>
        </div>
        <div className="relative md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src={hero} // Replace with actual path
            alt="Organic Basket"
            className="w-full max-w-md md:max-w-lg animate-bounce-slow"
          />
        </div>
      </div>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full cursor-pointer">
        <span>←</span>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full cursor-pointer">
        <span>→</span>
      </div>
      <div className="absolute bottom-4 left-4 bg-green-600 text-white p-2 rounded-full cursor-pointer">
        <span><WhatsAppIcon /></span>
      </div>
    </div>
  );
};

export default HeroPage;
