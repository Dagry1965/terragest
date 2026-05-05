const eslintConfig = [
  {
    ignores: [
      "backups/**",
      "coverage/**",
      "experimental/**",
      "reports/**",
      "scripts/**",
      ".next/**",
      "node_modules/**",
      "dist/**",
      "out/**"
    ],
  },

  // garde ici le reste de ta config existante
];

export default eslintConfig;