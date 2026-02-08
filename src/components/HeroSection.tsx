import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const words = ["TRANSFORM", "YOUR", "BODY,", "TRANSFORM", "YOUR", "LIFE"];

const stats = [
  { value: "15K+", label: "Active Members" },
  { value: "6", label: "Branches" },
  { value: "50+", label: "Expert Trainers" },
  { value: "10+", label: "Years Legacy" },
];

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax BG */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary"
        style={{ y: bgY }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0_72%_51%/0.08),transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-primary font-body uppercase tracking-wider">
            Kolkata's #1 Fitness Chain
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className={`inline-block mr-3 ${word === "BODY," || word === "LIFE"
                  ? "text-gradient-red"
                  : "text-foreground"
                }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Join The Calcutta Fitness Studio Plus — expert trainers, world-class
          equipment, and 6 branches across Kolkata to power your fitness journey.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="px-8 py-4 bg-primary text-primary-foreground font-heading text-lg uppercase tracking-wider rounded hover:bg-gym-red-light transition-all glow-red"
          >
            Get Started
          </motion.a>
          <motion.a
            href="#programs"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="px-8 py-4 border border-border text-foreground font-heading text-lg uppercase tracking-wider rounded hover:border-primary hover:text-primary transition-all"
          >
            Explore Programs
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <div className="font-heading text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="font-body text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="mx-auto text-muted-foreground" size={28} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
