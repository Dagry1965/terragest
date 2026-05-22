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

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.replace(from, to);
}

function main() {
  const file = p(
    "src",
    "components",
    "amarkhys",
    "dashboard",
    "AmarkhysPremiumCockpit.tsx"
  );

  backup(file, "q18i2-fix-appointment-keys");

  let content = read(file);

  content = replaceOnce(
    content,
    `.map((appointment) => {`,
    `.map((appointment, index) => {`,
    "add index to appointment map"
  );

  if (!content.includes("const appointmentKey =")) {
    content = replaceOnce(
      content,
      `         const content = (`,
      `         const appointmentKey =
          String(
            appointment.id ??
            appointment.href ??
            appointment.title ??
            index
          ) + "-" + String(index);

         const content = (`,
      "add stable appointment key"
    );
  }

  content = content.replaceAll(
    `key={appointment.title}`,
    `key={appointmentKey}`
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18I2_FIX_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
}

main();