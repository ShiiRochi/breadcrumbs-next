/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
    tsconfig: "./tsconfig.json",
    entryPoints: ["./src/index.ts"],
    plugin: ["typedoc-plugin-markdown", "typedoc-plugin-rename-defaults"],
    skipErrorChecking: true,
    out: "doc",
}
