import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 4000,
		// Get rid of the CORS error
		proxy: {
			"/api": 'https://threads-backend-kzv5.onrender.com',
		},
	},
});
// https://threads-backend-kzv5.onrender.com