import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "node:path";
import fs from "fs";
import strip from "@rollup/plugin-strip";

const version = fs.readFileSync("./VERSION", "utf-8").trim();

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [
      react(),
      visualizer({
        filename: path.resolve(__dirname, "dist/stats.html"),
        template: "treemap",
        open: false,
      }),
      isProd &&
        strip({
          include: ["**/*.js", "**/*.ts", "**/*.vue", "**/*.jsx", "**/*.tsx"],
          functions: ["console.log", "console.debug", "assert.*", "alert"],
        }),
    ],
    define: {
      __VERSION__: JSON.stringify(version),
    },
    base: "./",
  };
});
