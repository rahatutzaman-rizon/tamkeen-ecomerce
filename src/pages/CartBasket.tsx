import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Tags, 
  CreditCard 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Type definition for cart item
interface CartItem {
  id: number;
  name: string;
  total_price: string;
  number_of_uses: number;
  quantity: number;
  image?: string | null;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    // Load items from local storage on component mount
    const storedItems = localStorage.getItem('basket');
    if (storedItems) {
      const parsedItems: CartItem[] = JSON.parse(storedItems);
      setCartItems(parsedItems);
      calculateTotal(parsedItems);
    }
  }, []);

  const calculateTotal = (items: CartItem[]) => {
    const totalAmount = items.reduce((acc, item) => 
      acc + (parseFloat(item.total_price) * item.quantity), 0);
    setTotal(totalAmount);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedItems = cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    );
    
    // Trigger animation
    setIsAnimating(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setIsAnimating(prev => ({ ...prev, [id]: false }));
    }, 300);
    
    setCartItems(updatedItems);
    localStorage.setItem('basket', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const removeItem = (id: number) => {
    const filteredItems = cartItems.filter(item => item.id !== id);
    setCartItems(filteredItems);
    localStorage.setItem('basket', JSON.stringify(filteredItems));
    calculateTotal(filteredItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-sky-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ShoppingCart size={32} />
            <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          </div>
          <div className="bg-sky-700 rounded-full px-4 py-2 text-sm font-semibold">
            {cartItems.length} Items
          </div>
        </div>
        
        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="bg-sky-100 rounded-full p-6 inline-block mb-6">
              <ShoppingCart size={64} className="text-sky-500 opacity-70" />
            </div>
            <p className="text-2xl text-gray-600 font-semibold">
              Your cart is empty
            </p>
            <p className="text-gray-500 mt-2">
              Explore our products and add some items to get started!
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="divide-y divide-sky-100">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-6 flex items-center transition-all duration-300 
                    ${isAnimating[item.id] ? 'scale-105 bg-sky-50' : 'scale-100'}`}
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 mr-6 rounded-xl overflow-hidden shadow-lg">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-sky-100 flex items-center justify-center text-sky-500">
                        <Tags size={32} />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h2>
                    <p className="text-sky-600 font-semibold">
                      ${item.total_price} per item
                    </p>
                    <p className="text-gray-500 text-sm">
                      {item.number_of_uses} Uses Available
                    </p>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border-2 border-sky-200 rounded-full overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="px-4 text-gray-700 font-semibold">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full hover:bg-red-100 transition-all"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Checkout Section */}
            <div className="bg-sky-50 p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <CreditCard size={32} className="text-sky-600" />
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                </div>
                <span className="text-3xl font-bold text-sky-600">
                  ${total.toFixed(2)}
                </span>
              </div>
<Link to="/checkout">
              <button className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white 
                py-4 rounded-xl hover:from-sky-600 hover:to-sky-700 
                transition-all transform hover:-translate-y-1 shadow-xl 
                text-lg font-bold tracking-wide">
                Proceed to Checkout
              </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;