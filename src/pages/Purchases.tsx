// src/pages/Purchases.tsx
import React, { useState } from 'react';
import { ProductCard, Product } from '../components/ui/product-card';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';

// ✅ Mock purchases data (replace with real API later)
const mockPurchases: Product[] = [
  {
    id: '1',
    title: 'iPhone 12 Pro - Unlocked, Excellent Condition',
    price: 599,
    image: 'https://via.placeholder.com/400x300?text=Phone',
    category: 'Electronics',
    location: 'San Francisco, CA',
    timePosted: '2h ago',
    condition: 'excellent',
    isFavorited: false
  },
  {
    id: '2',
    title: 'Vintage Leather Jacket - Size Medium',
    price: 85,
    image: 'https://via.placeholder.com/400x300?text=Jacket',
    category: 'Clothing',
    location: 'New York, NY',
    timePosted: '5h ago',
    condition: 'good',
    isFavorited: true
  }
];

const Purchases: React.FC = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Product[]>(mockPurchases);

  const handleFavorite = (productId: string) => {
    setPurchases(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, isFavorited: !product.isFavorited }
          : product
      )
    );
  };

  const handleBuyAgain = (product: Product) => {
    alert(`You chose to buy again: ${product.title}`);
    // TODO: Implement actual buy again logic (add to cart, checkout, etc.)
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">My Purchases</h1>

        {purchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {purchases.map(product => (
              <div key={product.id} className="space-y-2">
                <ProductCard
                  product={product}
                  onFavorite={handleFavorite}
                />
                <Button
                  variant="hero"
                  size="sm"
                  className="w-full"
                  onClick={() => handleBuyAgain(product)}
                >
                  Buy Again
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No purchases yet
            </h3>
            <p className="text-muted-foreground">
              Explore our marketplace and buy your first item!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
