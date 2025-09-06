import React, { useEffect, useState } from "react";
import { useProducts, Product } from "@/contexts/ProductContext";
import { ProductCard } from "@/components/ui/product-card";
import { useAuth } from "@/contexts/AuthContext"; // assuming you have AuthContext

const MyListings: React.FC = () => {
  const { products } = useProducts();
  const { user } = useAuth(); // current logged-in user
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (user) {
      const filtered = products.filter((p) => p.user_id === user.id);
      setMyProducts(filtered);
    }
  }, [products, user]);

  if (!user) {
    return <div className="text-center py-12">Please log in to see your listings.</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">My Listings</h1>

      {myProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myProducts.map((product) => (
            <ProductCard key={product.id} product={product} onFavorite={() => {}} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You have not listed any products yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyListings;
