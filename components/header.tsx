"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Search,
  User,
  ChevronDown,
  Home,
  ShoppingBag,
  Info,
  Package,
  MessageCircle,
  LogOut,
  Phone,
} from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { useSafeCurrency } from "@/hooks/use-safe-currency";
import React from "react";
import { useAuth } from "@/components/auth-provider";
import { useWishlist } from "@/hooks/use-wishlist";
import ClientOnly from "@/components/client-only";

// Simplified navigation - fewer items
const mainNavItems = [
  { title: "Home", href: "/", icon: Home },
  {
    title: "Shop",
    href: "/shop",
    icon: ShoppingBag,
  },
  { title: "About", href: "/about", icon: Info },
  { title: "Contact", href: "/contact", icon: MessageCircle },
];

// Simplified categories
const categoryNavItems = [
  { title: "Drinks", href: "/shop?category=drinks" },
  { title: "Food", href: "/shop?category=food" },
  { title: "Flour", href: "/shop?category=flour" },
  { title: "Rice", href: "/shop?category=rice" },
  { title: "Spices", href: "/shop?category=spices" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { items, getTotalItems, getTotalPrice, isClient } = useCart();
  const { formatCurrency } = useSafeCurrency();
  const { wishlistCount } = useWishlist();
  const [logoError, setLogoError] = useState(false);
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-lg transition-all duration-300 border-b border-gray-100 ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Main Header - Clean and simple */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              {!logoError ? (
                <div className="relative h-10 w-10 rounded-xl overflow-hidden transition-transform group-hover:scale-105">
                  <Image
                    src="/images/logo/borderlessbuy-logo.png"
                    alt="Grova Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                    priority
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-xl h-10 w-10 flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-105">
                  G
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Grova</span>
                <span className="text-xs text-gray-500">Fresh Everyday</span>
              </div>
            </Link>

            {/* Desktop Navigation - Minimal */}
            <nav className="hidden md:flex items-center space-x-8">
              {mainNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-emerald-600"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pr-10 h-10 text-sm rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-gray-50/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md hover:bg-emerald-50 hover:text-emerald-600"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-1">
              <Link href="/wishlist" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group">
                <Heart className="h-5 w-5 text-gray-700 group-hover:text-emerald-600 transition-colors" />
                <ClientOnly>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </ClientOnly>
              </Link>

              <Link href="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group">
                <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-emerald-600 transition-colors" />
                <ClientOnly>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {getTotalItems()}
                    </span>
                  )}
                </ClientOnly>
              </Link>

              {user ? (
                <div className="hidden md:flex items-center space-x-2 ml-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm text-gray-700 hover:text-emerald-600 rounded-lg hover:bg-gray-100 transition-all font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-2 px-5 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-all ml-3"
                >
                  <User className="h-4 w-4" />
                  Login
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 hover:bg-gray-100 rounded-lg ml-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="pt-3 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="pr-10 h-10 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-gray-50/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md hover:bg-emerald-50 hover:text-emerald-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {!logoError ? (
                <div className="relative h-8 w-8">
                  <Image
                    src="/images/logo/borderlessbuy-logo.png"
                    alt="Grova Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="bg-green-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                  G
                </div>
              )}
              <span className="text-lg font-bold text-gray-900">Grova</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <nav className="space-y-4">
            {mainNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center space-x-2 py-2 ${
                  pathname === item.href
                    ? "text-green-600 font-medium"
                    : "text-gray-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon && React.createElement(item.icon, { className: "h-5 w-5" })}
                <span>{item.title}</span>
              </Link>
            ))}
            
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
              <div className="space-y-2">
                {categoryNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block py-1 text-gray-600 hover:text-green-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium text-sm">
                      {user.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm">
                      {user.displayName || user.email?.split("@")[0]}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 text-sm text-gray-600 hover:text-green-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center space-x-2 py-2 text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Spacer for fixed header */}
      <div className={`${isScrolled ? "h-16" : "h-20"}`}></div>
    </>
  );
}
