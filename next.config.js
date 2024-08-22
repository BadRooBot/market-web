/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  output: 'export',

  // distDir: 'build', // Specify the desired output folder name
  output: 'out',


}

module.exports = nextConfig
