import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js — dynamic import in pointSamplers means it auto-splits.
          // Explicitly name it so it's a stable cached filename.
          if (id.includes("node_modules/three"))            return "vendor-three";
          if (id.includes("node_modules/framer-motion"))    return "vendor-framer";
          if (id.includes("node_modules/gsap"))             return "vendor-gsap";
          if (id.includes("node_modules/react-router-dom")) return "vendor-router";
          if (id.includes("node_modules/react-dom"))        return "vendor-react";
          if (id.includes("src/components/Navbar") ||
              id.includes("src/components/Footer") ||
              id.includes("src/components/AnimatedGridPattern")) return "shared-layout";
          if (id.includes("src/components/ParticleSplitSection") ||
              id.includes("src/lib/pointSamplers"))              return "particles";
        },
      },
    },
  },
});
