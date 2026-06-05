const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const targetRel = "scripts/runtime/q2i-g0-c-seed-atelier-invoice-demo.cjs";
const target = path.join(ROOT, targetRel);

if (!fs.existsSync(target)) {
  throw new Error("File not found: " + targetRel);
}

const original = fs.readFileSync(target, "utf8");
fs.writeFileSync(target + ".bak-q2i-g0-c2-undefined-values", original, "utf8");

let next = original;

const helper = `
function removeUndefinedValues(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => removeUndefinedValues(item))
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    const cleaned = {};

    for (const [key, item] of Object.entries(value)) {
      const cleanedValue = removeUndefinedValues(item);

      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue;
      }
    }

    return cleaned;
  }

  if (value === undefined) {
    return undefined;
  }

  return value;
}

`;

if (!next.includes("function removeUndefinedValues(")) {
  const anchor = "function getRecordId(record) {";

  if (!next.includes(anchor)) {
    throw new Error("Anchor not found: " + anchor);
  }

  next = next.replace(anchor, helper + anchor);
  console.log("[ADDED] removeUndefinedValues helper");
} else {
  console.log("[SKIP] removeUndefinedValues helper already exists");
}

const oldSet = `    batch.set(db.collection(collection).doc(id), payload, { merge: false });`;

const newSet = `    batch.set(db.collection(collection).doc(id), removeUndefinedValues(payload), { merge: false });`;

if (!next.includes(newSet)) {
  if (!next.includes(oldSet)) {
    throw new Error("batch.set anchor not found.");
  }

  next = next.replace(oldSet, newSet);
  console.log("[UPDATED] batch.set now removes undefined values");
} else {
  console.log("[SKIP] batch.set already cleans undefined values");
}

if (!next.includes("removeUndefinedValues(payload)")) {
  throw new Error("Payload cleaning was not wired.");
}

fs.writeFileSync(target, next, "utf8");

console.log("[DONE] Q2-I-G0-C2 undefined Firestore values fixed.");
console.log("[WRITTEN]", targetRel);
