import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Building2,
  Users,
  KanbanSquare,
  MessageSquare,
  Star,
  FileText,
  Sparkles,
  Package,
  DollarSign,
  Tag,
  Palette,
  ShieldAlert,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Home,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { useAuthStore } from "../../store/authStore";
import { useUIStore } from "../../store/uiStore";
import { siteConfig } from "../../config/site";
import { toast } from "sonner";

export function AdminLayout() {
  const { user, logout } = useAuthStore();
  const { isDark, toggleDarkMode, isSidebarCollapsed, toggleSidebar, isCommandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  const navGroups = [
    {
      group: "Core Management",
      items: [
        { label: "Overview", path: "/admin", icon: LayoutDashboard },
        { label: "Bookings", path: "/admin/bookings", icon: CalendarCheck, badge: "3 New" },
        { label: "Calendar Timeline", path: "/admin/calendar", icon: CalendarDays },
        { label: "Apartments & Suites", path: "/admin/apartments", icon: Building2 }
      ]
    },
    {
      group: "CRM & Guest Hub",
      items: [
        { label: "Guests CRM", path: "/admin/guests", icon: Users },
        { label: "Leads Pipeline", path: "/admin/leads", icon: KanbanSquare, badge: "40" },
        { label: "WhatsApp & Messages", path: "/admin/communication", icon: MessageSquare },
        { label: "Reviews Moderation", path: "/admin/reviews", icon: Star }
      ]
    },
    {
      group: "Operations & Finance",
      items: [
        { label: "Long-Stay & Tenancy", path: "/admin/long-stay", icon: FileText },
        { label: "Housekeeping Tasks", path: "/admin/housekeeping", icon: Sparkles },
        { label: "Inventory Tracker", path: "/admin/inventory", icon: Package },
        { label: "Finance & P&L", path: "/admin/finance", icon: DollarSign },
        { label: "Promotions & Coupons", path: "/admin/promotions", icon: Tag }
      ]
    },
    {
      group: "System & Website",
      items: [
        { label: "Visual CMS Editor", path: "/admin/cms", icon: Palette },
        { label: "Staff & RBAC", path: "/admin/staff", icon: ShieldAlert },
        { label: "Reports & Analytics", path: "/admin/reports", icon: BarChart3 },
        { label: "Settings & Backup", path: "/admin/settings", icon: Settings }
      ]
    }
  ];

  const allNavItems = navGroups.flatMap((g) => g.items);
  const filteredCommands = allNavItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-ink-50/50 dark:bg-ink-950 flex flex-col lg:flex-row text-ink-900 dark:text-white">
      {/* Mobile Top Navbar */}
      <header className="lg:hidden bg-white dark:bg-ink-900 border-b border-ink-100 dark:border-ink-800 px-4 py-3 flex items-center justify-between z-30">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-xl text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/admin" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Zak Residence" className="h-8 w-auto" />
        </Link>
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="p-2 rounded-xl text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800"
        >
          <Search className="w-5 h-5" />
        </button>
      </header>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-ink-900 border-r border-ink-100 dark:border-ink-800 flex flex-col justify-between transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-ink-100 dark:border-ink-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <img src="/logo.svg" alt="Zak Residence" className="h-8 w-auto shrink-0" />
            {!isSidebarCollapsed && (
              <span className="font-heading text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest truncate">
                Admin Console
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-ink-400 hover:text-ink-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-ink-400 dark:text-ink-500 mb-2">
                  {group.group}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.path === "/admin"
                    ? location.pathname === "/admin"
                    : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-gold-500 text-white font-bold shadow-sm shadow-gold-500/20"
                        : "text-ink-700 dark:text-ink-300 hover:bg-gold-50/50 dark:hover:bg-ink-800 hover:text-gold-600"
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                    {!isSidebarCollapsed && item.badge && (
                      <span className="ml-auto px-1.5 py-0.2 rounded-full text-[9px] bg-ink-900 text-gold-400 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* User Info & Footer Actions */}
        <div className="p-4 border-t border-ink-100 dark:border-ink-800 space-y-3 bg-cream-50/50 dark:bg-ink-950/40">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80"}
              alt={user?.name}
              className="w-9 h-9 rounded-xl object-cover border border-gold-400 shrink-0"
            />
            {!isSidebarCollapsed && (
              <div className="overflow-hidden">
                <div className="text-xs font-bold truncate">{user?.name || "Admin User"}</div>
                <div className="text-[10px] text-gold-600 uppercase font-semibold">{user?.roleLabel || user?.role}</div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 text-ink-500"
              title="Collapse Sidebar"
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        {/* Desktop Topbar */}
        <header className="hidden lg:flex h-16 bg-white dark:bg-ink-900 border-b border-ink-100 dark:border-ink-800 px-8 items-center justify-between sticky top-0 z-30 shadow-xs">
          {/* Search Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/60 dark:bg-ink-800 text-ink-400 text-xs hover:border-gold-400 transition-colors w-72"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search modules, bookings (Ctrl+K)...</span>
          </button>

          {/* Topbar Right Tools */}
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank">
              <Button variant="outline" size="sm" leftIcon={<Home className="w-3.5 h-3.5" />}>
                View Public Site
              </Button>
            </Link>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 border border-ink-200 dark:border-ink-800 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-gold-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 border border-ink-200 dark:border-ink-800 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full" />
              </button>

              {notificationsOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-ink-900 rounded-2xl shadow-xl border border-ink-100 dark:border-ink-800 p-4 z-50 animate-in fade-in space-y-3"
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-ink-100 dark:border-ink-800">
                    <span className="text-xs font-bold">Recent Alerts</span>
                    <span className="text-[10px] text-gold-600 font-semibold">3 Unread</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-gold-50 dark:bg-gold-950/40 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 mt-0.5" />
                      <div>
                        <div className="font-bold">New Booking: ZAK-26-M19P3</div>
                        <div className="text-[10px] text-ink-500">Bilal Khan · Bahria Town 1BR</div>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-cream-50 dark:bg-ink-800 flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5" />
                      <div>
                        <div className="font-bold">Low Inventory: Toiletries Kit</div>
                        <div className="text-[10px] text-ink-500">8 units remaining in Johar Town</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Command Palette (Ctrl+K) Modal */}
      <Modal
        isOpen={isCommandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        size="md"
        className="top-12"
      >
        <div className="space-y-4">
          <Input
            placeholder="Type a command or module name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-gold-500" />}
            autoFocus
          />

          <div className="space-y-1 max-h-60 overflow-y-auto">
            {filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.path}
                  onClick={() => {
                    navigate(cmd.path);
                    setCommandPaletteOpen(false);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold hover:bg-gold-50 dark:hover:bg-ink-800 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-gold-500" />
                    <span>{cmd.label}</span>
                  </div>
                  <span className="text-[10px] text-ink-400 group-hover:text-gold-600">Jump →</span>
                </button>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}
