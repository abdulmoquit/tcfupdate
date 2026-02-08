import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "₹1,999",
    period: "/month",
    features: ["Full Gym Access", "Group Classes", "Locker Facility", "1 Branch Access", "Fitness Assessment"],
    recommended: false,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "₹4,999",
    period: "/3 months",
    features: ["Full Gym Access", "All Group Classes", "Locker + Steam", "Multi-Branch Access", "Personal Trainer (2 sessions)", "Diet Consultation", "Priority Booking"],
    recommended: true,
  },
  {
    id: "annual",
    name: "Yearly",
    price: "₹14,999",
    period: "/year",
    features: ["Full Gym Access", "Unlimited Classes", "All Amenities", "All Branch Access", "Personal Trainer (monthly)", "Diet Plan", "Guest Passes (4)", "Merchandise Kit"],
    recommended: false,
  },
];

const PricingSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const handleChoosePlan = (planId: string) => {
    navigate(`/enroll?plan=${planId}`);
  };

  return (
    <section id="pricing" className="py-24 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm uppercase tracking-widest">
            Membership Plans
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            CHOOSE YOUR <span className="text-gradient-red">PLAN</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-24 h-1 bg-gradient-red mx-auto mt-4 rounded"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -12 }}
              className={`relative rounded-xl p-8 border transition-all ${plan.recommended
                  ? "bg-card border-primary glow-red scale-105"
                  : "bg-card border-border hover:border-primary/40"
                }`}
              data-cursor-hover
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground font-body text-xs uppercase tracking-wider rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="font-heading text-2xl font-semibold text-foreground uppercase">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="font-heading text-5xl font-bold text-primary">{plan.price}</span>
                <span className="font-body text-muted-foreground text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                    <Check size={16} className="text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleChoosePlan(plan.id)}
                className={`w-full py-3 rounded font-heading text-sm uppercase tracking-wider transition-all ${plan.recommended
                    ? "bg-primary text-primary-foreground hover:bg-gym-red-light glow-red-sm"
                    : "border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  }`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
