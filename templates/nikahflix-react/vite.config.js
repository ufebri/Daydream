import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import strip from "@rollup/plugin-strip";
import path from "path";

const version = fs.readFileSync("./VERSION", "utf-8").trim();

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [
      react(),
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
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // ⬅️ ini kunci
      },
    },
  };
});
