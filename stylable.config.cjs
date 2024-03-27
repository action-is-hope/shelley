// @ts-check
const { stcConfig } = require("@stylable/cli");
const { createNamespaceStrategy } = require("@stylable/core");

exports.stcConfig = stcConfig({
  options: {
    srcDir: "./src",
    outDir: "./st-types",
    dts: true,
  },
});

/**
 * Normalizes paths by ensuring they use a consistent separator and potentially
 * applying other transformations as needed.
 * @param {string} dirPath - The directory path.
 * @param {string} filePath - The file path relative to the directory.
 * @returns {string} - The normalized path.
 */
function normalizePath(dirPath, filePath) {
  // Example: Normalize path separators to forward slashes for consistency
  const normalizedDirPath = dirPath.replace(/\\/g, "/");
  const normalizedFilePath = filePath.replace(/\\/g, "/");

  // Combine and return the normalized path
  // This is a simplistic approach; adjust based on your specific needs
  return `${normalizedDirPath}/${normalizedFilePath}`;
}

module.exports.defaultConfig = (fs) => {
  return {
    // set a custom namespace resolver
    resolveNamespace: createNamespaceStrategy({
      strict: true,
      hashFragment: "minimal",
      normalizePath: normalizePath,
    }),
  };
};
