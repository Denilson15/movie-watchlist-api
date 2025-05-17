import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'watchlist.html', dest: '.' },
		{ src: 'index.css', dest: '.' },
		{ src: 'images', dest: 'images' } 
      ]
    })
  ]
})
