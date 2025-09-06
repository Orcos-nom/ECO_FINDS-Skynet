import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  location?: string;
  timePosted?: string;
  isFavorited?: boolean;
  condition?: 'excellent' | 'good' | 'fair' | 'poor';
  isSold?: boolean;
}

interface ProductCardProps {
  product: Product;
  onFavorite?: (productId: string) => void;
  onSell?: (product: Product) => void;
  compact?: boolean;
}

const ProductCardOld: React.FC<ProductCardProps> = ({
  product,
  onFavorite,
  onSell,
  compact = false
}) => {

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(product.id);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  const getConditionColor = (condition?: string) => {
    switch (condition) {
      case 'excellent': return 'bg-success/20 text-success';
      case 'good': return 'bg-primary/20 text-primary';
      case 'fair': return 'bg-warning/20 text-warning';
      case 'poor': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={`bg-gradient-card rounded-lg border border-border shadow-soft hover:shadow-medium transition-smooth group overflow-hidden ${compact ? 'h-auto' : 'h-80'}`}>
      
      {/* Image + Favorite */}
      <div className={`relative overflow-hidden ${compact ? 'h-32' : 'h-48'}`}>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card"
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-4 w-4 transition-smooth ${product.isFavorited ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-primary'}`} />
        </Button>

        <Badge variant="secondary" className="absolute top-2 left-2 bg-card/80 backdrop-blur-sm">
          {product.category}
        </Badge>

        {product.condition && <Badge className={`absolute bottom-2 left-2 ${getConditionColor(product.condition)}`}>{product.condition}</Badge>}
      </div>

      {/* Content */}
      <div className={`p-4 ${compact ? 'space-y-1' : 'space-y-2'}`}>
        <h3 className={`font-semibold text-foreground line-clamp-2 ${compact ? 'text-sm' : 'text-base'}`}>
          {product.title}
        </h3>

        <div className="flex items-center justify-between">
          <span className={`font-bold text-primary ${compact ? 'text-lg' : 'text-xl'}`}>
            {formatPrice(product.price)}
          </span>

          {onSell && !product.isSold && (
            <Button
              size="sm"
              variant="default"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSell(product);
              }}
            >
              Sell
            </Button>
          )}

          {product.isSold && <span className="text-sm text-destructive font-semibold">Sold</span>}
        </div>

        {!compact && (
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            {product.location && <div className="flex items-center space-x-1"><MapPin className="h-3 w-3"/><span>{product.location}</span></div>}
            {product.timePosted && <div className="flex items-center space-x-1"><Clock className="h-3 w-3"/><span>{product.timePosted}</span></div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCardOld;
