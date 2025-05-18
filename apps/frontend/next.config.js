/** @type {import('next').NextConfig} */

const nextConfig = {
	transpilePackages: ["@repo/ui"], // важно для react-native
	webpack: (config) => {
		config.resolve.alias["react-native$"] = "react-native-web";
		return config;
	},
};

export default nextConfig;
