import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xincoqxttanzbwzrdvfq.supabase.co',
      },
    ],
  },
};

export default nextConfig;
