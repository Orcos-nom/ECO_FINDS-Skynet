import React, { useState } from "react";
import { Leaf, TrendingUp, Zap } from "lucide-react";
import { SearchBar, SearchFilters } from "@/components/ui/search-bar";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/contexts/ProductContext";

const heroBanner = "https://via.placeholder.com/1200x400?text=EcoFinds+Hero";

const Home: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'All Categories',
    condition: 'All Conditions',
    priceRange: 'All Prices',
    location: ''
  });

  const { products } = useProducts();

  const filteredProducts = products.filter(product => {
    const matchesQuery = product.title.toLowerCase().includes(filters.query.toLowerCase());
    const matchesCategory = filters.category === 'All Categories' || product.category === filters.category;
    const matchesCondition = filters.condition === 'All Conditions' || product.condition.toLowerCase() === filters.condition.toLowerCase();
    return matchesQuery && matchesCategory && matchesCondition;
  });

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroBanner} alt="EcoFinds marketplace" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-primary" />
              <Badge variant="secondary" className="bg-primary-light text-primary-foreground">
                Sustainable Shopping
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Find Amazing
              <span className="text-primary block">Second-Hand Treasures</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover unique pre-loved items from trusted sellers. Shop sustainably, save money, and reduce waste with EcoFinds.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar filters={filters} onFiltersChange={setFilters} placeholder="Search for products..." />
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-6 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Popular Categories</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Electronics', 'Clothing', 'Furniture', 'Books', 'Sports'].map(category => (
              <Button
                key={category}
                variant={filters.category === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, category }))}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onFavorite={() => {}} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
