import React, { useState } from 'react';
import cart5 from "../../assets/cart5.png"
import cart6 from "../../assets/cart6.png"

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <div className="bg-green-50 py-12 mt-10 relative overflow-hidden">
      {/* Left side vegetables */}
      <img 
        src={cart5}
        alt="Tomatoes" 
        className="absolute left-0 bottom-0 w-1/4 max-w-xs"
      />
      
      {/* Right side vegetables */}
      <img 
        src={cart6} 
        alt="Lettuce and vegetables" 
        className="absolute right-0 bottom-0 w-1/4 max-w-xs"
      />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Subscribe our newsletter</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to the mailing list to receive updates on special offers, new arrivals and our promotions.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-4 w-full max-w-md rounded-l-full border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-r-full hover:bg-green-600 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSubscription;