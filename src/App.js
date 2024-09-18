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
import CategoryPage from './admin/Cateogories/CategoryPage';
import BrandsPage from './admin/BrandsPage';
import ReviewsPage from './admin/ReviewsPage';
import CustomerPage from './admin/CustomerPage';
import DiscountPage from './admin/DiscountPage';
import VendorsPage from './admin/VendorsPage';
import TransactionsPage from './admin/TransactionPage';
import PaymentMethods from './admin/PaymentMethod';
import SettingsPage from './admin/SettingsPage';
import ProductInfo from './admin/ProductInfo';
import CustomerProfile from './admin/CustomerProfile';
import VendorProfile from './admin/VendorProfile';
import AdminProfile from './admin/AdminProfile';
import CategoriesTable from './admin/Cateogories/CategoriesTables';

//Vendor side 
import VendorLayout from './vendor/VendorLayout';
import VendorDashboard from './vendor/VendorDashboard';
import VendorProducts from './vendor/VendorProuducts';

//progress bar 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PageNotFound from './Errors/PageNotFound';
import VendorProductEdit from './vendor/VendorProductEdit';
import VendorProductInfo from './vendor/VendorProductinfo';
import VendorRevenue from './vendor/VendorRevenue';
import VendorOrder from './vendor/VendorOrder';




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
      <Route path='discounts' element={<DiscountPage />} />
      <Route path='vendors' element={<VendorsPage />} />
      <Route path='transactions' element={<TransactionsPage />} />
      <Route path='payments' element={<PaymentMethods />} />
      <Route path='settings' element={<SettingsPage />} />
      <Route path='product-info/:id' element={<ProductInfo />} />
      <Route path='product-add' element={<ProductInfo />} />
      <Route path='customer-profile/:id' element={<CustomerProfile />} />
      <Route path='vendor-profile' element={<VendorProfile />} />
      <Route path='admin-profile' element={<AdminProfile />} />
      <Route path='products/category/:categoryName' element={<CategoriesTable />} />
      <Route path='products/subcategory/:subcategoryName' element={<CategoriesTable />} />
      </Route>

      {/* Vendor routes  */}

      <Route path='/vendor' element={<VendorLayout />}>
      <Route path='dashboard' element={<VendorDashboard />} />
      <Route path='products' element={<VendorProducts />} />
      <Route path='products-info/:id' element={<VendorProductEdit />} />
      <Route path='revenues' element={<VendorRevenue />} />
      <Route path='orders' element={<VendorOrder />} />
      </Route>

      <Route path='/error' element={<PageNotFound />} />


     
  
    </Routes>
  );
}

export default App;


// import React, { lazy, Suspense } from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import LayoutPage from './common/layout/LayoutPage';
// import Layout from './admin/LayoutPage';
// import { protect, authorizeRoles } from './auth/ProtectedRoutes'; // Add protect and authorizeRoles wrappers

// Lazy load admin pages
// const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
// const ReportPage = lazy(() => import('./admin/ReportPage'));
// const OrderPage = lazy(() => import('./admin/OrderPage'));
// const ProductPage = lazy(() => import('./admin/ProductPage'));
// const ShipmentPage = lazy(() => import('./admin/ShipmentPage'));
// const ProductPrice = lazy(() => import('./admin/ProductPrice'));
// const CategoryPage = lazy(() => import('./admin/Cateogories/CategoryPage'));
// const BrandsPage = lazy(() => import('./admin/BrandsPage'));
// const ReviewsPage = lazy(() => import('./admin/ReviewsPage'));
// const CustomerPage = lazy(() => import('./admin/CustomerPage'));
// const DiscountPage = lazy(() => import('./admin/DiscountPage'));
// const VendorsPage = lazy(() => import('./admin/VendorsPage'));
// const TransactionsPage = lazy(() => import('./admin/TransactionPage'));
// const PaymentMethods = lazy(() => import('./admin/PaymentMethod'));
// const SettingsPage = lazy(() => import('./admin/SettingsPage'));
// const ProductInfo = lazy(() => import('./admin/ProductInfo'));
// const CustomerProfile = lazy(() => import('./admin/CustomerProfile'));
// const VendorProfile = lazy(() => import('./admin/VendorProfile'));
// const AdminProfile = lazy(() => import('./admin/AdminProfile'));
// const CategoriesTable = lazy(() => import('./admin/Cateogories/CategoriesTables'));

