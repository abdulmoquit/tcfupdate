import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Arjun Banerjee", text: "TCF Gym changed my life! Lost 20kg in 6 months with their amazing trainers and structured programs.", rating: 5, branch: "Gariahat" },
  { name: "Ritika Sen", text: "The Zumba classes are incredible — fun, energetic, and the perfect way to stay fit. Love the community!", rating: 5, branch: "Park Circus" },
  { name: "Sourav Dey", text: "Best gym in Kolkata, hands down. Clean facilities, great equipment, and the trainers really care about your progress.", rating: 5, branch: "Naktala" },
  { name: "Meghna Roy", text: "Flexible timings and multi-branch access makes it so convenient. I've been a member for 3 years!", rating: 4, branch: "Bhowanipore" },
  { name: "Kunal Ghosh", text: "The CrossFit program is top-notch. Amit sir pushes you to your limits but always ensures safety.", rating: 5, branch: "Sarada Pally" },
  { name: "Pooja Agarwal", text: "Started as a complete beginner and now I can deadlift my bodyweight! The supportive environment is unmatched.", rating: 5, branch: "Gariahat" },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            WHAT OUR <span className="text-gradient-red">MEMBERS SAY</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-1 bg-gradient-red mx-auto mt-4 rounded"
          />
        </motion.div>

        <div
          className="grid md:grid-cols-3 gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials.slice(0, 3).map((t, i) => {
            const realIndex = (activeIndex + i) % testimonials.length;
            const item = testimonials[realIndex];
            return (
              <motion.div
                key={realIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 relative"
              >
                <Quote className="absolute top-4 right-4 text-primary/15" size={40} />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <Star key={s} size={14} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6 italic">
                  "{item.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-heading text-foreground font-semibold">{item.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{item.branch} Branch</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeIndex ? "bg-primary w-6" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
