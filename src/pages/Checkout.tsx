import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FaCcVisa, FaCcMastercard, FaCreditCard } from "react-icons/fa";
import { CreditCard, DollarSign, Gift, Truck } from 'lucide-react';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    // Simulate order processing
    toast.loading('Processing your order...', { duration: 2000 });
    
    setTimeout(() => {
      toast.success('Order placed successfully!', {
        duration: 4000,
        style: {
          background: '#16a34a',
          color: 'white',
        },
        icon: '✅'
      });
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6 mt-12">
      <Toaster position="top-right" />
      <div className="container mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Billing Details */}
          <div className="lg:w-1/2 w-full p-8 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <CreditCard className="mr-3 text-blue-600" />
              Billing Details
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Street Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/2 w-full p-8 bg-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <DollarSign className="mr-3 text-green-600" />
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>$100.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span>-$10.00</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>$95.00</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    name="payment" 
                    className="form-radio text-blue-600"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <span className="flex items-center space-x-2">
                    <FaCcVisa className="text-blue-600 text-2xl" />
                    <FaCcMastercard className="text-red-600 text-2xl" />
                    <span>Credit Card</span>
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    name="payment" 
                    className="form-radio text-blue-600"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <span className="flex items-center space-x-2">
                    <Truck className="text-gray-600" />
                    <span>Cash on Delivery</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Coupon */}
            <div className="flex space-x-2 mb-6">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
                onClick={() => {
                  if (couponCode) {
                    toast.success('Coupon applied successfully!');
                  } else {
                    toast.error('Please enter a coupon code');
                  }
                }}
              >
                <Gift className="mr-2" /> Apply
              </button>
            </div>

            {/* Place Order Button */}
            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
            >
              <FaCreditCard className="mr-2" /> Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;