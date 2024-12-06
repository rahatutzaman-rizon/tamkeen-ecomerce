import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const BasketDisplay = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.tamkeen.center/api/packages');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const existingProduct = basket.find(p => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      basket.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('basket', JSON.stringify(basket));
    
    toast.success(`${product.name} Added to Cart!`, {
      style: {
        background: '#4299e1', // sky-600
        color: 'white',
      },
      icon: '🛒',
    });
  };

  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Toaster position="top-right" />
      <div className="container mx-auto p-4 grid md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-sky-100"
          >
            <div className="bg-sky-100 p-4 flex justify-center">
              {product.images && product.images.length > 0 && (
                <img 
                  src={`https://api.tamkeen.center/${product.images[0].image}`} 
                  alt={product.name} 
                  className="h-48 w-auto object-contain"
                />
              )}
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold text-sky-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">Price: ${product.total_price}</p>
              <p className="text-sm text-gray-500 mb-4">Uses: {product.number_of_uses}</p>

              <div className="flex space-x-2">
                <button
                  className="
                    w-full bg-sky-600 text-white py-3 rounded-lg 
                    flex items-center justify-center space-x-3
                    hover:bg-sky-700 transition duration-300
                    transform active:scale-95
                  "
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="font-semibold">Add to Cart</span>
                </button>
<Link to ={ `categories/17`}>
                <button
                  className="
                    flex items-center justify-center bg-gray-500 text-white p-3 rounded-lg
                    hover:bg-gray-600 transition duration-300
                    transform active:scale-95
                  "
                  onClick={() => viewProductDetails(product.id)}
                >
                  <Eye className="w-6 h-6" />
                </button></Link>

                
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BasketDisplay;