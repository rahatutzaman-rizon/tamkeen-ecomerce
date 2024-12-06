import React, { useState, useEffect } from 'react';
import { Trash2, ShoppingCart as CartIcon, Tag, Home, ArrowRight, Box, Database } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CartBasket from './CartBasket';

// Coupon interface
interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minPurchase?: number;
}

// Product interface
interface Product {
  id: number;
  store_id: number;
  name: string;
  description: string;
  price: string;
}

// Basket Item interface
interface BasketItem {
  id: number;
  name: string;
  total_price: string;
  number_of_uses: number;
  profit_percentage_in_level_1: number | null;
  profit_percentage_in_level_2: number | null;
  profit_percentage_in_level_3: number | null;
  created_at: string;
  updated_at: string;
  store_id: number;
  image: string | null;
  images: any[];
  quantity: number;
}

// Order interface
interface OrderItem {
  id: number;
  order_status: string;
  total_price: number;
  discountApplied: number;
  created_at: string;
}

// Predefined coupons
const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'SAVE10', discount: 10, type: 'percentage', minPurchase: 50 },
  { code: 'WELCOME20', discount: 20, type: 'percentage', minPurchase: 100 },
  { code: 'FLAT5', discount: 5, type: 'fixed' }
];

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // New state for basket items
  const [basketItems, setBasketItems] = useState<BasketItem[]>(() => {
    const savedBasketItems = localStorage.getItem('basketItems');
    return savedBasketItems ? JSON.parse(savedBasketItems) : [];
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  const [orderInfo, setOrderInfo] = useState<OrderItem | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Update localStorage whenever cart and basket items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(basketItems));
  }, [basketItems]);

  // Remove item from cart
  const removeFromCart = (itemToRemove: Product) => {
    const updatedCart = cart.filter(item => item.id !== itemToRemove.id);
    setCart(updatedCart);
    showToastMessage(`${itemToRemove.name} removed from cart`, 'success');
  };

  // Remove basket item
  const removeBasketItem = (itemToRemove: BasketItem) => {
    const updatedBasketItems = basketItems.filter(item => item.id !== itemToRemove.id);
    setBasketItems(updatedBasketItems);
    showToastMessage(`${itemToRemove.name} removed from basket`, 'success');
  };

  // Show toast notification
  const showToastMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Apply coupon logic
  const applyCoupon = () => {
    // Reset previous coupon state
    setCouponError('');
    setAppliedCoupon(null);

    // Find matching coupon
    const matchedCoupon = AVAILABLE_COUPONS.find(
      coupon => coupon.code.toUpperCase() === couponCode.toUpperCase()
    );

    if (!matchedCoupon) {
      setCouponError('Invalid coupon code');
      showToastMessage('Invalid coupon code', 'error');
      return;
    }

    // Check minimum purchase requirement
    const cartTotal = cart.reduce((total, item) => total + parseFloat(item.price), 0);
    if (matchedCoupon.minPurchase && cartTotal < matchedCoupon.minPurchase) {
      setCouponError(`Minimum purchase of $${matchedCoupon.minPurchase} required`);
      showToastMessage(`Minimum purchase of $${matchedCoupon.minPurchase} required`, 'error');
      return;
    }

    // Apply coupon
    setAppliedCoupon(matchedCoupon);
    showToastMessage('Coupon applied successfully!', 'success');
  };

  // Calculate total with potential discount
  const calculateTotal = () => {
    const cartTotal = cart.reduce((total, item) => total + parseFloat(item.price), 0);
    
    if (!appliedCoupon) return cartTotal;

    if (appliedCoupon.type === 'percentage') {
      return cartTotal * (1 - appliedCoupon.discount / 100);
    }
    
    return Math.max(0, cartTotal - appliedCoupon.discount);
  };

  // Checkout process
  const checkout = () => {
    if (cart.length === 0) {
      showToastMessage("Cart is empty", 'error');
      return;
    }

    try {
      const totalPrice = calculateTotal();
      const discountApplied = appliedCoupon 
        ? (appliedCoupon.type === 'percentage' 
            ? cart.reduce((total, item) => total + parseFloat(item.price), 0) * (appliedCoupon.discount / 100)
            : appliedCoupon.discount)
        : 0;

      const newOrder: OrderItem = {
        id: Date.now(),
        order_status: "Processed",
        total_price: totalPrice,
        discountApplied: discountApplied,
        created_at: new Date().toISOString()
      };

      setOrderInfo(newOrder);
      setCart([]); 
      localStorage.removeItem('cartItems');
      setAppliedCoupon(null);

      showToastMessage("Checkout successful!");
    } catch (error) {
      showToastMessage("Checkout failed", 'error');
    }
  };

  // Navigate to home page
  const continueShopping = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Main Cart Section */}
        <div className="grid md:grid-cols-3 gap-8 p-6">
          {/* Cart Items Section */}
          <div className="md:col-span-2 space-y-4">
            {/* Shopping Cart */}
            <div className="bg-primary text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
              <div className="flex items-center">
                <CartIcon className="mr-3" size={24} />
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
              </div>
              <div className="text-sm">
                {cart.length} Item{cart.length !== 1 ? 's' : ''}
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <CartIcon size={48} className="mx-auto mb-4 text-gray-300" />
                Your cart is empty
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                    <div className="flex items-center mt-2">
                      <span className="font-semibold text-primary">${item.price}</span>
                      <span className="ml-2 text-xs text-gray-400">Store ID: {item.store_id}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item)}
                    className="ml-4 text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Order Summary Section */}
          <div className="border rounded-lg p-6 bg-gray-50">
            <h3 className="text-xl font-bold border-b pb-3 mb-4 flex items-center">
              <Tag className="mr-2 text-primary" size={20} />
              Order Summary
            </h3>
            
            {/* Coupon Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Coupon
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="input input-bordered w-full"
                />
                <button 
                  onClick={applyCoupon}
                  className="btn btn-primary"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-xs mt-1">{couponError}</p>
              )}
              {appliedCoupon && (
                <div className="mt-2 text-green-600 text-sm">
                  Coupon applied: {appliedCoupon.code} 
                  {appliedCoupon.type === 'percentage' 
                    ? ` (${appliedCoupon.discount}% off)` 
                    : ` ($${appliedCoupon.discount} off)`}
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">
                  ${cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-bold">
                    -${(cart.reduce((total, item) => total + parseFloat(item.price), 0) * (appliedCoupon.discount / 100)).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
             <Link to="/checkout">
             <button 
                onClick={checkout}
                disabled={cart.length === 0}
                className="btn btn-primary w-full"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2" size={20} />
              </button> 
             
             </Link>
              <button 
                onClick={continueShopping}
                className="btn btn-outline btn-primary w-full"
              >
                <Home className="mr-2" size={20} />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Basket Items Section */}
        <div className="bg-gray-100 p-6">
          <div className="bg-primary text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center">
              <Box className="mr-3" size={24} />
              <h1 className="text-2xl font-bold">Basket Items</h1>
            </div>
            <div className="text-sm">
              {basketItems.length} Item{basketItems.length !== 1 ? 's' : ''}
            </div>
          </div>

          {basketItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Database size={48} className="mx-auto mb-4 text-gray-300" />
            <CartBasket></CartBasket>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {basketItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <button 
                      onClick={() => removeBasketItem(item)}
                      className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Price: ${item.total_price}</p>
                    <p>Store ID: {item.store_id}</p>
                    <p>Created: {new Date(item.created_at).toLocaleDateString()}</p>
                    <p>Number of Uses: {item.number_of_uses}</p>
                    {item.profit_percentage_in_level_1 !== null && (
                      <div className="mt-2 text-xs text-gray-500">
                        <span>Level 1 Profit: {item.profit_percentage_in_level_1}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showToast && (
        <div className={`toast toast-bottom toast-center z-50`}>
          <div className={`alert ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;