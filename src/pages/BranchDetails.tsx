import { useRef } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useInView, motion } from "framer-motion";
import { MapPin, Clock, Phone, Check, Calendar, ArrowUpRight } from "lucide-react";
import { branches } from "@/data/branches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const BranchDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const branch = branches.find((b) => b.slug === slug);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    if (!branch) {
        return <Navigate to="/locations" replace />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-end">
                <div className="absolute inset-0 z-0">
                    <img
                        src={branch.image}
                        alt={branch.name + " Gym Interior"}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm">
                                Open Now: {branch.hours}
                            </span>
                        </div>
                        <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-4">
                            {branch.name} <span className="text-primary">Branch</span>
                        </h1>
                        <p className="flex items-center gap-2 text-lg text-muted-foreground max-w-2xl">
                            <MapPin className="text-primary" /> {branch.address}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-16 bg-background" ref={ref}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">

                    {/* Left Column: Info & Trainers */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Facilities */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="font-heading text-3xl font-bold mb-6">World-Class Facilities</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {branch.facilities.map((facility) => (
                                    <div key={facility} className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border">
                                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                                            <Check size={20} />
                                        </div>
                                        <span className="font-medium">{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Trainers */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h2 className="font-heading text-3xl font-bold mb-6">Meet Our Experts</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {branch.trainers.map((trainer) => (
                                    <div key={trainer.name} className="flex gap-4 items-center bg-card p-4 rounded-xl border border-border hover:border-primary/50 transition-colors">
                                        <div className="w-16 h-16 bg-muted rounded-full overflow-hidden shrink-0">
                                            {/* Placeholder avatar */}
                                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 animate-pulse-slow" />
                                        </div>
                                        <div>
                                            <h4 className="font-heading text-lg font-bold">{trainer.name}</h4>
                                            <p className="text-sm text-primary">{trainer.specialty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Map Embed */}
                        <div className="rounded-xl overflow-hidden border border-border h-80 bg-secondary/20 relative">
                            {/* Embed placeholder - normally Google Maps iframe */}
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted/20">
                                <div className="text-center">
                                    <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                                    <p>Map Location Placeholder</p>
                                    <p className="text-xs text-muted-foreground mt-1">({branch.coordinates.lat}, {branch.coordinates.lng})</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Sticky Enquiry Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-card border border-border rounded-xl p-6 shadow-xl shadow-black/20">
                                <h3 className="font-heading text-2xl font-bold mb-2">Book a Free Visit</h3>
                                <p className="text-muted-foreground text-sm mb-6">Experience the best equipment and trainers at our {branch.name} branch.</p>

                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase text-muted-foreground">Full Name</label>
                                        <Input placeholder="John Doe" className="bg-secondary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase text-muted-foreground">Phone Number</label>
                                        <Input placeholder="+91 98765 43210" className="bg-secondary" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase text-muted-foreground">Message (Optional)</label>
                                        <Textarea placeholder="I'm interested in..." className="bg-secondary resize-none" rows={3} />
                                    </div>

                                    <Button onClick={() => navigate("/book-visit")} className="w-full bg-primary hover:bg-gym-red-light text-primary-foreground font-heading uppercase tracking-wider">
                                        Book Free Visit
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground mt-4">
                                        Or call us directly at <a href={`tel:${branch.phone}`} className="text-primary hover:underline font-bold">{branch.phone}</a>
                                    </p>
                                </form>
                            </div>

                            {/* Quick Info Card */}
                            <div className="mt-6 bg-secondary/30 rounded-xl p-6 border border-border">
                                <h4 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                                    <Clock size={18} className="text-primary" /> Operational Hours
                                </h4>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <p className="flex justify-between">
                                        <span>Today:</span>
                                        <span className="text-foreground font-medium">{branch.hours.includes("24x7") ? "Open 24 Hours" : "6:00 AM - 10:00 PM"}</span>
                                    </p>
                                    {/* Simplified schedule logic */}
                                    <p className="flex justify-between">
                                        <span>Weekends:</span>
                                        <span className="text-foreground font-medium">{branch.hours.includes("24x7") ? "Open 24 Hours" : "7:00 AM - 9:00 PM"}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BranchDetails;
