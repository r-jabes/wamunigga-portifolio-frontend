import type { Transition, Variants } from "framer-motion";

/**
 * Reusable motion tokens for subtle, premium interactions.
 * Always pair with reduced-motion handling via MotionProvider / hooks.
 */
export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.35,
  slow: 0.55,
  cinematic: 0.8,
} as const;

export const ease = {
  /** Soft deceleration for reveals and fades */
  out: [0.16, 1, 0.3, 1] as const,
  /** Balanced enter/exit */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Slight editorial snap for micro-interactions */
  emphasis: [0.22, 1, 0.36, 1] as const,
} as const;

export const transition = {
  fast: {
    duration: duration.fast,
    ease: ease.out,
  } satisfies Transition,
  base: {
    duration: duration.base,
    ease: ease.out,
  } satisfies Transition,
  slow: {
    duration: duration.slow,
    ease: ease.out,
  } satisfies Transition,
  cinematic: {
    duration: duration.cinematic,
    ease: ease.out,
  } satisfies Transition,
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transition.base,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.base,
  },
};

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.slow,
  },
};

export const staggerChildren = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/** Default viewport trigger for scroll reveals */
export const revealViewport = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -8% 0px",
} as const;
