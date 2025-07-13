const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const LOG_PATH = path.join(__dirname, "..", "logs", "build.log");
const ORDERS_PATH = path.join(__dirname, "..", "orders");

// 💡 Adapter map: templateId → handler
const adapters = {
  "nikahflix-react": require("./adapters/build-nikahflix"),
  // kamu bisa tambah lagi: "selaras-vue": require("./adapters/build-selaras"),
};

function getArgs() {
  const args = process.argv.slice(2);
  const slugIndex = args.indexOf("--slug");
  const onlyNew = args.includes("--only-new");

  return {
    slug: slugIndex !== -1 ? args[slugIndex + 1] : null,
    onlyNew,
  };
}

function isAlreadyBuilt(slug) {
  if (!fs.existsSync(LOG_PATH)) return false;
  const log = fs.readFileSync(LOG_PATH, "utf-8");
  return log.includes(`${slug} ✅`);
}

function appendToBuildLog(slug) {
  const dir = path.dirname(LOG_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const line = `${slug} ✅ ${new Date().toISOString()}\n`;
  fs.appendFileSync(LOG_PATH, line);
}

// 🚀 Entry Point
async function main() {
  const { slug, onlyNew } = getArgs();
  const templatesBuilt = new Set();
  const buildTargets = [];

  if (slug) {
    const file = path.join(ORDERS_PATH, `${slug}.json`);
    if (!fs.existsSync(file)) {
      console.error(`❌ File order tidak ditemukan: ${file}`);
      return;
    }

    if (!onlyNew || !isAlreadyBuilt(slug)) {
      buildTargets.push(file);
    } else {
      console.log(`⏭️  Sudah dibuild: ${slug}, skip.`);
    }
  } else {
    try {
      const output = execSync(
        "git diff --name-only origin/master...HEAD"
      ).toString();
      const changedFiles = output
        .split("\n")
        .filter((f) => f.startsWith("orders/") && f.endsWith(".json"));

      console.log("📂 Order yang berubah:", changedFiles);

      for (const file of changedFiles) {
        const fullPath = path.join(__dirname, "..", file);
        if (!fs.existsSync(fullPath)) {
          console.warn(`⚠️  File hilang: ${file} — skip.`);
          continue;
        }

        const order = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
        if (onlyNew && isAlreadyBuilt(order.slug)) {
          console.log(`⏭️  Sudah dibuild: ${order.slug}, skip.`);
          continue;
        }

        buildTargets.push(fullPath);
      }

      if (buildTargets.length === 0) {
        console.log("✅ Tidak ada order baru untuk dibuild.");
        return;
      }
    } catch (err) {
      console.warn("⚠️  Gagal baca git diff:", err.message);
      return;
    }
  }

  // 🧪 Build semua order target
  for (const file of buildTargets) {
    const order = JSON.parse(fs.readFileSync(file, "utf-8"));
    const { slug, templateId } = order;

    console.log(`🚀 Build: ${slug} (${templateId})`);

    const adapter = adapters[templateId];
    if (!adapter) {
      console.warn(`⚠️  Unknown templateId: ${templateId}`);
      continue;
    }

    try {
      await adapter(order);
      templatesBuilt.add(templateId);
      appendToBuildLog(slug);
    } catch (err) {
      console.error(`❌ Gagal build ${slug}:`, err.message);
    }
  }

  // Tulis file .template-touched (untuk cache invalidation Netlify, dll)
  fs.writeFileSync(".template-touched", [...templatesBuilt].join("\n"));
}

main();
