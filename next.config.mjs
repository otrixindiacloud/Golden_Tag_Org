import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	outputFileTracingRoot: path.join(__dirname),
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
       images: {
	       remotePatterns: [
		       {
			       protocol: 'https',
			       hostname: 'fakestoreapi.com',
			       port: '',
			       pathname: '/img/**',
		       },
		       {
			       protocol: 'https',
			       hostname: 'cdn.dummyjson.com',
			       port: '',
			       pathname: '/product-images/**',
		       },
	       ],
       },
	webpack: (config, { isServer }) => {
		// Fix for chunk loading issues
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				net: false,
				tls: false,
			};
		}
		return config;
	},
	experimental: {
		// Enable modern bundling
		esmExternals: true,
	},
};

export default nextConfig;
