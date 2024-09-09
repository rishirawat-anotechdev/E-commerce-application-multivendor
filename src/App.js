import React from 'react';
import {  Route, Routes,  } from 'react-router-dom';
import LayoutPage from './common/layout/LayoutPage';
import { routeDefinitions } from './routes/RouteDefinations';
import Layout from './admin/LayoutPage';
import AdminDashboard from './admin/AdminDashboard';
import ReportPage from './admin/ReportPage';
import OrderPage from './admin/OrderPage';

import ProductPage from './admin/ProductPage';
import ShipmentPage from './admin/ShipmentPage';
import ProductPrice from './admin/ProductPrice';
import CategoryPage from './admin/CategoryPage';
import BrandsPage from './admin/BrandsPage';
import ReviewsPage from './admin/ReviewsPage';
import CustomerPage from './admin/CustomerPage';



const App = () => {
  return (
    <Routes>
      {
        routeDefinitions.map(({path, element}, index) => (
          <Route key={index}  path={path} element={<LayoutPage>{element}</LayoutPage>} />
        ))
      }
      <Route path='/admin' element={<Layout />} >
      <Route path='dashboard' element={< AdminDashboard />} />
      <Route path='report' element={< ReportPage />} />
      <Route path='orders' element={< OrderPage />} />
      <Route path='products' element={< ProductPage />} />
      <Route path='shipments' element={< ShipmentPage />} />
      <Route path='product-prices' element={< ProductPrice />} />
      <Route path='categories' element={< CategoryPage />} />
      <Route path='brands' element={<BrandsPage />} />
      <Route path='reviews' element={<ReviewsPage />} />
      <Route path='customers' element={<CustomerPage />} />
      </Route>
     
  
    </Routes>
  );
}

export default App;
