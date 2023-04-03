/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/public/myfile.html",
      destination: "/pages/api/myfile.js",
    },
  ],
}

module.exports = nextConfig
  output: 'standalone'
}
