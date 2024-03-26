/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		backendUrl: "http://localhost:8000",
        tokenKey: 'eco@token'
	},
};

export default nextConfig;
