import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FitnessTools = lazy(() => import("./pages/FitnessTools"));
const Locations = lazy(() => import("./pages/Locations"));
const BranchDetails = lazy(() => import("./pages/BranchDetails"));
const Membership = lazy(() => import("./pages/Membership"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Enrollment = lazy(() => import("./pages/Enrollment"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const BookVisit = lazy(() => import("./pages/BookVisit"));

// Dashboard Pages
const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const Profile = lazy(() => import("./pages/dashboard/Profile"));
const PaymentHistory = lazy(() => import("./pages/dashboard/PaymentHistory"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingFallback />;

  // Check both context user & local storage failsafe
  if (!user && !localStorage.getItem("gym_user")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/tools" element={<FitnessTools />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/branches/:slug" element={<BranchDetails />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/book-visit" element={<BookVisit />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/enroll"
                element={
                  <ProtectedRoute>
                    <Enrollment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/confirmation"
                element={
                  <ProtectedRoute>
                    <Confirmation />
                  </ProtectedRoute>
                }
              />

              {/* Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="profile" element={<Profile />} />
                <Route path="billing" element={<PaymentHistory />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
