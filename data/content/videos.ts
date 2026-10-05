/**
 * Local video registry — files under /public/videos/local.
 * Prefer these over Instagram embeds. Pair with poster images from wamuniggaMedia.
 */

import { wamuniggaMedia } from "@/data/content/media";

const ROOT = "/videos/local";

export const localVideos = {
  shop: {
    id: "shop",
    src: `${ROOT}/shop_reel.mp4`,
    title: "The Chair — shop atmosphere",
    poster: wamuniggaMedia.shop.workspace.src,
    category: "shop" as const,
  },
  workColor: {
    id: "work-color",
    src: `${ROOT}/work-color-01_reel.mp4`,
    title: "Colour work",
    poster: wamuniggaMedia.work.color01.src,
    category: "craft" as const,
  },
  generalBenda: {
    id: "general-benda",
    src: `${ROOT}/general_benda_reel.mp4`,
    title: "General Benda — haircut",
    poster: wamuniggaMedia.work.fade01.src,
    category: "craft" as const,
  },
  bushali: {
    id: "bushali",
    src: `${ROOT}/bushali_reel.mp4`,
    title: "Bushali — haircut",
    poster: wamuniggaMedia.work.fade02.src,
    category: "craft" as const,
  },
  ezra: {
    id: "ezra",
    src: `${ROOT}/ezra_umujistoma_reel.mp4`,
    title: "Ezra Umujistoma — haircut",
    poster: wamuniggaMedia.clients.luckyman.src,
    category: "craft" as const,
  },
  employeeFade: {
    id: "employee-fade",
    src: `${ROOT}/employee_fade_reel.mp4`,
    title: "Team — taper fade",
    poster: wamuniggaMedia.team.fade01.src,
    category: "team" as const,
  },
  davido: {
    id: "davido",
    src: `${ROOT}/davido_reel.mp4`,
    title: "Davido — in the chair",
    poster: wamuniggaMedia.clients.davido.src,
    category: "credibility" as const,
  },
  kevinKade: {
    id: "kevin-kade",
    src: `${ROOT}/kevin_kade_reel.mp4`,
    title: "Kevin Kade — haircut",
    poster: wamuniggaMedia.clients.chrisEasy.src,
    category: "client" as const,
  },
  bruceTheFirst: {
    id: "bruce-the-first",
    src: `${ROOT}/bruce_the_first_reel.mp4`,
    title: "Bruce the First — haircut",
    poster: wamuniggaMedia.clients.rugajuReagan.src,
    category: "client" as const,
  },
} as const;

export type LocalVideo = (typeof localVideos)[keyof typeof localVideos];
export type LocalVideoKey = keyof typeof localVideos;

export const allLocalVideos = Object.values(localVideos);

export function getLocalVideo(key: LocalVideoKey): LocalVideo {
  return localVideos[key];
}
