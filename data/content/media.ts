/**
 * Local photography — prefer smaller optimized formats where available.
 * Paths under /public/images/wamunigga.
 */

const ROOT = "/images/wamunigga";

export const wamuniggaMedia = {
  portraits: {
    hero: {
      src: `${ROOT}/portraits/wamunigga-hero-portrait.jpg`,
      alt: "Wamunigga standing for an editorial portrait",
    },
    fashion: {
      src: `${ROOT}/portraits/wamunigga-fashion-portrait.jpg`,
      alt: "Wamunigga in a fashion portrait",
    },
    fashionAlt: {
      src: `${ROOT}/portraits/wamunigga-fashion-portrait-1.png`,
      alt: "Wamunigga in a second fashion portrait",
    },
    portrait02: {
      src: `${ROOT}/portraits/wamunigga-portrait-02.jpg`,
      alt: "Close portrait of Wamunigga",
    },
  },
  work: {
    fade01: {
      src: `${ROOT}/work/work-fade-01.jpg`,
      alt: "Close-up of a clean fade completed at Wamunigga Cuts",
    },
    fade02: {
      src: `${ROOT}/work/work-fade-02.jpg`,
      alt: "Detailed fade and line work from the chair",
    },
    /** Still frame — colour work is primarily the local reel */
    color01: {
      src: `${ROOT}/work/work-color-01.png`,
      alt: "Colour work finished at Wamunigga Cuts",
    },
  },
  clients: {
    davido: {
      src: `${ROOT}/clients/client-davido.jpg`,
      alt: "Davido seated for a cut at Wamunigga Cuts",
    },
    jumaJux: {
      src: `${ROOT}/clients/client-juma-jux.jpg`,
      alt: "Juma Jux after a cut at Wamunigga Cuts",
    },
    jumaJuxAlt: {
      src: `${ROOT}/clients/client-juma-jux-1.png`,
      alt: "Juma Jux during a session at Wamunigga Cuts",
    },
    jumaJux02: {
      src: `${ROOT}/clients/client-juma-jux-02.jpg`,
      alt: "Juma Jux — second frame from the chair",
    },
    yveKimenyi: {
      src: `${ROOT}/clients/client-yve-kimenyi.jpg`,
      alt: "Yve Kimenyi after a cut at Wamunigga Cuts",
    },
    chrisEasy: {
      src: `${ROOT}/clients/client-chris-easy.webp`,
      alt: "Chris Easy after a cut at Wamunigga Cuts",
    },
    luckyman: {
      src: `${ROOT}/clients/client-luckyman.jpg`,
      alt: "Client cut completed at Wamunigga Cuts",
    },
    rugajuReagan: {
      src: `${ROOT}/clients/client-rugaju-reagan.jpg`,
      alt: "Rugaju Reagan after a cut at Wamunigga Cuts",
    },
  },
  shop: {
    workspace: {
      src: `${ROOT}/shop/shop-workspace.png`,
      alt: "Inside the Wamunigga Cuts workspace in Kigali",
    },
  },
  team: {
    fade01: {
      src: `${ROOT}/team/team-fade-01.webp`,
      alt: "Team barber completing a taper fade",
    },
  },
} as const;

export type WamuniggaMediaImage = {
  src: string;
  alt: string;
};
