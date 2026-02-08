import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, Car, Droplets } from "lucide-react";

const branches = [
  { name: "Gariahat", address: "42, Gariahat Road, Kolkata - 700029", phone: "+91 98765 43210", hours: "5 AM - 11 PM", features: ["24x7", "Parking", "Steam"] },
  { name: "Naktala", address: "15, Naktala Main Road, Kolkata - 700047", phone: "+91 98765 43211", hours: "6 AM - 10 PM", features: ["Parking", "Cross-Training"] },
  { name: "Park Circus", address: "78, Park Circus, Kolkata - 700017", phone: "+91 98765 43212", hours: "5 AM - 11 PM", features: ["24x7", "Steam", "Sauna"] },
  { name: "Bhowanipore", address: "23, Bhowanipore, Kolkata - 700025", phone: "+91 98765 43213", hours: "6 AM - 10 PM", features: ["Parking"] },
  { name: "Sarada Pally", address: "56, Sarada Pally, Kolkata - 700099", phone: "+91 98765 43214", hours: "5:30 AM - 10:30 PM", features: ["Cross-Training", "Parking"] },
  { name: "Tollygunge", address: "89, Tollygunge, Kolkata - 700033", phone: "+91 98765 43215", hours: "6 AM - 10 PM", features: ["Steam", "Parking"] },
];

const featureIcon = (f: string) => {
  if (f.includes("Parking")) return <Car size={12} />;
  if (f.includes("Steam") || f.includes("Sauna")) return <Droplets size={12} />;
  return <Clock size={12} />;
};

const BranchesPreview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm uppercase tracking-widest">Locations</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            OUR <span className="text-gradient-red">BRANCHES</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-1 bg-gradient-red mx-auto mt-4 rounded"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -8 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
              data-cursor-hover
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-primary" />
                <h3 className="font-heading text-xl font-semibold text-foreground">{b.name}</h3>
              </div>
              <p className="font-body text-sm text-muted-foreground mb-2">{b.address}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Clock size={12} className="text-primary" /> {b.hours}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Phone size={12} className="text-primary" /> {b.phone}
              </div>
              <div className="flex flex-wrap gap-2">
                {b.features.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                    {featureIcon(f)} {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchesPreview;
