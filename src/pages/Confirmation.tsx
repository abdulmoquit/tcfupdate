import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import * as confetti from "canvas-confetti";

const Confirmation = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user, updateMembership } = useAuth();

    // Fallback if accessed directly without state
    useEffect(() => {
        if (!state?.paymentId) {
            navigate("/dashboard");
        } else {
            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Save membership to user profile
            const { plan, branch, paymentId } = state;
            const today = new Date();

            // Calculate end date based on plan
            let endDate = new Date(today);
            if (plan.id === "monthly") {
                endDate.setMonth(endDate.getMonth() + 1);
            } else if (plan.id === "quarterly") {
                endDate.setMonth(endDate.getMonth() + 3);
            } else if (plan.id === "annual") {
                endDate.setFullYear(endDate.getFullYear() + 1);
            }

            const membershipData = {
                planId: plan.id,
                start: today,
                end: endDate,
                status: "active" as const,
                branchId: branch.id
            };

            const transactionData = {
                id: paymentId,
                date: today.toISOString(),
                description: `${plan.name} Membership`,
                amount: plan.price,
                status: "paid",
                method: "UPI"
            };

            updateMembership(membershipData, transactionData);
        }
    }, [state, navigate, updateMembership]);

    if (!state?.paymentId) return null;

    const { plan, branch, paymentId } = state;
    const today = new Date();
    const startDate = today.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    // Mock receipt download
    const handleDownload = () => {
        alert("Downloading receipt...");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
                >
                    <div className="bg-green-500/10 p-8 text-center border-b border-border">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="bg-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <CheckCircle size={40} />
                        </motion.div>
                        <h1 className="font-heading text-3xl font-bold mb-2">Welcome to the Tribe!</h1>
                        <p className="text-muted-foreground">Your membership is now active. Get ready to transform.</p>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Membership Details */}
                        <div className="grid md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Membership ID</p>
                                <p className="font-bold text-lg font-heading tracking-wider">{user?.id || "MEM-NEW"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Transaction ID</p>
                                <p className="font-mono text-foreground">{paymentId}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Plan</p>
                                <p className="font-bold">{plan.name} ({plan.duration})</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Home Branch</p>
                                <p className="font-bold">{branch.name}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Start Date</p>
                                <p className="font-bold">{startDate}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Amount Paid</p>
                                <p className="font-bold text-green-500">{plan.price}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={handleDownload}
                            >
                                <Download size={16} className="mr-2" /> Download Receipt
                            </Button>
                            <Link to="/dashboard" className="flex-1">
                                <Button className="w-full bg-primary hover:bg-gym-red-light text-primary-foreground glow-red">
                                    Go to Dashboard <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default Confirmation;
