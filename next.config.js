// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  eslint: {
    dirs: ['components', 'modules', 'pages', 'scenes'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
