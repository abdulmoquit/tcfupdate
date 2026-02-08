import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    Calendar,
    Clock,
    TrendingUp,
    User,
    Dumbbell,
    MapPin,
    AlertTriangle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { plans } from "@/data/plans";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const DashboardHome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <div className="text-center p-8">Loading profile...</div>;
    }

    // If no membership, show message to purchase
    if (!user.membership) {
        return (
            <div className="text-center p-12 bg-card border border-border rounded-2xl">
                <h2 className="font-heading text-2xl font-bold mb-4">No Active Membership</h2>
                <p className="text-muted-foreground mb-6">You don't have an active membership yet. Purchase a plan to get started!</p>
                <Button onClick={() => navigate("/membership")} className="bg-primary hover:bg-gym-red-light">
                    Browse Membership Plans
                </Button>
            </div>
        );
    }

    const plan = plans.find(p => p.id === user.membership.planId);

    // Calculate days remaining
    const today = new Date();
    const endDate = new Date(user.membership.end);
    const totalDuration = endDate.getTime() - new Date(user.membership.start).getTime();
    const timeLeft = endDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    const progress = Math.max(0, Math.min(100, (timeLeft / totalDuration) * 100));

    const isExpiringSoon = daysLeft <= 30 && daysLeft > 0;
    const isExpired = daysLeft <= 0;

    return (
        <div className="space-y-8">

            {/* Welcome Banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-heading text-3xl font-bold">Hello, {user.name.split(" ")[0]}! 👋</h1>
                    <p className="text-muted-foreground">Welcome back to your fitness dashboard.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/profile")}>
                        <User size={16} className="mr-2" /> Edit Profile
                    </Button>
                    <Button className="bg-primary hover:bg-gym-red-light text-primary-foreground" size="sm">
                        <Dumbbell size={16} className="mr-2" /> Log Workout
                    </Button>
                </div>
            </div>

            {/* Notifications */}
            {isExpiringSoon && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-start gap-3"
                >
                    <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h4 className="font-bold text-yellow-500">Membership Expiring Soon</h4>
                        <p className="text-sm text-muted-foreground">Your {plan?.name} plan expires in {daysLeft} days. Renew now to keep your streak alive.</p>
                    </div>
                    <Button size="sm" className="bg-yellow-500 text-black hover:bg-yellow-400" onClick={() => navigate("/membership")}>Renew Now</Button>
                </motion.div>
            )}

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Main Status Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border border-border p-6 rounded-2xl shadow-sm relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={100} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-heading text-lg text-muted-foreground uppercase tracking-wider">Current Plan</h3>
                                <p className="text-2xl font-bold text-primary">{plan?.name} Membership</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isExpired ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"
                                }`}>
                                {isExpired ? "Expired" : "Active"}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">Days Remaining</span>
                                    <span className="font-bold text-foreground">{Math.max(0, daysLeft)} Days</span>
                                </div>
                                <Progress value={progress} className="h-2 bg-secondary" indicatorClassName={`${daysLeft < 30 ? "bg-yellow-500" : "bg-primary"}`} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                <div>
                                    <p className="text-xs text-muted-foreground">Start Date</p>
                                    <p className="font-medium text-sm flex items-center gap-1">
                                        <Calendar size={12} /> {new Date(user.membership.start).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">End Date</p>
                                    <p className="font-medium text-sm flex items-center gap-1">
                                        <Clock size={12} /> {new Date(user.membership.end).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Home Branch Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col"
                >
                    <h3 className="font-heading text-lg text-muted-foreground uppercase tracking-wider mb-4">Home Branch</h3>

                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4 bg-secondary/20 rounded-xl mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                            <MapPin size={32} />
                        </div>
                        <h4 className="font-bold text-xl capitalize">{user.membership.branchId} Branch</h4>
                        <p className="text-sm text-muted-foreground">Kolkata</p>
                    </div>

                    <Button variant="outline" className="w-full">
                        View Schedule
                    </Button>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-primary/20 via-card to-card border border-primary/20 p-6 rounded-2xl shadow-sm flex flex-col justify-between"
                >
                    <div>
                        <h3 className="font-heading text-lg font-bold mb-2">Quick Actions</h3>
                        <p className="text-muted-foreground text-sm mb-6">Manage your membership details</p>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={() => navigate("/membership")}
                            className="w-full bg-primary hover:bg-gym-red-light text-primary-foreground"
                        >
                            Renew Membership
                        </Button>
                        <Button
                            variant="secondary"
                            className="w-full border border-border"
                            onClick={() => navigate("/dashboard/billing")}
                        >
                            Download Invoice
                        </Button>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default DashboardHome;
