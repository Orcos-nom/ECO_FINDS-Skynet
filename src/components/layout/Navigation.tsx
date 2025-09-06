import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Plus, Home, List, Heart, LogOut } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationProps {
  cartCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({ cartCount = 0 }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-foreground">EcoFinds</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-smooth ${
                  isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Browse
              </Link>
              <Link
                to="/my-listings"
                className={`text-sm font-medium transition-smooth ${
                  isActive('/my-listings') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                My Listings
              </Link>
              <Link
                to="/purchases"
                className={`text-sm font-medium transition-smooth ${
                  isActive('/purchases') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Purchases
              </Link>
              {/* Chat Link Added */}
              <Link
                to="/chat"
                className={`text-sm font-medium transition-smooth ${
                  isActive('/chat') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Chat
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <Link to="/cart" className="relative">
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-5 w-5" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/add-product">
                    <Button variant="default" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Sell
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="default" size="sm">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-strong z-50">
        <div className="flex items-center justify-around h-16">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 px-3 py-2 transition-smooth ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          {user ? (
            <>
              <Link
                to="/my-listings"
                className={`flex flex-col items-center space-y-1 px-3 py-2 transition-smooth ${
                  isActive('/my-listings') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <List className="h-5 w-5" />
                <span className="text-xs">My Items</span>
              </Link>
              <Link
                to="/add-product"
                className="flex flex-col items-center space-y-1 px-3 py-2"
              >
                <div className="bg-gradient-primary p-2 rounded-full">
                  <Plus className="h-5 w-5 text-primary-foreground" />
                </div>
              </Link>
              <Link
                to="/cart"
                className={`flex flex-col items-center space-y-1 px-3 py-2 transition-smooth relative ${
                  isActive('/cart') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-2 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className={`flex flex-col items-center space-y-1 px-3 py-2 transition-smooth ${
                  isActive('/profile') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <User className="h-5 w-5" />
                <span className="text-xs">Profile</span>
              </Link>
              {/* Chat Link Added */}
              <Link
                to="/chat"
                className={`flex flex-col items-center space-y-1 px-3 py-2 transition-smooth ${
                  isActive('/chat') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Heart className="h-5 w-5" />
                <span className="text-xs">Chat</span>
              </Link>
            </>
          ) : (
            <Link
              to="/auth"
              className={`flex flex-col items-center space-y-1 px-4 py-2 transition-smooth ${
                isActive('/auth') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <User className="h-5 w-5" />
              <span className="text-xs">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
