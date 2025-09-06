import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  image_url: string;
}

export const ProductDisplay: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        alert("❌ Error fetching products. Check console.");
      } else if (data) {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (products.length === 0) return <p className="text-center mt-10">No products found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {products.map((p) => (
        <Card key={p.id}>
          <img
            src={p.image_url}
            alt={p.title}
            className="w-full h-48 object-cover rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
          <CardContent>
            <CardTitle>{p.title}</CardTitle>
            <p>Category: {p.category}</p>
            <p>Condition: {p.condition}</p>
            <p>Price: ₹{p.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
