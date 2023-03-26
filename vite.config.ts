import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "vite-plugin-node-stdlib-browser";
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(), svgr()],
  optimizeDeps: {
    exclude: ["@ethersproject/hash", "wrtc", "three-em-0-3-21"],
    include: ["js-sha3", "@ethersproject/bignumber"],
  },
});
