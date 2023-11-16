import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		// Get rid of the CORS error
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	build: {
		target: "esnext", // or "esnext" if your environment supports it
		polyfillDynamicImport: false, // disable dynamic import polyfill
	},
});
// https://threads-backend-kzv5.onrender.com