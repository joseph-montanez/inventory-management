// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import type { ElectronOptions } from 'nuxt-electron'

export default defineNuxtConfig({
    modules: [
        '@kevinmarrec/nuxt-pwa',
        // ['nuxt-electron', <ElectronOptions>{include: ['electron']}]
        // './modules/antdv'
    ],
    plugins:['@/plugins/antd'],
    // vite: {
    //     plugins: [
    //         Components({
    //             resolvers: [AntDesignVueResolver()],
    //         }),
    //     ],
    // },
    pwa: {
        meta: {
            // Generate splash screens for iOS
            mobileAppIOS: true,
        },
        workbox: {
            enabled: true
        }
    },
    css: [
        '~/node_modules/ant-design-vue/dist/antd.css',
        '@/style.css'
    ]
})
