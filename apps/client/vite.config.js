import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    allowedHosts: ["undividedly-spirited-luca.ngrok-free.dev"],
    proxy: {
      "/api": {
        target: "http://localhost:3000", // The address of the server
        changeOrigin: true,
      },
    },
  },
});
