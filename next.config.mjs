/** @type {import('next').NextConfig} */
import AutoImport from 'unplugin-auto-import/webpack';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  webpack: (config) => {
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
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    unoptimized: true, // Disable image optimization to save Vercel costs
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
  // Disable/avoid Next.js legacy polyfills for modern browsers.
  // This is a Turbopack-only workaround for Lighthouse "Legacy JavaScript".
  transpilePackages: ['next'],
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './lib/modern-polyfill.js',
      'next/dist/build/polyfills/polyfill-module': './lib/modern-polyfill.js',
    },
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
