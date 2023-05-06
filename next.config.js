/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/public/myfile.html",
      destination: "/pages/api/myfile.js",
    },
  ],
  output: 'standalone',
  images: {domains:["avatars.githubusercontent.com", "lh3.googleusercontent.com"], formats: ['image/avif', 'image/webp'],}
}