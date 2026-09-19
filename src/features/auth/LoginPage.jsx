import React, { useState } from "react";
import { Link, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  Building,
  Key,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { SEOHelmet } from "../../components/common/SEOHelmet";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsRole, isAuthenticated, user } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || (user?.role === "admin" || user?.role === "manager" ? "/admin" : "/account");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const loggedInUser = await login(email, password);
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      if (loggedInUser.role === "admin" || loggedInUser.role === "manager" || loggedInUser.role === "front_desk") {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    } catch (err) {
      toast.error(err.message || "Invalid login credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role) => {
    setLoading(true);
    try {
      const loggedUser = await loginAsRole(role);
      toast.success(`Logged in as ${loggedUser.name} (${loggedUser.roleLabel || role})`);
      if (role === "admin" || role === "manager" || role === "front_desk" || role === "housekeeping") {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    } catch (err) {
      toast.error("Demo login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50/40 dark:bg-ink-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet title="Resident & Staff Login | Zak Residence Lahore" />

      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <img src="/logo.svg" alt="Zak Residence" className="h-12 w-auto mx-auto" />
          </Link>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-ink-900 dark:text-white">
            Access Your Portal
          </h1>
          <p className="text-xs text-ink-500">
            Sign in to manage reservations, door codes, and operations.
          </p>
        </div>

        {/* 1-Click Quick Demo Login Switcher */}
        <div className="bg-white dark:bg-ink-900 p-4 sm:p-5 rounded-3xl border border-gold-400/40 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Demo Login
            </span>
            <span className="text-[10px] text-ink-400">Instant Role Switch</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("admin")}
              className="p-2 rounded-xl bg-ink-900 hover:bg-deepNavy text-gold-300 font-bold text-center border border-gold-500/30 transition-all text-[11px]"
            >
              👑 Admin / Owner
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("manager")}
              className="p-2 rounded-xl bg-ink-50 hover:bg-gold-50 dark:bg-ink-800 text-ink-800 dark:text-ink-200 font-semibold text-center border border-ink-200 dark:border-ink-700 transition-all text-[11px]"
            >
              💼 Manager
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("front_desk")}
              className="p-2 rounded-xl bg-ink-50 hover:bg-gold-50 dark:bg-ink-800 text-ink-800 dark:text-ink-200 font-semibold text-center border border-ink-200 dark:border-ink-700 transition-all text-[11px]"
            >
              🛎️ Front Desk
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("housekeeping")}
              className="p-2 rounded-xl bg-ink-50 hover:bg-gold-50 dark:bg-ink-800 text-ink-800 dark:text-ink-200 font-semibold text-center border border-ink-200 dark:border-ink-700 transition-all text-[11px]"
            >
              🧹 Housekeeping
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("guest")}
              className="col-span-2 sm:col-span-2 p-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold text-center transition-all text-[11px]"
            >
              ⭐ Resident / Guest
            </button>
          </div>
        </div>

        {/* Standard Credentials Form */}
        <div className="bg-white dark:bg-ink-900 p-6 sm:p-8 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. admin@zakresidence.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="space-y-1 text-left">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-ink-400 hover:text-ink-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
              />
              <div className="flex justify-end pt-1">
                <Link to="/forgot-password" className="text-[11px] text-gold-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="md"
              className="w-full"
              isLoading={loading}
            >
              Sign In to Account
            </Button>
          </form>

          <div className="pt-4 border-t border-ink-100 dark:border-ink-800 text-center text-xs text-ink-500">
            Don't have an account yet?{" "}
            <Link to="/register" className="font-bold text-gold-600 hover:underline">
              Create Resident Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", cnic: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created successfully! Welcome to Zak Residence.");
      login("guest@zakresidence.com", "guest123");
      navigate("/account");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cream-50/40 dark:bg-ink-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet title="Register Resident Account | Zak Residence Lahore" />
      <div className="max-w-md w-full mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <img src="/logo.svg" alt="Zak Residence" className="h-12 w-auto mx-auto" />
          </Link>
          <h1 className="font-heading text-2xl font-bold text-ink-900 dark:text-white">
            Create Your Resident Account
          </h1>
          <p className="text-xs text-ink-500">
            Unlock loyalty discounts, saved bookings, and fast keyless check-ins.
          </p>
        </div>

        <div className="bg-white dark:bg-ink-900 p-6 sm:p-8 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-xl space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Legal Name"
              placeholder="e.g. Hamza Tariq"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="hamza@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="WhatsApp Phone"
              placeholder="+92 300 1234567"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <Input
              label="CNIC / Passport Number"
              placeholder="35202-XXXXXXXX-X"
              value={form.cnic}
              onChange={(e) => setForm({ ...form, cnic: e.target.value })}
            />
            <Input
              label="Create Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <Button type="submit" variant="gold" size="md" className="w-full" isLoading={loading}>
              Complete Registration
            </Button>
          </form>

          <div className="text-center text-xs text-ink-500 pt-2 border-t border-ink-100">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-gold-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Verification OTP sent to your email (Mock OTP: 8492)");
    setStep(2);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (otp !== "8492" && otp.length < 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }
    toast.success("Password reset successfully! Please log in.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-cream-50/40 dark:bg-ink-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white dark:bg-ink-900 p-8 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-heading text-2xl font-bold">Reset Password</h1>
          <p className="text-xs text-ink-500">
            {step === 1 ? "Enter your registered email address" : "Enter OTP code 8492 and new password"}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
            <Button type="submit" variant="gold" size="md" className="w-full">
              Send Password Reset Code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <Input
              label="4-Digit OTP Code"
              placeholder="8492"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="gold" size="md" className="w-full">
              Update Password & Login
            </Button>
          </form>
        )}

        <div className="text-center">
          <Link to="/login" className="text-xs text-gold-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RoleGuard({ allowedRoles = [] }) {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-4">
        <ShieldCheck className="w-12 h-12 text-red-500" />
        <h2 className="font-heading text-2xl font-bold">Restricted Access</h2>
        <p className="text-xs text-ink-500 max-w-sm">
          Your account role ({user?.roleLabel || user?.role}) does not have permissions to access this administrative module.
        </p>
        <Link to="/">
          <Button variant="outline" size="sm">
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }

  return <Outlet />;
}
