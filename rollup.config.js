const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs").default;
const typescript = require("@rollup/plugin-typescript").default;
const terser = require("@rollup/plugin-terser").default;
const dts = require("rollup-plugin-dts").default;
const external = require("rollup-plugin-peer-deps-external");

module.exports = [
    {
        input: "src/index.tsx",
        output: [
            {
                file: "dist/index.cjs.js",
                format: "cjs",
                sourcemap: true,
                name: "next-breadcrumbs"
            },
            {
                file: "dist/index.esm.js",
                format: "esm",
                sourcemap: true
            },
        ],
        plugins: [
            external(),
            resolve(),
            commonjs({
                include: "node_modules/**"
            }),
            typescript({
                tsconfig: "./tsconfig.json"
            }),
            terser()
        ],
    },
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        external: [/\.css$/],
        plugins: [dts({
            tsconfig: "./tsconfig.json"
        })]
    }
];
