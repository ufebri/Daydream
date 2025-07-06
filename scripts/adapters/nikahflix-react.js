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

  // 1. Inject order data ke data.json
  const dataJsonPath = path.join(templateDir, "src", "data.json");
  fs.writeFileSync(dataJsonPath, JSON.stringify(order, null, 2));
  console.log(`📦 Injected data for ${order.slug}`);

  // 2. Install dependencies & build
  console.log(`📦 Installing dependencies for nikahflix-react`);
  execSync("npm ci", { cwd: templateDir, stdio: "inherit" });

  console.log(`🏗️  Building template nikahflix-react...`);
  execSync("npm run build", { cwd: templateDir, stdio: "inherit" });

  // 3. Copy hasil build ke output/wedding/<slug>/invite
  const distPath = path.join(templateDir, "dist");
  fs.mkdirSync(outputDir, { recursive: true });
  fs.cpSync(distPath, outputDir, { recursive: true });

  console.log(`✅ Build complete → /wedding/${order.slug}/invite/index.html`);

  // 4. Pastikan output/index.html ada di root
  if (!fs.existsSync(rootIndex)) {
    // Redirect ke undangan terakhir yang dibangun
    const redirect = `/wedding/${order.slug}/invite/`;
    fs.writeFileSync(
      rootIndex,
      `<meta http-equiv="refresh" content="0; url=${redirect}" />`
    );
    console.log(`🧷 Created root index.html with redirect to ${redirect}`);
  }
};
