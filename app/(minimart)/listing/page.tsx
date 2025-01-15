"use client";
import ItemWrapper from "@/components/global/itemWrapper";
import { searchByRelevance } from "@/data/product";
import { tsQueryPreprocess } from "@/lib/utils";
import { useState } from "react";

interface listingPageProps {
  searchParams?: { [key: string]: string | undefined };
}

interface Product {
  productId: number;
  name: string;
  basePrice: number;
  imageUrl: string;
}

const dummyProducts: Product[] = [
  {
    productId: 1,
    name: "Apple",
    basePrice: 0.3,
    imageUrl: "../../images/apple.jpeg",  },
  {
    productId: 2,
    name: "Banana",
    basePrice: 0.3,
    imageUrl: "../../images/banana.jpg",
  },
  {
    productId: 3,
    name: "Book 1",
    basePrice: 9.99,
    imageUrl: "../../images/book.jpg",
  },
  {
    productId: 4,
    name: "Book 2",
    basePrice: 9.99,
    imageUrl: "../../images/book2.jpg",
  },
  {
    productId: 5,
    name: "Book 3",
    basePrice: 9.99,
    imageUrl: "../../images/book3.jpg",
  },
  {
    productId: 6,
    name: "Chips",
    basePrice: 1.95,
    imageUrl: "../../images/chips.jpg",
  },
  {
    productId: 7,
    name: "Comb",
    basePrice: 0.7,
    imageUrl: "../../images/comb.jpg",
  },
  {
    productId: 8,
    name: "Sandwich",
    basePrice: 2.5,
    imageUrl: "../../images/sandwich.jpeg",
  },
  {
    productId: 9,
    name: "Toothbrush",
    basePrice: 1.2,
    imageUrl: "../../images/toothbrush.jpeg",
  },
  {
    productId: 10,
    name: "Umbrella",
    basePrice: 7.99,
    imageUrl: "../../images/umbrella.jpg",
  },
  {
    productId: 11,
    name: "Water",
    basePrice: 0.9,
    imageUrl: "../../images/water.jpeg",
  },
];

const ListingPage = () => {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const addToCart = (product: Product, quantity: number) => {

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  
    const existingItem = storedCart.find(
      (item: { productId: number }) => item.productId === product.productId
    );
  
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      storedCart.push({
        productId: product.productId,
        name: product.name,
        price: product.basePrice,
        quantity,
      });
    }
  
    localStorage.setItem("cart", JSON.stringify(storedCart));
  
    setCart(storedCart);
  
    setModalMessage(`${product.name} added to cart!`);
    setModalOpen(true);
  };
  

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {dummyProducts.map((product) => (
          <div
            key={product.productId}
            className="border p-4 rounded-md shadow hover:shadow-lg transition"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-xl font-bold">USD {product.basePrice}</p>
            <div className="flex items-center mt-4">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-16 p-2 border rounded-md mr-4"
                id={`quantity-${product.productId}`}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() =>
                  addToCart(
                    product,
                    parseInt(
                      (
                        document.getElementById(
                          `quantity-${product.productId}`
                        ) as HTMLInputElement
                      ).value
                    )
                  )
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">{modalMessage}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingPage;