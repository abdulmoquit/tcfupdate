import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Instagram, Award } from "lucide-react";

const trainers = [
  { name: "Rahul Sharma", spec: "Strength & Conditioning", exp: "8 Years", branch: "Gariahat", top: true },
  { name: "Priya Das", spec: "Yoga & Flexibility", exp: "6 Years", branch: "Park Circus", top: false },
  { name: "Amit Roy", spec: "CrossFit Coach", exp: "5 Years", branch: "Naktala", top: true },
  { name: "Sneha Mukherjee", spec: "Zumba & Cardio", exp: "4 Years", branch: "Bhowanipore", top: false },
  { name: "Vikram Singh", spec: "Kickboxing & HIIT", exp: "7 Years", branch: "Sarada Pally", top: false },
  { name: "Ananya Ghosh", spec: "Personal Training", exp: "5 Years", branch: "Gariahat", top: true },
];

const TrainersSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trainers" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm uppercase tracking-widest">
            Meet The Team
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            OUR EXPERT <span className="text-gradient-red">TRAINERS</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-1 bg-gradient-red mx-auto mt-4 rounded"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{
                y: -12,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
              data-cursor-hover
            >
              {/* Avatar placeholder */}
              <div className="h-56 bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
                <span className="font-heading text-5xl text-muted-foreground/30 uppercase">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </span>
                {t.top && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-body rounded-full glow-red-sm">
                    <Award size={12} />
                    Top Trainer
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-heading text-xl font-semibold text-foreground">{t.name}</h3>
                <p className="font-body text-sm text-primary mt-1">{t.spec}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-body text-xs text-muted-foreground">{t.exp} Experience</span>
                  <span className="font-body text-xs text-muted-foreground">{t.branch}</span>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={12} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <div className="ml-auto">
                    <Instagram size={16} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
