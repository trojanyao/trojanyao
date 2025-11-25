/** @type {import('next').NextConfig} */
import AutoImport from 'unplugin-auto-import/webpack';

const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(
      AutoImport({
        imports: ['react'], // 可根据需要添加其他需要自动导入的模块
      })
    );
    // if (dev && !isServer) {
    //   config.devtool = 'source-map';
    // }
    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // productionBrowserSourceMaps: true,
};

export default nextConfig;
