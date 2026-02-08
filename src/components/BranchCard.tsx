import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type BranchProps = {
    id: string;
    name: string;
    slug: string;
    address: string;
    hours: string;
    image: string;
    facilities: string[];
};

const BranchCard = ({ branch }: { branch: BranchProps }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-all cursor-pointer h-full flex flex-col"
            onClick={() => navigate(`/branches/${branch.slug}`)}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <h3 className="font-heading text-xl font-bold text-white">{branch.name}</h3>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="space-y-3 mb-4 flex-1">
                    <div className="flex items-start gap-2 text-muted-foreground text-sm">
                        <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                        <p className="line-clamp-2">{branch.address}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Clock size={16} className="shrink-0 text-primary" />
                        <p>{branch.hours}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {branch.facilities.slice(0, 3).map((facility) => (
                            <Badge key={facility} variant="secondary" className="text-xs font-normal">
                                {facility}
                            </Badge>
                        ))}
                        {branch.facilities.length > 3 && (
                            <Badge variant="outline" className="text-xs font-normal">
                                +{branch.facilities.length - 3} more
                            </Badge>
                        )}
                    </div>
                </div>

                <button
                    className="w-full py-2 flex items-center justify-center gap-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-medium text-sm mt-auto"
                >
                    View Details <ArrowRight size={14} />
                </button>
            </div>
        </motion.div>
    );
};

export default BranchCard;
