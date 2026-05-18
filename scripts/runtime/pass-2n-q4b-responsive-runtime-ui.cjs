const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(filePath) {
  return path.join(root, filePath);
}

function read(filePath) {
  return fs.readFileSync(file(filePath), "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(file(filePath), content, "utf8");
  console.log("UPDATED", filePath);
}

function patch(filePath, updater) {
  if (!fs.existsSync(file(filePath))) {
    console.log("SKIP missing", filePath);
    return;
  }

  const before = read(filePath);
  const after = updater(before);

  if (before !== after) {
    write(filePath, after);
  } else {
    console.log("NO CHANGE", filePath);
  }
}

/**
 * PASS 2N-Q4B
 * Responsive polish AMARKHYS runtime UI.
 */

/**
 * 1. GenericListPage : header responsive + spacing propre.
 */
patch("src/components/erp/generic/GenericListPage.tsx", (content) => {
  let next = content;

  next = next
    .replaceAll(
      "flex items-center justify-between",
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    )
    .replaceAll(
      "px-8 py-8",
      "px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
    )
    .replaceAll(
      "p-8",
      "p-4 sm:p-6 lg:p-8"
    )
    .replaceAll(
      "gap-8",
      "gap-4 sm:gap-6 lg:gap-8"
    )
    .replaceAll(
      "text-2xl",
      "text-xl sm:text-2xl"
    )
    .replaceAll(
      "rounded-3xl",
      "rounded-2xl sm:rounded-3xl"
    );

  return next;
});

/**
 * 2. ERPRuntimePage : layout responsive global.
 */
patch("src/components/erp/runtime/ERPRuntimePage.tsx", (content) => {
  let next = content;

  next = next
    .replaceAll(
      "px-8 py-8",
      "px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
    )
    .replaceAll(
      "p-8",
      "p-4 sm:p-6 lg:p-8"
    )
    .replaceAll(
      "grid grid-cols-",
      "grid grid-cols-1 lg:grid-cols-"
    )
    .replaceAll(
      "flex items-center justify-between",
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    );

  return next;
});

/**
 * 3. ERPRuntimeTable : scroll horizontal propre + table premium.
 */
patch("src/components/erp/runtime/ERPRuntimeTable.tsx", (content) => {
  let next = content;

  /**
   * Conteneur table responsive.
   */
  if (!next.includes("overflow-x-auto")) {
    next = next.replace(
      /<table/g,
      `<div className="w-full overflow-x-auto rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)]">
        <table`
    );

    next = next.replace(
      /<\/table>/,
      `</table>
      </div>`
    );
  }

  next = next
    .replaceAll(
      "min-w-full",
      "min-w-[900px] w-full"
    )
    .replaceAll(
      "px-6 py-4",
      "px-4 py-3 sm:px-6 sm:py-4"
    )
    .replaceAll(
      "px-6 py-3",
      "px-4 py-3 sm:px-6"
    )
    .replaceAll(
      "text-xs",
      "text-[11px] sm:text-xs"
    )
    .replaceAll(
      "text-sm",
      "text-xs sm:text-sm"
    )
    .replaceAll(
      "rounded-3xl",
      "rounded-2xl sm:rounded-3xl"
    )
    .replaceAll(
      "p-6",
      "p-4 sm:p-6"
    );

  /**
   * Recherche responsive.
   */
  next = next
    .replaceAll(
      "w-full rounded-2xl",
      "w-full rounded-2xl"
    )
    .replaceAll(
      "h-12",
      "h-11 sm:h-12"
    );

  /**
   * Pagination responsive.
   */
  next = next.replaceAll(
    "flex items-center justify-between",
    "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  );

  return next;
});

/**
 * 4. ERPEnterpriseForm : responsive forms.
 */
patch("src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx", (content) => {
  let next = content;

  next = next
    .replaceAll(
      "p-4\n          shadow",
      "p-3 sm:p-4 lg:p-6\n          shadow"
    )
    .replaceAll(
      "space-y-8",
      "space-y-5 sm:space-y-6 lg:space-y-8"
    )
    .replaceAll(
      "grid-cols-12",
      "grid-cols-1 sm:grid-cols-12"
    )
    .replaceAll(
      "gap-6",
      "gap-4 sm:gap-5 lg:gap-6"
    )
    .replaceAll(
      "rounded-[2rem]",
      "rounded-2xl sm:rounded-[2rem]"
    )
    .replaceAll(
      "rounded-3xl",
      "rounded-2xl sm:rounded-3xl"
    );

  return next;
});

/**
 * 5. ERPFormSection : padding/spacing responsive.
 */
patch("src/components/erp/forms/enterprise/ERPFormSection.tsx", (content) => {
  let next = content;

  next = next
    .replaceAll(
      "p-6",
      "p-4 sm:p-5 lg:p-6"
    )
    .replaceAll(
      "gap-6",
      "gap-4 sm:gap-5 lg:gap-6"
    )
    .replaceAll(
      "grid-cols-12",
      "grid-cols-1 sm:grid-cols-12"
    )
    .replaceAll(
      "rounded-3xl",
      "rounded-2xl sm:rounded-3xl"
    );

  return next;
});

/**
 * 6. ERPFormField : champs tactiles et mobile-friendly.
 */
patch("src/components/erp/forms/enterprise/ERPFormField.tsx", (content) => {
  let next = content;

  next = next
    .replaceAll(
      "py-2.5",
      "py-2.5 sm:py-3"
    )
    .replaceAll(
      "px-4",
      "px-3 sm:px-4"
    )
    .replaceAll(
      "text-sm",
      "text-sm"
    )
    .replaceAll(
      "rounded-xl",
      "rounded-xl"
    );

  return next;
});

/**
 * 7. ERPFormTabs : tabs scrollables sur mobile.
 */
patch("src/components/erp/forms/enterprise/ERPFormTabs.tsx", (content) => {
  let next = content;

  if (!next.includes("overflow-x-auto")) {
    next = next.replaceAll(
      "flex gap-",
      "flex overflow-x-auto gap-"
    );
  }

  next = next
    .replaceAll(
      "px-4 py-3",
      "px-3 py-2.5 sm:px-4 sm:py-3"
    )
    .replaceAll(
      "text-sm",
      "text-xs sm:text-sm"
    );

  return next;
});

console.log("PASS 2N-Q4B OK: responsive runtime UI polished.");