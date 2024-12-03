import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline, IoMenu, IoClose, IoFilter, IoCloseCircle } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { authAtom } from "../atoms/authAtom";
import logo from "../assets/TamkeenLogo.svg";
import Cookies from "js-cookie";

// Define the Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  rating: string;
  image?: string;
  categoryId?: number;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authState, setAuthState] = useAtom(authAtom);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const nav = [
    { label: "Home", route: "/" },
    { label: "Category", route: "/category" },
    { label: "Categories", route: "/categories" },
    { label: "Contact", route: "/contact" },
    { label: "Stores", route: "/stores" },
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setAuthState({ user: null, isAuthenticated: false });
  };

  // Load products from local storage or fetch from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const storedProducts = localStorage.getItem('products');
        
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        } else {
          const response = await fetch("https://api.tamkeen.center/api/product-all");
          const data = await response.json();
          
          localStorage.setItem('products', JSON.stringify(data));
          
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Clear search input and dropdown
  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredProducts([]);
    setShowDropdown(false);
  };

  // Filter products based on search term
  const filterProducts = () => {
    if (searchTerm === "") {
      setFilteredProducts([]);
      setShowDropdown(false);
      return;
    }

    const filtered = products.filter((product) => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedFiltered = filtered.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
      const bNameMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    });

    setFilteredProducts(sortedFiltered);
    setShowDropdown(sortedFiltered.length > 0);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Only show dropdown after 2 characters
    if (value.length >= 2) {
      filterProducts();
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  };

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    // Navigate to product detail page
    navigate(`/product/${product.id}`);
    setSearchTerm("");
    setFilteredProducts([]);
    setShowDropdown(false);
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search results page
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setShowDropdown(false);
      setFilteredProducts([]);
    }
  };

  // Handle filter button click
  const handleFilterClick = () => {
    navigate('/filter');
  };

  return (
    <section className="fixed w-full z-50 bg-white flex justify-center">
      <div className="items-center container flex gap-4 md:px-20 p-6 w-full justify-between relative">
        {/* Logo */}
        <Link className="w-20" to="/">
          <img src={logo} alt="Tamkeen Logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="gap-8 hidden md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.route}
              className="text-gray-500 hover:text-primary hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </ul>

        {/* Search Bar */}
        <div className="relative min-w-10 md:min-w-96 max-w-[70vw] self-center hidden md:block">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full px-4 py-2 pr-10 border rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={filterProducts}
              />
              {/* Clear Search Button */}
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <IoCloseCircle size={20} />
                </button>
              )}
              {loading && (
                <div className="absolute right-4 top-2 text-gray-500">Loading...</div>
              )}
            </div>
            <button 
              type="button" 
              onClick={handleFilterClick}
              className="bg-gray-100 p-2 border rounded-r-md hover:bg-gray-200"
            >
              <IoFilter />
            </button>
          </form>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleProductSelect(product)}
                >
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 mr-4 object-cover rounded"
                    />
                  )}
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.description}
                        </div>
                      </div>
                      <div className="text-sm text-indigo-500 font-semibold">
                        ${product.price}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Stock: {product.stock} | Rating: {product.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rest of the Navbar remains the same */}
        <div className="flex items-center gap-4">
          {authState.isAuthenticated ? (
            <div className="flex gap-2">
              <Link to="/cart" className="btn">
                <IoCartOutline size={20} />
              </Link>
              <Link to="/account" className="btn hidden sm:flex">
                <MdOutlineAccountCircle size={28} />
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-danger"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/signup"
                className="btn btn-primary text-white hidden md:flex"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-outline btn-primary hidden md:flex"
              >
                Login
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>

        {/* Mobile Search - Similar implementation can be added here */}
      </div>
    </section>
  );
};

export default Navbar;