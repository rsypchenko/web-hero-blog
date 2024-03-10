// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Frontend Stack Lab";
export const SITE_DESCRIPTION =
  "Explore cutting-edge web development insights at Frontend Stack Lab! Our site offers comprehensive tutorials, expert advice on interview questions, and the latest trends in modern web development.";
export const TWITTER_HANDLE = "@RSypchenko";
export const MY_NAME = "FrontendStackLab";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
