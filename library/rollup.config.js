import babel from "rollup-plugin-babel";
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import external from "rollup-plugin-peer-deps-external";

import packageJSON from "./package.json";
const input = "./src/index.js";

export default [
  // CommonJS
  {
    input,
    output: {
      file: packageJSON.main,
      format: "es"
    },
    plugins: [
      external(),
      babel({
        exclude: "node_modules/**"
      }),
      nodeResolve(),
      commonjs()
    ]
  }
];
