import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, memo } from "react";
import { Dumbbell, Users, MapPin, Trophy } from "lucide-react";

const stats = [
  { icon: Users, value: 15000, suffix: "+", label: "Members" },
  { icon: MapPin, value: 6, suffix: "", label: "Branches" },
  { icon: Dumbbell, value: 50, suffix: "+", label: "Trainers" },
  { icon: Trophy, value: 10, suffix: "+", label: "Years" },
];

const Counter = memo(({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  );
});

Counter.displayName = "Counter";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg bg-secondary overflow-hidden border-2 border-primary/20">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary flex items-center justify-center">
                <Dumbbell className="text-primary/30" size={120} />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary rounded-lg" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-primary font-body text-sm uppercase tracking-widest">
              About TCF Gym
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              WHY CHOOSE <span className="text-gradient-red">TCF GYM?</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              The Calcutta Fitness Studio Plus (TCF) is Kolkata's premier fitness chain,
              offering world-class equipment, certified trainers, and a motivating
              environment across 6 locations. Whether you're a beginner or a seasoned
              athlete, TCF has the right program for you.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              From strength training and CrossFit to Zumba and yoga — our diverse
              programs, flexible memberships, and expert guidance ensure you achieve
              your fitness goals effectively.
            </p>
            <div className="w-16 h-1 bg-gradient-red rounded mb-8" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <Counter target={stat.value} suffix={stat.suffix} />
                    <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutSection);

