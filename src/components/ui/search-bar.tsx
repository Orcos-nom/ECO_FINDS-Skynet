import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Badge } from './badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Furniture',
  'Books',
  'Sports',
  'Home & Garden',
  'Toys',
  'Automotive',
  'Other'
];

const conditions = ['All Conditions', 'Excellent', 'Good', 'Fair', 'Poor'];
const priceRanges = [
  'All Prices',
  'Under $25',
  '$25 - $50',
  '$50 - $100',
  '$100 - $250',
  '$250 - $500',
  'Over $500'
];

export interface SearchFilters {
  query: string;
  category: string;
  condition: string;
  priceRange: string;
  location: string;
}

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  onFiltersChange,
  placeholder = "Search for products..."
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: '',
      category: 'All Categories',
      condition: 'All Conditions',
      priceRange: 'All Prices',
      location: ''
    });
  };

  const hasActiveFilters = () => {
    return filters.category !== 'All Categories' ||
           filters.condition !== 'All Conditions' ||
           filters.priceRange !== 'All Prices' ||
           filters.location !== '';
  };

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="pl-10 pr-4 h-12 text-base"
          />
        </div>
        
        {/* Quick Category Select (Desktop) */}
        <div className="hidden md:block">
          <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
            <SelectTrigger className="w-48 h-12">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter Toggle */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="default" className="h-12 px-4">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters() && (
                <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  !
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Results</SheetTitle>
              <SheetDescription>
                Refine your search to find exactly what you're looking for.
              </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-6 mt-6">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Condition Filter */}
              <div>
                <label className="text-sm font-medium text-foreground">Condition</label>
                <Select value={filters.condition} onValueChange={(value) => updateFilter('condition', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="text-sm font-medium text-foreground">Price Range</label>
                <Select value={filters.priceRange} onValueChange={(value) => updateFilter('priceRange', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="text-sm font-medium text-foreground">Location</label>
                <Input
                  type="text"
                  placeholder="Enter city or zip code"
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters() && (
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2">
          {filters.category !== 'All Categories' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{filters.category}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => updateFilter('category', 'All Categories')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.condition !== 'All Conditions' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{filters.condition}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => updateFilter('condition', 'All Conditions')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.priceRange !== 'All Prices' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{filters.priceRange}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => updateFilter('priceRange', 'All Prices')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{filters.location}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => updateFilter('location', '')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;