/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  env: {
    PAYMASTER_ADDRESS: process.env.PAYMASTER_ADDRESS,
    COUNTER_ADDRESS: process.env.COUNTER_ADDRESS,
  },
};

module.exports = nextConfig;
