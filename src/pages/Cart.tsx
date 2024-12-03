import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface CartItem {
  product_id: number;
  quantity: number;
  size: string;
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const handleRemoveItem = (product_id: number) => {
    const updatedCart = cartItems.filter(item => item.product_id !== product_id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (product_id: number) => {
    const updatedCart = cartItems.map(item => 
      item.product_id === product_id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (product_id: number) => {
    const updatedCart = cartItems.map(item => 
      item.product_id === product_id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="font-sans bg-white min-h-screen py-4 mt-24">
      <h1 className="text-3xl font-bold text-sky-600 text-center mb-10">
        Shopping Cart
      </h1>

      <div className="max-w-5xl mx-auto mt-8 space-y-6">
        {cartItems.length ? (
          cartItems.map((item) => (
            <div
              key={item.product_id}
              className="flex justify-between items-center p-5 bg-sky-50 rounded-lg border border-sky-100 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-sky-100 p-2 rounded-md">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Product"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-sky-800">Product {item.product_id}</h3>
                  <p className="text-sky-600 text-sm">Size: {item.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-sky-300 rounded-md">
                  <button
                    className="px-3 py-1 text-sky-700 hover:bg-sky-100"
                    onClick={() => handleDecreaseQuantity(item.product_id)}
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="px-3 text-sky-800">{item.quantity}</span>
                  <button
                    className="px-3 py-1 text-sky-700 hover:bg-sky-100"
                    onClick={() => handleIncreaseQuantity(item.product_id)}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.product_id)}
                  className="text-sky-500 hover:text-sky-700"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-sky-600">Your cart is empty.</p>
        )}
      </div>

      <div className="mt-12 text-center">
        <button className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;