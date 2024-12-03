import "./App.css";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { AboutUs } from "./pages/AboutUs";
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
import { useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "./atoms/authAtom";
import Category from "./pages/Category";
import StoreDetailsComponent from "./pages/StoreDetails";
import CategoryBrowser from "./pages/CategoryDetails";
import ProductSearch from "./components/Input";
import FlashSalePage from "./pages/FlashSeller";
import BestSellProduct from "./pages/BestSeller";
import ProductDetailPage from "./pages/SearchProduct";


function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const [authState] = useAtom(authAtom);

  // Check if the user is authenticated
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the element
  return element;
};


function App() {
  return (
    <Router>
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
          <Route path="/input" element={<ProductSearch></ProductSearch>} />
          <Route path="/flashSale" element={<FlashSalePage></FlashSalePage>} />
          <Route path="/bestselling" element={<BestSellProduct></BestSellProduct>} />
          <Route path="/product/:id" element={<ProductDetailPage></ProductDetailPage>} />



          <Route path="/store/:id" element={<StoreDetailsComponent />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/category" element={<Category />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="wishlist" element={<MyWishlist />} /> 
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} /> {/* Protected route */}
          <Route path="/invoice" element={<ProtectedRoute element={<Invoice />} />} /> {/* Protected route */}
          <Route path="/vendor-signup" element={<VendorSignUpPage />} />
          <Route path="/categories/:slug/review" element={<ProtectedRoute element={<Reviews />} />} /> {/* Protected route */}
          <Route path="/account" element={<ProtectedRoute element={<Account />} />}>
            <Route path="" element={<MyProfile />} />
            <Route path="address-book" element={<ProtectedRoute element={<AddressBook />} />} /> {/* Protected route */}
            <Route path="payment-options" element={<ProtectedRoute element={<MyPaymentOptions />} />} /> {/* Protected route */}
            <Route path="orders" element={<ProtectedRoute element={<MyOrders />} />} /> {/* Protected route */}
            <Route path="myorder" element={<ProtectedRoute element={<MyOrder />} />} /> {/* Protected route */}
            {/* <Route path="wishlist" element={<ProtectedRoute element={<MyWishlist />} />} /> Protected route */}
            <Route path="discount" element={<ProtectedRoute element={<MyDiscount />} />} /> {/* Protected route */}
            <Route path="refer-a-friend" element={<ProtectedRoute element={<ReferAFriend />} />} /> {/* Protected route */}
            <Route path="/account/order/:id" element={<ProtectedRoute element={<MyOrder />} />} /> {/* Protected route */}
          </Route>

        </Routes>


        <Footer />
      </div>
    </Router>
  );
}

export default App;
