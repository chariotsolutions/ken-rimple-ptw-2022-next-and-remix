const esbuild = require("esbuild");
const path = require("path");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

module.exports = ({ outputFormat = "mjs" }) => {
  esbuild
    .build({
      entryPoints: ["src/index.ts"],
      outdir: path.resolve(__dirname, "../dist"),
      outExtension: {
        ".js": `.${outputFormat}`,
      },
      bundle: true,
      // splitting: prod,
      // minify: prod,
      sourcemap: true,
      format: outputFormat === "mjs" ? "esm" : "cjs",
      target: "esnext",
      jsx: "transform",
      tsconfig: path.resolve(__dirname, "../tsconfig.json"),
      plugins: [nodeExternalsPlugin()],
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};
