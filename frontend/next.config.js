/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_BACK: "http://localhost:8080",
  },
};

module.exports = nextConfig;
