import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    CreditCard,
    User,
    LogOut,
    Menu,
    X,
    Bell
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Redirect if not logged in
    if (!user && !localStorage.getItem("gym_user")) {
        // Ideally this should be handled by a ProtectedRoute wrapper, 
        // but adding a failsafe here
        navigate("/login");
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const navItems = [
        { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Profile", icon: User, href: "/dashboard/profile" },
        { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Navigation */}
            <motion.aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 md:translate-x-0 md:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <Link to="/" className="font-heading text-xl font-bold tracking-tighter">
                            TCF <span className="text-primary">MEMBER</span>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 py-6 px-4 space-y-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="p-4 border-t border-border">
                        <div className="flex items-center gap-3 mb-4 px-4">
                            <Avatar>
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name}&background=ff1744&color=fff`} />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
                                <p className="font-medium truncate">{user?.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                            </div>
                        </div>
                        <Button
                            variant="destructive"
                            className="w-full justify-start pl-4 bg-secondary text-foreground hover:bg-destructive/10 hover:text-destructive border border-border"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} className="mr-2" /> Sign Out
                        </Button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Top Header (Mobile) */}
                <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2">
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <button className="relative p-2 text-muted-foreground hover:text-foreground">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
