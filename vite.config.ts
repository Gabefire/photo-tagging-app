import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(() => {
  return {
    server: { https: true },
    build: {
      outDir: "build",
    },
    plugins: [react(), basicSsl()],
  };
});
