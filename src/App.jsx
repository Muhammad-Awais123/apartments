import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";
import { initializeDatabase } from "./services/api/storage";
import { useUIStore } from "./store/uiStore";
import "./i18n/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      retry: 1
    }
  }
});

export default function App() {
  const { isDark, language } = useUIStore();

  useEffect(() => {
    // Initialize mock database in IndexedDB on first application mount
    initializeDatabase().catch(console.error);

    // Apply dark mode & language direction
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.documentElement.setAttribute("dir", language === "ur" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", language);
  }, [isDark, language]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              className: "rounded-2xl font-body text-xs shadow-xl border border-ink-100 dark:border-ink-800"
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
