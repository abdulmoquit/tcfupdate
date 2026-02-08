import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const CTABanner = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-red opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,transparent_30%,hsl(0_0%_0%/0.4))]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto px-4 text-center"
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          START YOUR TRANSFORMATION TODAY
        </h2>
        <p className="font-body text-white/80 text-lg mb-10">
          Book a free visit to any of our 6 branches across Kolkata. No commitment required.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/book-visit")}
            className="px-16 py-4 bg-background text-foreground font-heading text-base uppercase tracking-wider rounded-lg hover:bg-secondary transition-all hover:scale-105 shadow-lg"
          >
            Book Free Visit
          </button>
        </div>

        <p className="font-body text-white/50 text-xs mt-6">
          Or call us at +91 98765 43210 • WhatsApp available
        </p>
      </motion.div>
    </section>
  );
};

export default CTABanner;
