/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  output: 'export',

  // distDir: 'build', // Specify the desired output folder name
}

module.exports = nextConfig
