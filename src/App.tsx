import "./App.css";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import StoreGrid from "./pages/Stores";
import StorePage from "./pages/StorePage";
import ContactUs from "./pages/ContactUs";
import Categories from "./pages/Categories";
import ProductPage from "./pages/ProductPage";
import ShoppingCart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import Reviews from "./pages/ShareOpinion";
import SignUpPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import VendorSignUpPage from "./pages/VendorSignup";
import ReferAFriend from "./pages/account/components/ReferAFriend";
import MyDiscount from "./pages/account/components/MyDiscount";
import MyWishlist from "./pages/account/components/MyWishlist";
import MyOrders from "./pages/account/components/MyOrders";
import MyPaymentOptions from "./pages/account/components/MyPaymentOptions";
import AddressBook from "./pages/account/components/AddressBook";
import MyProfile from "./pages/account/components/MyProfile";
import Account from "./pages/account/Account";
import MyOrder from "./pages/account/components/Order";
import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "./atoms/authAtom";
import Category from "./pages/Category";
import StoreDetailsComponent from "./pages/StoreDetails";
import CategoryBrowser from "./pages/CategoryDetails";
import ProductSearch from "./components/Input";
import FlashSalePage from "./pages/FlashSeller";
import BestSellProduct from "./pages/BestSeller";
import ProductDetailPage from "./pages/SearchProduct";
import BestProductDetails from "./pages/BestSellerDetails";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const InitialAuthCheck = () => {
  const [authState] = useAtom(authAtom);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/login');
    }
  }, [authState.isAuthenticated, navigate]);

  return null;
};

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const [authState] = useAtom(authAtom);

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

function App() {
  return (
    <Router>
      <InitialAuthCheck />
      <ScrollToTop />
      <div className="flex flex-col gap-10">
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/stores" element={<StoreGrid />} />
          <Route path="/stores/:slug" element={<StorePage />} />
 
          <Route path="/categories/:id" element={<CategoryBrowser />} />
          <Route path="/input" element={<ProductSearch />} />
          <Route path="/flashSale" element={<FlashSalePage />} />
          <Route path="/bestselling" element={<BestSellProduct />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/bestSale/:id" element={<BestProductDetails />} />
       
          <Route path="/store/:id" element={<StoreDetailsComponent />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/category" element={<Category />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="wishlist" element={<MyWishlist />} /> 
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
          <Route path="/invoice" element={<ProtectedRoute element={<Invoice />} />} />
          <Route path="/vendor-signup" element={<VendorSignUpPage />} />
          <Route path="/categories/:slug/review" element={<ProtectedRoute element={<Reviews />} />} />
          <Route path="/account" element={<ProtectedRoute element={<Account />} />}>
            <Route path="" element={<MyProfile />} />
            <Route path="address-book" element={<ProtectedRoute element={<AddressBook />} />} />
            <Route path="payment-options" element={<ProtectedRoute element={<MyPaymentOptions />} />} />
            <Route path="orders" element={<ProtectedRoute element={<MyOrders />} />} />
            <Route path="myorder" element={<ProtectedRoute element={<MyOrder />} />} />
            <Route path="discount" element={<ProtectedRoute element={<MyDiscount />} />} />
            <Route path="refer-a-friend" element={<ProtectedRoute element={<ReferAFriend />} />} />
            <Route path="/account/order/:id" element={<ProtectedRoute element={<MyOrder />} />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;