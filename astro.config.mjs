// @ts-check
import {defineConfig} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    vite: {
        // @ts-ignore
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                react: 'preact/compat',
                'react-dom': 'preact/compat',
            },
        },
    },
    adapter: vercel({
        functionPerRoute: false,
    }),
    output: "server",
    integrations: [preact()]
});