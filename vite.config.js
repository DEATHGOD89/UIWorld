import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Build assets with relative paths so the site works anywhere, including double-clicking index.html directly
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        verdant: './verdant.html',
        division: './division.html',
        agency: './agency.html',
        portfolio: './portfolio.html',
        fionure: './fionure.html',
        raze: './raze.html',
        tracle: './tracle.html',
        muli: './muli.html',
        nuorbit: './nuorbit.html',
        arcane: './arcane.html'
      }
    }
  }
})
