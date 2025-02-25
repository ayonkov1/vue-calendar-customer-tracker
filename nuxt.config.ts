// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/main.css', 'vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
        ssr: {
            // if ssr enabled in future, this config is required to load vuetify properly
            noExternal: ['vuetify'],
        },
    },
    modules: [
        (options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) =>
                // @ts-ignore
                config.plugins.push(
                    vuetify({
                        autoImport: true,
                    }),
                ),
            )
        },
    ],
})
