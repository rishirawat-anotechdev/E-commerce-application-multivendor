import LoginPage from "../components/Auth/LoginPage";
import RegisterPage from "../components/Auth/RegisterPage";
import CartPage from "../components/Cart/CartPage";
import CheckoutForm from "../components/Payment/CheckOutPage";
import HomePage from "../pages/HomePage";

export const routeDefinitions = [
  { path: "/homepage", element: <HomePage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/checkout", element: <CheckoutForm /> },
];