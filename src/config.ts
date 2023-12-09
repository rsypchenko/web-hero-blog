// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Web Hero";
export const SITE_DESCRIPTION =
  "Welcome to Web Hero Blog! I write about modern web development. Interview questions, tutorials, and more.";
export const TWITTER_HANDLE = "@RSypchenko";
export const MY_NAME = "Web Hero";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
