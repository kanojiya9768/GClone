/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    SEARCH_KEY: process.env.SEARCH_KEY,
    PIXABAY_API_KEY: process.env.PIXABAY_API_KEY,
    PIXABAY_SEARCH_IMAGE_BASE_URL: process.env.PIXABAY_SEARCH_IMAGE_BASE_URL,
    PIXABAY_SEARCH_VIDEO_BASE_URL: process.env.PIXABAY_SEARCH_VIDEO_BASE_URL,
    NEWS_API_KEY : process.env.NEWS_API_KEY,
    NEWS_API_BASE_URL : process.env.NEWS_API_BASE_URL,
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET : process.env.CLIENT_SECRET
  },
};

module.exports = nextConfig;
