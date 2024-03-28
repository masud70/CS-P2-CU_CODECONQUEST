/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		backendUrl: "http://localhost:8000",
		tokenKey: "eco@token",
		gmapApi: "AIzaSyDYUDVcyIfjP-xMid-UAfMcwlqOBeii__I",
	},
	transpilePackages: ["@mui/x-charts"],
};

export default nextConfig;
