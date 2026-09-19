import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Menu,
  X,
  Globe,
  User,
  LayoutDashboard,
  Calendar,
  LogOut,
  Phone,
  Heart,
  ChevronDown
} from "lucide-react";
import { Button } from "../ui/Button";
import { useAuthStore } from "../../store/authStore";
import { useUIStore } from "../../store/uiStore";
import { useWishlistStore } from "../../store/wishlistStore";
import { siteConfig } from "../../config/site";
import { cn } from "../../lib/utils";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const { language, setLanguage } = useUIStore();
  const { savedApartmentIds } = useWishlistStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ur" : "en";
    i18n.changeLanguage(nextLang);
    setLanguage(nextLang);
  };

  const navLinks = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.apartments"), path: "/apartments" },
    { label: t("nav.locations"), path: "/locations" },
    { label: t("nav.gallery"), path: "/gallery" },
    { label: t("nav.reviews"), path: "/reviews" },
    { label: t("nav.blog"), path: "/blog" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.contact"), path: "/contact" }
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 w-full",
        isScrolled
          ? "bg-white/95 dark:bg-ink-950/95 backdrop-blur-md shadow-sm border-b border-ink-100 dark:border-ink-800 py-3"
          : "bg-white dark:bg-ink-950 border-b border-ink-100/60 dark:border-ink-800/60 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.svg"
            alt={siteConfig.name}
            className="h-10 w-auto group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative px-2 py-2 text-xs font-semibold transition-all tracking-wide uppercase group",
                  isActive
                    ? "text-gold-600 dark:text-gold-400 font-bold"
                    : "text-ink-700 dark:text-ink-300 hover:text-gold-600 dark:hover:text-gold-400"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute left-0 bottom-0 w-full h-[2px] bg-gold-500 transition-transform duration-300 origin-left",
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Wishlist Link */}
          <Link
            to="/account/wishlist"
            className="p-2 text-ink-600 dark:text-ink-300 hover:text-gold-600 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-900 relative transition-colors"
            title="Saved Apartments"
          >
            <Heart className="w-4 h-4" />
            {savedApartmentIds.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold-500 rounded-full ring-2 ring-white" />
            )}
          </Link>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-900 rounded-xl border border-ink-200 dark:border-ink-800 transition-colors"
            title="Toggle English / Urdu"
          >
            <Globe className="w-3.5 h-3.5 text-gold-500" />
            <span>{language === "en" ? "اردو" : "English"}</span>
          </button>

          {/* User Auth Dropdown / Portal Link */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-ink-200 dark:border-ink-800 hover:border-gold-400 bg-cream-50/50 dark:bg-ink-900 transition-colors"
              >
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                  alt={user?.name}
                  className="w-6 h-6 rounded-full object-cover border border-gold-400"
                />
                <span className="text-xs font-semibold text-ink-800 dark:text-white max-w-[90px] truncate">
                  {user?.name?.split(" ")[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-ink-400" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-ink-900 rounded-2xl shadow-xl border border-ink-100 dark:border-ink-800 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-ink-100 dark:border-ink-800">
                    <p className="text-xs font-bold text-ink-900 dark:text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-gold-600 dark:text-gold-400 font-semibold uppercase tracking-wider">
                      {user?.roleLabel || user?.role}
                    </p>
                  </div>

                  {user?.role === "admin" || user?.role === "manager" ? (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-ink-700 dark:text-ink-200 hover:bg-gold-50 dark:hover:bg-ink-800 hover:text-gold-600 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gold-500" />
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-ink-700 dark:text-ink-200 hover:bg-gold-50 dark:hover:bg-ink-800 hover:text-gold-600 font-medium"
                    >
                      <User className="w-4 h-4 text-gold-500" />
                      Guest Portal
                    </Link>
                  )}

                  <Link
                    to="/account/bookings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-ink-700 dark:text-ink-200 hover:bg-gold-50 dark:hover:bg-ink-800 hover:text-gold-600 font-medium"
                  >
                    <Calendar className="w-4 h-4 text-gold-500" />
                    My Bookings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-left font-medium border-t border-ink-100 dark:border-ink-800 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" leftIcon={<User className="w-3.5 h-3.5" />}>
                {t("nav.login")}
              </Button>
            </Link>
          )}

          {/* Book Now Primary CTA */}
          <Link to="/apartments">
            <Button 
              variant="gold" 
              size="sm" 
              className="shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 transform hover:-translate-y-0.5 transition-all text-white font-bold"
            >
              {t("nav.bookNow")}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 text-xs font-bold text-gold-700 dark:text-gold-300 border border-gold-400/40 rounded-lg"
          >
            {language === "en" ? "اردو" : "EN"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink-800 dark:text-white hover:bg-ink-100 dark:hover:bg-ink-900 rounded-xl"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-ink-950 border-b border-ink-100 dark:border-ink-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold rounded-lg text-ink-800 dark:text-ink-200 hover:bg-gold-50 dark:hover:bg-ink-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-ink-100 dark:border-ink-800 flex flex-col gap-2">
            {isAuthenticated ? (
              <div className="flex gap-2">
                <Link
                  to={user?.role === "admin" || user?.role === "manager" ? "/admin" : "/account"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    {user?.role === "admin" ? "Admin Panel" : "Guest Account"}
                  </Button>
                </Link>
                <Button variant="danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  {t("nav.login")} / Register
                </Button>
              </Link>
            )}

            <Link to="/apartments" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="gold" size="md" className="w-full">
                {t("nav.bookNow")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
