import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        icons: {
            defaultSet: 'mdi',
        },
    })
    nuxtApp.vueApp.use(vuetify)
})
