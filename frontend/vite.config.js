import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const backendUrl = process.env.VITE_API_BACKEND || 'http://localhost:5000';
// https://vitejs.dev/config/
export default defineConfig({

	plugins: [react()],
	server: {
		// Get rid of the CORS error
		proxy: {
			"/api": backendUrl,
		},
	},
});
