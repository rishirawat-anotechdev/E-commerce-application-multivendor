import React from 'react';

const FooterPage = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 My E-commerce Site. All rights reserved.</p>
        <p>
          Follow us on 
          <a href="https://twitter.com" className="ml-2">Twitter</a>,
          <a href="https://facebook.com" className="ml-2">Facebook</a>, and 
          <a href="https://instagram.com" className="ml-2">Instagram</a>.
        </p>
      </div>
    </footer>
  );
}

export default FooterPage;
