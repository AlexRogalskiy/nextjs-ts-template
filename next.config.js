// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['components', 'modules', 'pages', 'scenes'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};

module.exports = nextConfig
