const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = async function buildNikahflix(order) {
  const templateDir = path.join(
    __dirname,
    "..",
    "..",
    "templates",
    "nikahflix-react"
  );
  const outputDir = path.join(
    __dirname,
    "..",
    "..",
    "output",
    "wedding",
    order.slug,
    "invite"
  );

  const rootOutputDir = path.join(__dirname, "..", "..", "output");
  const rootIndex = path.join(rootOutputDir, "index.html");

  // ✅ 1. Inject ke src/data.json (bukan public)
  const dataJsonPath = path.join(templateDir, "src", "data.json");
  fs.writeFileSync(dataJsonPath, JSON.stringify(order, null, 2));
  console.log(`📦 Injected data for ${order.slug} → src/data.json`);

  // ✅ 2. Install + Build via Vite
  console.log(`📦 Installing dependencies for nikahflix-react`);
  execSync("npm ci", { cwd: templateDir, stdio: "inherit" });

  console.log(`🏗️  Building template nikahflix-react...`);
  execSync("npm run build", { cwd: templateDir, stdio: "inherit" });

  // ✅ 3. Copy hasil dist ke output/
  const distPath = path.join(templateDir, "dist");
  fs.mkdirSync(outputDir, { recursive: true });
  fs.cpSync(distPath, outputDir, { recursive: true });

  console.log(`✅ Build complete → /wedding/${order.slug}/invite/index.html`);

  // ✅ 4. Tambahkan index.html redirect ke undangan terakhir (jika belum ada)
  if (!fs.existsSync(rootIndex)) {
    const redirect = `/wedding/${order.slug}/invite/`;
    fs.writeFileSync(
      rootIndex,
      `<meta http-equiv="refresh" content="0; url=${redirect}" />`
    );
    console.log(`🧷 Created root index.html with redirect to ${redirect}`);
  }
};