// // Lazy load public pages
// const HomePage = lazy(() => import('../pages/HomePage'));
// const RegisterPage = lazy(() => import('../components/Auth/RegisterPage'));
// const LoginPage = lazy(() => import('../components/Auth/LoginPage'));
// const CartPage = lazy(() => import('../components/Cart/CartPage'));
// const CheckoutForm = lazy(() => import('../components/Payment/CheckOutPage'));

// export const routeDefinitions = [
//   { path: "/", element: <HomePage /> },
//   { path: "/homepage", element: <HomePage /> },
//   { path: "/register", element: <RegisterPage /> },
//   { path: "/login", element: <LoginPage /> },
//   { path: "/cart", element: <CartPage /> },
//   { path: "/checkout", element: <CheckoutForm /> },
// ];

// // Loading fallback
// const LoadingFallback = () =>  <Box sx={{ display: 'flex' }}>
      // <CircularProgress />
      // </Box>

// const App = () => {
//   return (
//     <Suspense fallback={<LoadingFallback />}>
//       <Routes>
//         {routeDefinitions.map(({ path, element }, index) => (
//           <Route
//             key={index}
//             path={path}
//             element={<LayoutPage>{element}</LayoutPage>}
//           />
//         ))}

//         {/* Admin protected routes */}
//         <Route
//           path="/admin"
//           element={protect(<Layout />, 'Admin')} // Protect the main admin layout
//         >
//           <Route path="dashboard" element={authorizeRoles('Admin')(<AdminDashboard />)} />
//           <Route path="report" element={authorizeRoles('Admin')(<ReportPage />)} />
//           <Route path="orders" element={authorizeRoles('Admin')(<OrderPage />)} />
//           <Route path="products" element={authorizeRoles('Admin')(<ProductPage />)} />
//           <Route path="shipments" element={authorizeRoles('Admin')(<ShipmentPage />)} />
//           <Route path="product-prices" element={authorizeRoles('Admin')(<ProductPrice />)} />
//           <Route path="categories" element={authorizeRoles('Admin')(<CategoryPage />)} />
//           <Route path="brands" element={authorizeRoles('Admin')(<BrandsPage />)} />
//           <Route path="reviews" element={authorizeRoles('Admin')(<ReviewsPage />)} />
//           <Route path="customers" element={authorizeRoles('Admin')(<CustomerPage />)} />
//           <Route path="discounts" element={authorizeRoles('Admin')(<DiscountPage />)} />
//           <Route path="vendors" element={authorizeRoles('Admin')(<VendorsPage />)} />
//           <Route path="transactions" element={authorizeRoles('Admin')(<TransactionsPage />)} />
//           <Route path="payments" element={authorizeRoles('Admin')(<PaymentMethods />)} />
//           <Route path="settings" element={authorizeRoles('Admin')(<SettingsPage />)} />
//           <Route path="product-info/:id" element={authorizeRoles('Admin')(<ProductInfo />)} />
//           <Route path="customer-profile/:id" element={authorizeRoles('Admin')(<CustomerProfile />)} />
//           <Route path="vendor-profile" element={authorizeRoles('Admin')(<VendorProfile />)} />
//           <Route path="admin-profile" element={authorizeRoles('Admin')(<AdminProfile />)} />
//           <Route path="products/category/:categoryName" element={authorizeRoles('Admin')(<CategoriesTable />)} />
//           <Route path="products/subcategory/:subcategoryName" element={authorizeRoles('Admin')(<CategoriesTable />)} />
//         </Route>

//         {/* Catch all - 404 */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Suspense>
//   );
// };

// export default App;

