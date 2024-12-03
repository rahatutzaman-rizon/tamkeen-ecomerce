import { Link } from "react-router-dom";
import { viewCart, checkout } from "../services/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
}

interface Store {
  store_id: number;
  store_name: string;
  products: Product[];
}

interface CartResponse {
  stores: Store[];
}

interface Order {
  id: number;
  order_status: string;
  store_id: number;
  total_price: number;
  updated_at: string;
  user_id: number;
}

interface CheckoutProps {
  discount: number;
  message: string;
  orders: Order[];
  total_price_before_discount: number;
}

const ShoppingCart = () => {
  const { data: cart, isLoading, error } = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: () => viewCart(),
  });

  const [orderInfo, setOrderInfo] = useState<CheckoutProps>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [coupon, setCoupon] = useState("");

  const handleShowToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // const { mutate: checkoutMutate, isPending } = useMutation({
  //   mutationFn: async (storeId: number) => {
  //     const response = await checkout(storeId, coupon);
  //     return response;
  //   },
  //   onSuccess: (orders: CheckoutProps) => {
  //     setOrderInfo(orders);
  //   },
  //   onError: (error: any) => {
  //     const errorMessage = error?.response?.data?.message || "Checkout failed.";
  //     handleShowToast(errorMessage);
  //   },
  // });

  if (isLoading) return <p>Loading cart...</p>;
  if (error) return <p>Failed to load cart. Please try again later.</p>;

  return (
    <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="md:col-span-2 space-y-4">
          {cart?.stores?.length ? (
            cart.stores.map((store) => (
              <div key={store.store_id}>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{store.store_name}</h2>
                  {/* <button
                    className="btn btn-link"
                    onClick={() => checkoutMutate(store.store_id)}
                    disabled={isPending}
                  >
                    {isPending ? "Processing..." : "+ Add to checkout"}
                  </button> */}
                </div>
                <div className="divider" />
                <div className="flex flex-col gap-2">
                  {store.products.map((product) => (
                    <div
                      key={product.product_id}
                      className="card grid py-5 px-8 border border-gray-200 grid-cols-3 items-start gap-4"
                    >
                      <div className="col-span-2 flex items-start gap-4">
                        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                          <img
                            src="https://readymadeui.com/images/product14.webp"
                            className="w-full h-full object-contain"
                            alt={product.product_name}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-base font-bold text-gray-800">
                            {product.product_name || "Unknown Product"}
                          </h3>
                          <h3 className="text-base text-gray-800">
                            {product.product_price}$
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              There are no items in the cart
            </p>
          )}
        </div>

        <div className="border border-gray-200 rounded-md p-4 h-max">
          <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
            Order Summary
          </h3>
          <ul className="text-gray-800 mt-6 space-y-3">
            {orderInfo && (
              <>
                <li className="flex justify-between text-sm">
                  Subtotal{" "}
                  <span className="font-bold">
                    ${orderInfo.orders[0]?.total_price}
                  </span>
                </li>
                <li className="flex justify-between text-sm">
                  Order Status
                  <span className="font-bold">
                    {orderInfo.orders[0]?.order_status || "N/A"}
                  </span>
                </li>
              </>
            )}
          </ul>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Discount Code
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter discount code"
                className="input input-bordered w-full text-sm"
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                onClick={() => setCoupon(coupon)}
                className="btn text-white btn-primary text-sm"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              to="/checkout"
              className="btn text-white btn-primary w-full text-sm"
            >
              Checkout
            </Link>
            <button className="btn btn-outline btn-primary w-full text-sm">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-bottom toast-center min-w-[35vw] z-50">
          <div className="alert bg-primary text-wrap text-white">
            <div>
              <span>{toastMessage}</span>
            </div>
            <div className="cursor-pointer" onClick={() => setShowToast(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
