"use client";

import { useState, useEffect } from "react";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}


  

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch cart items from localStorage or state
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // Add your checkout logic here
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-600">
                    Price: ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <p className="text-lg font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t pt-4">
            <p className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
