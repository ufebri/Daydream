const { execSync } = require("child_process");

const slug = process.argv[2];

if (!slug) {
  console.error(
    "❌ Harus kasih slug pengantin. Contoh: node build-order.js agus-wati"
  );
  process.exit(1);
}

try {
  // 🚧 Step 1: Build order tertentu (manual)
  console.log(`🚀 Build untuk order: ${slug}`);
  execSync(`node scripts/generate.js --slug ${slug}`, { stdio: "inherit" });

  // 🌐 Step 2: Deploy folder hasil build ke Netlify (per order)
  const outputPath = `output/wedding/${slug}`;
  console.log(`🌍 Deploy ke Netlify: ${outputPath}`);
  execSync(`netlify deploy --dir=${outputPath} --prod`, { stdio: "inherit" });

  console.log(`✅ Sukses deploy order: ${slug}`);
} catch (err) {
  console.error(`❌ Gagal build atau deploy untuk: ${slug}`);
  console.error(err.message);
  process.exit(1);
}
