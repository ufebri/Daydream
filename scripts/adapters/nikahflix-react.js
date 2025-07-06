const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = async function (order) {
  const templateDir = path.join(
    __dirname,
    "..",
    "..",
    "templates",
    "nikahflix-react"
  );
  const dataJsonPath = path.join(templateDir, "src", "data.json");

  fs.writeFileSync(dataJsonPath, JSON.stringify(order, null, 2));

  execSync("npm install", { cwd: templateDir, stdio: "inherit" });
  execSync("npm run build", { cwd: templateDir, stdio: "inherit" });

  const outputDir = path.join(
    __dirname,
    "..",
    "..",
    "output",
    "wedding",
    order.slug,
    "invite"
  );
  fs.mkdirSync(outputDir, { recursive: true });
  fs.cpSync(path.join(templateDir, "dist"), outputDir, { recursive: true });
};
