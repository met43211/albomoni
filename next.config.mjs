/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ansaratracker.store/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'downloader.disk.yandex.ru',
        port: '',
        pathname: '/preview/**',
      },
    ],
  },
};

export default nextConfig;
