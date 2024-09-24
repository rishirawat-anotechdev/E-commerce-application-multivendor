import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutPage from './common/layout/LayoutPage';
import ProtectedRoute from './auth/ProtectedRoutes';
import { Box, CircularProgress } from '@mui/material';

import GuestRoute from './auth/GuestRoute';
import RedirectIfAuthenticated from './auth/GuestRoute';
import UserProfile from './components/Userprofile';



// Lazy load components for public, admin, and vendor sections
// Public Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const RegisterPage = lazy(() => import('./components/Auth/RegisterPage'));
const LoginPage = lazy(() => import('./components/Auth/LoginPage'));
const CartPage = lazy(() => import('./components/Cart/CartPage'));
const CheckoutForm = lazy(() => import('./components/Payment/CheckOutPage'));

// Admin Pages
const Layout = lazy(() => import('./admin/LayoutPage'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const ReportPage = lazy(() => import('./admin/ReportPage'));
const OrderPage = lazy(() => import('./admin/OrderPage'));
const ProductPage = lazy(() => import('./admin/ProductPage'));
const ShipmentPage = lazy(() => import('./admin/ShipmentPage'));
const ProductPrice = lazy(() => import('./admin/ProductPrice'));
const CategoryPage = lazy(() => import('./admin/Cateogories/CategoryPage'));
const BrandsPage = lazy(() => import('./admin/BrandsPage'));
const ReviewsPage = lazy(() => import('./admin/ReviewsPage'));
const CustomerPage = lazy(() => import('./admin/CustomerPage'));
const DiscountPage = lazy(() => import('./admin/DiscountPage'));
const VendorsPage = lazy(() => import('./admin/VendorsPage'));
const TransactionsPage = lazy(() => import('./admin/TransactionPage'));
const PaymentMethods = lazy(() => import('./admin/PaymentMethod'));
const SettingsPage = lazy(() => import('./admin/SettingsPage'));
const ProductInfo = lazy(() => import('./admin/ProductInfo'));
const CustomerProfile = lazy(() => import('./admin/CustomerProfile'));
const VendorProfile = lazy(() => import('./admin/VendorProfile'));
const AdminProfile = lazy(() => import('./admin/AdminProfile'));
const CategoriesTable = lazy(() => import('./admin/Cateogories/CategoriesTables'));

// Vendor Pages
const VendorLayout = lazy(() => import('./vendor/VendorLayout'));
const VendorDashboard = lazy(() => import('./vendor/VendorDashboard'));
const VendorProducts = lazy(() => import('./vendor/VendorProuducts'));
const VendorProductEdit = lazy(() => import('./vendor/VendorProductEdit'));
const VendorProductInfo = lazy(() => import('./vendor/VendorProductinfo'));
const VendorRevenue = lazy(() => import('./vendor/VendorRevenue'));
const VendorOrder = lazy(() => import('./vendor/VendorOrder'));
const VendorCategory = lazy(() => import('./vendor/VendorCateogories/VendorCategory'));
const VendorCategoriesTable = lazy(() => import('./vendor/VendorCateogories/VendorCategoriesTable'));
const VendorReviews = lazy(() => import('./vendor/VendorReviews'));
const VendorDiscount = lazy(() => import('./vendor/VendorDiscount'));
const VendorSetting = lazy(() => import('./vendor/VendorSetting'));
const VendorProfiles = lazy(() => import('./vendor/VendorProfiles'));

// Error Pages
const PageNotFound = lazy(() => import('./Errors/PageNotFound'));

// Loading fallback for lazy loading
export const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);




const App = () => {



  return (


    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LayoutPage><HomePage /></LayoutPage>} />
        <Route path="/homepage" element={<LayoutPage><HomePage /></LayoutPage>} />
        {/* Protected routes that require login */}
        <Route element={<ProtectedRoute allowedRoles={['User']} />}>
          <Route path="/cart" element={<LayoutPage><CartPage /></LayoutPage>} />
          <Route path="/checkout/:userId" element={<LayoutPage><CheckoutForm /></LayoutPage>} />
          <Route path="/userProfile" element={<LayoutPage><UserProfile /></LayoutPage>} />
         
          
        </Route>

        <Route
  path="/login"
  element={
    <RedirectIfAuthenticated>
      <LayoutPage><LoginPage /></LayoutPage>
    </RedirectIfAuthenticated>
  }
/>

<Route
  path="/register"
  element={
    <RedirectIfAuthenticated>
      <LayoutPage><RegisterPage /></LayoutPage>
    </RedirectIfAuthenticated>
  }
/>

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<Layout />} >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="shipments" element={<ShipmentPage />} />
            <Route path="product-prices" element={<ProductPrice />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="customers" element={<CustomerPage />} />
            <Route path="discounts" element={<DiscountPage />} />
            <Route path="vendors" element={<VendorsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="payments" element={<PaymentMethods />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="product-info/:id" element={<ProductInfo />} />
            <Route path="customer-profile/:id" element={<CustomerProfile />} />
            <Route path="vendor-profile" element={<VendorProfile />} />
            <Route path="admin-profile" element={<AdminProfile />} />
            <Route path="products/category/:categoryName" element={<CategoriesTable />} />
            <Route path="products/subcategory/:subcategoryName" element={<CategoriesTable />} />
          </Route>
        </Route>

        {/* Vendor protected routes */}
        <Route element={<ProtectedRoute allowedRoles={['Vendor']} />}>
          <Route path="/vendor" element={<VendorLayout />} >
            <Route index element={<VendorDashboard />} />
            <Route path="dashboard" element={<VendorDashboard />} />
            <Route path="products" element={<VendorProducts />} />
            <Route path="products-info/:id" element={<VendorProductEdit />} />
            <Route path="revenues" element={<VendorRevenue />} />
            <Route path="orders" element={<VendorOrder />} />
            <Route path="categories" element={<VendorCategory />} />
            <Route path="category/:categoryName" element={<VendorCategoriesTable />} />
            <Route path="subcategories/:subcategoryName" element={<VendorCategoriesTable />} />
            <Route path="reviews" element={<VendorReviews />} />
            <Route path="discounts" element={<VendorDiscount />} />
            <Route path="setting" element={<VendorSetting />} />
            <Route path="profile" element={<VendorProfiles />} />
          </Route>
        </Route>

        {/* Catch all - 404 */}
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>

  );
};

export default App;






