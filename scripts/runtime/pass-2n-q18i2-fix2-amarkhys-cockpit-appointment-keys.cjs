/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  if (!fs.existsSync(file)) return;

  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function main() {
  const file = p(
    "src",
    "components",
    "amarkhys",
    "dashboard",
    "AmarkhysPremiumCockpit.tsx"
  );

  backup(file, "q18i2-fix2-appointment-keys");

  let content = read(file);

  content = content.replace(
    `         const appointmentKey =
          String(
            appointment.id ??
            appointment.href ??
            appointment.title ??
            index
          ) + "-" + String(index);`,
    `         const appointmentKey =
          String(
            appointment.href ??
            appointment.title ??
            "appointment"
          ) + "-" + String(index);`
  );

  content = content.replaceAll(
    `key={appointment.title}`,
    `key={appointmentKey}`
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18I2_FIX2_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
}

main();