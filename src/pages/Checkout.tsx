import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

const Checkout = () => {
  return (
    <div className="flex flex-col mt-20 lg:flex-row justify-between p-6 space-y-6 lg:space-y-0 lg:space-x-8">
      <div className="lg:w-1/2 w-full border border-gray-200 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Company Name (Optional)"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Street Address"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Apartment, Suite, etc. (Optional)"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Town/City"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mt-4 flex items-center">
            <input type="checkbox" className="checkbox checkbox-primary mr-2" />
            <span>Save this information for next time</span>
          </div>
        </form>
      </div>

      {/* Right Section: Order Summary */}
      <div className="lg:w-1/2 w-full p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Your Order</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$100.00</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>$10.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$95.00</span>
          </div>

          {/* Payment Methods */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-primary mr-2"
                />
                <span className="flex justify-between w-full items-center">
                  Credit/Debit Card{" "}
                  <div className="flex">
                    <FaCcVisa size={30} className="text-blue-500 mr-2" />
                    <FaCcMastercard
                      size={30}
                      className="text-yellow-500 mr-2"
                    />
                  </div>
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-primary mr-2"
                />
                <span className="flex items-center">Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Coupon Input */}
          <div className="flex gap-3 mt-4">
            <input
              type="text"
              placeholder="Apply Coupon"
              className="input input-bordered w-full"
            />{" "}
            <button className="btn text-white btn-primary">Apply Coupon</button>
          </div>

          {/* Place Order Button */}
          <div className="mt-6">
            <button className="btn text-white btn-primary w-full">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
