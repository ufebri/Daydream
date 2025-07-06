import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "node:path"; // ✅ ini penting
import fs from "fs";

const version = fs.readFileSync("./VERSION", "utf-8").trim();

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: path.resolve(__dirname, "dist/stats.html"),
      template: "treemap",
      open: false,
    }),
  ],
  define: {
    __VERSION__: JSON.stringify(version),
  },
  base: "./",
});
