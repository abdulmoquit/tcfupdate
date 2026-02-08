import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { branches } from "@/data/branches";

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    // Determine phone number based on route
    const getPhoneNumber = () => {
        // Check if we are on a specific branch page
        const branchSlug = location.pathname.split("/branches/")[1];
        if (branchSlug) {
            const branch = branches.find(b => b.slug === branchSlug);
            if (branch) return branch.phone.replace(/\D/g, ""); // Remove non-digits
        }
        // Default number (Head Office)
        return "919876543210";
    };

    const phoneNumber = getPhoneNumber();
    const message = encodeURIComponent("Hi, I'd like to book a free visit at your gym.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    useEffect(() => {
        // Show button after a short delay
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{
                        scale: 1.1,
                        y: -4,
                        boxShadow: "0 0 20px rgba(37, 211, 102, 0.6)" // WhatsApp green glow
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-8 left-8 z-50 p-3 bg-[#25D366] text-white rounded-full shadow-lg cursor-pointer flex items-center justify-center group"
                    aria-label="Chat with us on WhatsApp"
                >
                    <MessageCircle size={32} fill="white" className="group-hover:animate-wiggle" />

                    {/* Tooltip */}
                    <span className="absolute left-full ml-3 px-3 py-1 bg-black/80 text-white text-xs rounded-md ws-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Chat with us
                    </span>
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default WhatsAppButton;
