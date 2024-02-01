import {defineConfig} from "umi";

export default defineConfig({
    routes: [
        {path: "/", component: "index"},
        {path: "/docs", component: "docs"},
    ],
    npmClient: 'pnpm',
    plugins: [
        'umi-plugin-check-for-updates',
        '@umijs/plugins/dist/request'
    ],
    checkForUpdates: {
        content: ['6'],
    }
});
