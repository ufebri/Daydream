import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

const version = fs.readFileSync("./VERSION", "utf-8").trim();

export default defineConfig({
  plugins: [react()],
  define: {
    __VERSION__: JSON.stringify(version), // 👈 define global constant
  },
  base: "./", // pastikan ini ada untuk static export
});
