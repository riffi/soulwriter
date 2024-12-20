import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      react(),
      VitePWA({
          registerType: 'autoUpdate',
          // mode: 'development',
          base: '/',
          // add this to cache all the imports
          workbox: {
              globPatterns: ["**/*"],
              maximumFileSizeToCacheInBytes: 30000000
          },
          // add this to cache all the
          // static assets in the public folder
          includeAssets: [
              "**/*",
          ],
          // devOptions: {
          //     enabled: true,
          //     type: 'module',
          //     navigateFallback: 'index.html',
          // },
          manifest:{
              name: 'Soul writer',
              short_name: 'Soul writer',
              description: 'My writing assistant',
              theme_color: '#ffffff',
              display: 'standalone',
              icons: [
                  {
                      src: '/icon/icon-192.png',
                      sizes: '512x512',
                      type: 'image/png'
                  }
              ]
          }
      }
      )
  ],
  server:{
  },
    resolve: {
        alias: {
            "@app": "/src/app",
            "@entities": "/src/entities",
            "@features": "/src/features",
            "@pages": "/src/pages",
            "@shared": "/src/shared",
            "@widgets": "/src/widgets",
        },
    },
})
