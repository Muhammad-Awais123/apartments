/**
 * Reusable Framer Motion animation variants and configurations
 * Designed for luxury, high-performance web applications:
 * - Uses only hardware-accelerated properties (transform, opacity)
 * - Restrained, fast durations (0.2s - 0.6s)
 * - Single-trigger scroll viewport reveals to avoid unnecessary layout work
 */

export const easeLuxury = [0.22, 1, 0.36, 1];
export const easeOutQuad = [0.25, 0.46, 0.45, 0.94];

// Default single-trigger scroll viewport setting
export const defaultViewport = {
  once: true,
  amount: 0.15,
};

// Subtle upward fade reveal
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeLuxury,
    },
  },
};

// Gentle pure opacity reveal
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeLuxury,
    },
  },
};

// Downward fade (useful for dropdowns, banners)
export const fadeDown = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeLuxury,
    },
  },
};

// Architectural scale-in for images and highlight cards
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: easeLuxury,
    },
  },
};

// Parent container coordinator for staggered child reveals
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Fast, non-blocking page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: easeLuxury,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// Interactive card hover micro-animation
export const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: {
      duration: 0.25,
      ease: easeOutQuad,
    },
  },
};

// Subtle button tap feedback
export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};
