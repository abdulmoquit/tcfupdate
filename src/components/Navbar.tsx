import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  { label: "Tools", href: "/tools" },
  { label: "Membership", href: "/membership" },
  { label: "Programs", href: "/#programs" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const rafRef = useRef<number | null>(null);
  const location = useLocation();
  const { user } = useAuth();

  // Throttle scroll handler with RAF
  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true } as AddEventListenerOptions);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navBackground = scrolled || location.pathname !== "/" ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            THE <span className="text-primary">CALCUTTA</span> FITNESS
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`font-body text-sm uppercase tracking-wider transition-colors ${location.pathname === link.href ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* CTA / User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-secondary/50 p-1 pr-4 rounded-full border border-border cursor-pointer hover:bg-secondary transition-colors"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=ff1744&color=fff`} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Dashboard</span>
                </motion.div>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">
                  Login
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    to="/membership"
                    className="px-6 py-2.5 bg-primary text-primary-foreground font-heading text-sm uppercase tracking-wider rounded hover:bg-gym-red-light transition-colors glow-red-sm"
                  >
                    Join Now
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6 flex flex-col items-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`font-heading text-xl uppercase tracking-wider transition-colors ${location.pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 flex items-center gap-2 text-xl font-heading uppercase tracking-wider text-primary"
                >
                  <User size={24} /> My Dashboard
                </Link>
              ) : (
                <div className="flex flex-col items-center gap-4 w-full mt-4">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="font-heading text-lg uppercase tracking-wider text-muted-foreground hover:text-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/membership"
                    onClick={() => setIsOpen(false)}
                    className="px-8 py-3 bg-primary text-primary-foreground font-heading text-sm uppercase tracking-wider rounded w-full text-center"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

