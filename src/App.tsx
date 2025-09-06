import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext"; // ✅ import ProductProvider

import Navigation from "./components/layout/Navigation";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";
import Chat from "./pages/Chat";
import Purchases from "./pages/Purchases";
import MyListings from "./pages/MyListings";  // ✅ new page


import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProductProvider> {/* ✅ Wrap with ProductProvider */}
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/my-listings" element={<div>My Listings - Coming Soon</div>} />
                <Route path="/cart" element={<div>Cart - Coming Soon</div>} />
                <Route path="/purchases" element={<Purchases />} /> {/* ✅ Purchases */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ProductProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
