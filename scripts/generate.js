const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function main() {
  let changedFiles = [];

  try {
    const output = execSync(
      "git diff --name-only origin/main...HEAD"
    ).toString();

    changedFiles = output
      .split("\n")
      .filter((f) => f.startsWith("orders/") && f.endsWith(".json"));

    console.log("📂 Changed files:", changedFiles);
  } catch (err) {
    console.warn("⚠️  Gagal baca git diff");
  }

  if (changedFiles.length === 0) {
    console.log("⏭️  Tidak ada order JSON yang berubah. Skip build.");
    return;
  }

  const templatesBuilt = new Set();

  for (const file of changedFiles) {
    const fullPath = path.join(__dirname, "..", file);
    const order = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

    console.log(`🚀 Generate for: ${order.slug} (${order.templateId})`);

    switch (order.templateId) {
      case "nikahflix-react":
        await require("./adapters/nikahflix-react")(order);
        templatesBuilt.add("nikahflix-react");
        break;
      default:
        console.warn(`⚠️  Unknown templateId: ${order.templateId}`);
    }
  }

  fs.writeFileSync(".template-touched", [...templatesBuilt].join("\n"));
}

main();
