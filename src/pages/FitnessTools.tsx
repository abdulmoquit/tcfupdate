import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BMICalculator from "@/components/BMICalculator";
import CalorieCalculator from "@/components/CalorieCalculator";

const FitnessTools = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary/20" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary font-body text-sm uppercase tracking-widest">
                            Health & Fitness Tools
                        </span>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
                            TRACK YOUR <span className="text-gradient-red">PROGRESS</span>
                        </h1>
                        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                            Use our scientifically designed calculators to understand your body better and plan your fitness journey effectively.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Calculators Grid */}
            <section className="py-16 relative" ref={ref}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <BMICalculator />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <CalorieCalculator />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FitnessTools;
