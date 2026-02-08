import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { plans } from "@/data/plans";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const Membership = () => {
    const navigate = useNavigate();

    const handleSelectPlan = (planId: string) => {
        navigate(`/enroll?plan=${planId}`);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4 bg-background relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight">
                            Invest in Your <span className="text-primary">Body</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg mt-4">
                            Choose a plan that fits your lifestyle. No hidden fees, just pure fitness.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="flex-1 py-12 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`relative bg-card border border-border rounded-2xl p-8 flex flex-col h-full hover:border-primary/50 transition-all duration-300 group ${plan.popular ? "shadow-2xl shadow-primary/10 ring-1 ring-primary/20 scale-105 md:scale-110 z-10" : ""
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="font-heading text-xl text-muted-foreground uppercase tracking-wider mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="font-heading text-4xl md:text-5xl font-bold text-foreground">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm">{plan.duration}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1 bg-primary/20 p-1 rounded-full text-primary shrink-0">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span className="text-sm text-foreground/80">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                onClick={() => handleSelectPlan(plan.id)}
                                className={`w-full py-6 font-heading uppercase tracking-wider text-base transition-all duration-300 ${plan.popular
                                        ? "bg-primary hover:bg-gym-red-light text-primary-foreground glow-red"
                                        : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                                    }`}
                            >
                                Choose {plan.name}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Membership;
