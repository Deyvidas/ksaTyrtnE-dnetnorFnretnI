import { Warning, svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const onWarn = (warning: Warning, handler?: (warning: Warning) => void) => {
    const { code } = warning;
    if (code === 'css-unused-selector') return;
    handler(warning);
};

export default defineConfig({
    plugins: [svelte({ onwarn: onWarn })],
    envPrefix: 'env_',
});
