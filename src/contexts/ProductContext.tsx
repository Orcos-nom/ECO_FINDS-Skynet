import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: "excellent" | "good" | "fair" | "poor" | string;
  price: number;
  image_url: string;
  image: string; // ✅ required for ProductCard
  user_id?: string;
  created_at: string;
}

interface ProductContextProps {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  fetchProducts: async () => {},
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error.message);
      return;
    }

    if (data) {
      // Map image_url to image for ProductCard
      const mappedData = data.map((p) => ({ ...p, image: p.image_url }));
      setProducts(mappedData as Product[]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
