/**
 * Local photography paths under /public/images/wamunigga.
 * Filenames match assets on disk after normalization (.png).
 */

const ROOT = "/images/wamunigga";

export const wamuniggaMedia = {
  portraits: {
    hero: {
      src: `${ROOT}/portraits/wamunigga-hero-portrait.png`,
      alt: "Wamunigga standing for an editorial portrait",
    },
    fashion: {
      src: `${ROOT}/portraits/wamunigga-fashion-portrait.png`,
      alt: "Wamunigga in a fashion portrait",
    },
    fashionAlt: {
      src: `${ROOT}/portraits/wamunigga-fashion-portrait-1.png`,
      alt: "Wamunigga in a second fashion portrait",
    },
    portrait02: {
      src: `${ROOT}/portraits/wamunigga-portrait-02.png`,
      alt: "Close portrait of Wamunigga",
    },
  },
  work: {
    fade01: {
      src: `${ROOT}/work/work-fade-01.png`,
      alt: "Close-up of a clean fade completed at Wamunigga Cuts",
    },
    fade02: {
      src: `${ROOT}/work/work-fade-02.png`,
      alt: "Detailed fade and line work from the chair",
    },
    color01: {
      src: `${ROOT}/work/work-color-01.png`,
      alt: "Colour work finished at Wamunigga Cuts",
    },
  },
  clients: {
    davido: {
      src: `${ROOT}/clients/client-davido.png`,
      alt: "Davido seated for a cut at Wamunigga Cuts",
    },
    jumaJux: {
      src: `${ROOT}/clients/client-juma-jux.png`,
      alt: "Juma Jux after a cut at Wamunigga Cuts",
    },
    jumaJuxAlt: {
      src: `${ROOT}/clients/client-juma-jux-1.png`,
      alt: "Juma Jux during a session at Wamunigga Cuts",
    },
    yveKimenyi: {
      src: `${ROOT}/clients/client-yve-kimenyi.png`,
      alt: "Yve Kimenyi after a cut at Wamunigga Cuts",
    },
    chrisEasy: {
      src: `${ROOT}/clients/client-chris-easy.png`,
      alt: "Chris Easy after a cut at Wamunigga Cuts",
    },
    luckyman: {
      src: `${ROOT}/clients/client-luckyman.png`,
      alt: "Client cut completed at Wamunigga Cuts",
    },
    rugajuReagan: {
      src: `${ROOT}/clients/client-rugaju-reagan.png`,
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
      src: `${ROOT}/team/team-fade-01.png`,
      alt: "Team barber completing a taper fade",
    },
  },
} as const;

export type WamuniggaMediaImage = {
  src: string;
  alt: string;
};
