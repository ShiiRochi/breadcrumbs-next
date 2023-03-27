/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
    entryPoints: ["./dist/index.d.ts"],
    plugin: ["typedoc-plugin-markdown", "typedoc-plugin-rename-defaults"],
    skipErrorChecking: true,
    out: "doc",
}
