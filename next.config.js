/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['*'], // allow images from any domain
  },
  // distDir: 'build', // Specify the desired output folder name


}

module.exports = nextConfig
