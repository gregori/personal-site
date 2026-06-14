import type { Translation } from "./types";
import { en } from "./en";
import { pt } from "./pt";

export type { Translation };
export type Lang = "en" | "pt";
export const translations = { en, pt };
