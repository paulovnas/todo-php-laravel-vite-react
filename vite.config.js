import { defineConfig } from 'vite';
import GlobPlugin from 'vite-plugin-glob';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/frontend/App.tsx'],
            refresh: true,
        }),
        react(),
        GlobPlugin(),
    ],
});
