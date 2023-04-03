/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/public/myfile.html",
      destination: "/pages/api/myfile.js",
    },
  ],
  output: 'standalone'
}