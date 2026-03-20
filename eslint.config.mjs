import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores([
        "components/ui",
        "node_modules",
        ".pnp",
        "**/.pnp.js",
        "coverage",
        ".next/",
        "out/",
        "build",
        "**/.DS_Store",
        "**/*.pem",
        "**/npm-debug.log*",
        "**/yarn-debug.log*",
        "**/yarn-error.log*",
        "**/.pnpm-debug.log*",
        "**/.env*.local",
        "**/.vercel",
        "**/*.tsbuildinfo",
        "**/next-env.d.ts",
        "**/node_modules",
        "**/public",
        "**/build",
        "**/dist",
        "**/.cache",
        "**/package-lock.json",
        "**/next.config.ts",
    ]),
    ...compat.extends("xo"),
    ...compat.extends("plugin:tailwindcss/recommended"),
    ...nextCoreWebVitals,
    ...compat.extends("prettier"),
    {
        rules: {
            "react/jsx-curly-brace-presence": "off",
            "react/jsx-no-useless-fragment": "off",
            "new-cap": "off",
            camelcase: "off",
            "no-warning-comments": "off",
            "capitalized-comments": "off",
            "spaced-comment": "off",
            "no-unused-vars": "off",
        },
    },
]);
