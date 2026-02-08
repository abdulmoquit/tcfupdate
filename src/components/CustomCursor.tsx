import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rafRef = useRef<number>();

  const springConfig = { damping: 25, stiffness: 400 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Throttle cursor movement with RAF for better performance
  const moveCursor = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    });
  }, [cursorX, cursorY]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("[data-cursor-hover]") ||
      target.tagName === "BUTTON" ||
      target.tagName === "A"
    ) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    // Use passive listeners for better scroll performance
    window.addEventListener("mousemove", moveCursor, { passive: true } as AddEventListenerOptions);
    window.addEventListener("mouseover", handleMouseOver, { passive: true } as AddEventListenerOptions);
    window.addEventListener("mouseout", handleMouseOut, { passive: true } as AddEventListenerOptions);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [moveCursor, handleMouseOver, handleMouseOut]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          className="rounded-full bg-primary"
          animate={{
            width: isHovering ? 48 : 16,
            height: isHovering ? 48 : 16,
            x: isHovering ? -24 : -8,
            y: isHovering ? -24 : -8,
            opacity: 0.8,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="rounded-full border border-primary/40"
          animate={{
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
            x: isHovering ? -32 : -16,
            y: isHovering ? -32 : -16,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
        />
      </motion.div>
      <style>{`* { cursor: none !important; } @media (pointer: coarse) { * { cursor: auto !important; } }`}</style>
    </>
  );
};

export default CustomCursor;

