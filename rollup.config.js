import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";

export default [
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
