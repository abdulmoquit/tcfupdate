import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Zap, Heart, Wind, Swords, Timer, Dumbbell } from "lucide-react";

const programs = [
  { name: "Strength Training", desc: "Build muscle, increase power, and sculpt your physique with progressive resistance training.", icon: Dumbbell, difficulty: "All Levels", calories: "400-600" },
  { name: "CrossFit", desc: "High-intensity functional movements that push your limits and build total-body fitness.", icon: Zap, difficulty: "Intermediate", calories: "500-800" },
  { name: "Zumba", desc: "Dance your way to fitness with energetic Latin-inspired choreography and music.", icon: Heart, difficulty: "Beginner", calories: "300-500" },
  { name: "Yoga", desc: "Improve flexibility, balance, and mental clarity through traditional and modern yoga practices.", icon: Wind, difficulty: "All Levels", calories: "200-400" },
  { name: "HIIT", desc: "Burn maximum calories in minimum time with high-intensity interval training sessions.", icon: Flame, difficulty: "Advanced", calories: "600-900" },
  { name: "Kickboxing", desc: "Combine martial arts techniques with cardio for an explosive full-body workout.", icon: Swords, difficulty: "Intermediate", calories: "500-700" },
  { name: "Cardio Zone", desc: "State-of-the-art treadmills, cycles, and ellipticals for your cardiovascular health.", icon: Timer, difficulty: "All Levels", calories: "300-600" },
];

const ProgramsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programs" className="py-24 bg-secondary/30 relative">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm uppercase tracking-widest">
            Our Programs
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            FIND YOUR <span className="text-gradient-red">PERFECT FIT</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-1 bg-gradient-red mx-auto mt-4 rounded"
          />
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              whileHover={{
                scale: 1.03,
                y: -12,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
              data-cursor-hover
            >
              {/* Icon header */}
              <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary flex items-center justify-center group-hover:from-primary/20 transition-all">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <prog.icon className="text-primary/40 group-hover:text-primary/70 transition-colors" size={56} />
                </motion.div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-xl font-semibold text-foreground uppercase">
                    {prog.name}
                  </h3>
                </div>
                <span className="inline-block px-2 py-0.5 text-xs font-body text-primary bg-primary/10 rounded-full mb-3">
                  {prog.difficulty}
                </span>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                  {prog.desc}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Flame size={12} className="text-primary" />
                  <span>{prog.calories} cal/session</span>
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
