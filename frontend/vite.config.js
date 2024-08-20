import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const backendUrl = 'http://localhost:5000' || process.env.VITE_API_BACKEND
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
