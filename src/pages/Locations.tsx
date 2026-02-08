import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, List, Map as MapIcon, Filter } from "lucide-react";
import { branches } from "@/data/branches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BranchCard from "@/components/BranchCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Locations = () => {
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const allFacilities = useMemo(() => {
        const facilities = new Set<string>();
        branches.forEach(b => b.facilities.forEach(f => facilities.add(f)));
        return Array.from(facilities);
    }, []);

    const filteredBranches = useMemo(() => {
        return branches.filter((branch) => {
            const matchesSearch =
                branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                branch.address.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilters =
                activeFilters.length === 0 ||
                activeFilters.every(f => branch.facilities.includes(f));

            return matchesSearch && matchesFilters;
        });
    }, [searchQuery, activeFilters]);

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            {/* Search Header */}
            <div className="pt-24 pb-8 sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <h1 className="font-heading text-3xl font-bold uppercase tracking-wide">
                            Find a <span className="text-primary">Gym</span> Near You
                        </h1>

                        <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg border border-border">
                            <button
                                onClick={() => setViewMode("list")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === "list"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <List size={16} /> List
                            </button>
                            <button
                                onClick={() => setViewMode("map")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === "map"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <MapIcon size={16} /> Map
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search by area, branch name..."
                                className="pl-10 bg-secondary border-border focus:border-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filter Chips - Horizontal Scroll on Mobile */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide mask-fade-right">
                            {["24x7", "Parking", "Steam Bath", "CrossFit", "Yoga"].map((filter) => (
                                <Badge
                                    key={filter}
                                    variant={activeFilters.includes(filter) ? "default" : "outline"}
                                    className="cursor-pointer whitespace-nowrap px-3 py-1.5"
                                    onClick={() => toggleFilter(filter)}
                                >
                                    {filter}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence mode="wait">
                    {viewMode === "list" ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredBranches.length > 0 ? (
                                filteredBranches.map((branch) => (
                                    <BranchCard key={branch.id} branch={branch} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center text-muted-foreground">
                                    <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                                    <p>No branches found matching your criteria.</p>
                                    <Button variant="link" onClick={() => { setSearchQuery(""); setActiveFilters([]) }}>
                                        Clear filters
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="map"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="h-[600px] bg-secondary/30 rounded-xl border border-border flex items-center justify-center relative overflow-hidden group"
                        >
                            {/* Interactive Mock Map - Visual Representation */}
                            <div className="absolute inset-0 bg-[#1a1a1a] opacity-50" style={{ backgroundImage: "radial-gradient(#333 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                            <div className="relative z-10 grid grid-cols-3 gap-12 p-12 w-full h-full pointer-events-none">
                                {/* Representing pins spatially - this is a stylized map view since we avoid heavy map libs */}
                                {filteredBranches.map((branch, i) => (
                                    <motion.div
                                        key={branch.id}
                                        className="pointer-events-auto absolute"
                                        style={{
                                            // Random/pseudo positioning for demo - in real app use lat/lng mapping
                                            top: `${20 + (i * 15) % 60}%`,
                                            left: `${20 + (i * 25) % 60}%`
                                        }}
                                        whileHover={{ scale: 1.2, zIndex: 50 }}
                                    >
                                        <div className="relative group/pin cursor-pointer">
                                            <MapPin className="text-primary fill-primary/20 drop-shadow-glow animate-bounce-slow" size={32} />

                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-popover border border-border rounded-lg p-2 w-48 shadow-xl opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                                                <p className="font-heading text-sm font-bold">{branch.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{branch.address}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                <div className="absolute bottom-6 right-6 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground">
                                    Interactive Map View (Stylized)
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Footer />
        </div>
    );
};

export default Locations;
