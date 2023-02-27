import { defineConfig } from 'vite'
import reactSWC from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	base: './',
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, './src'),
			},
			{
				find: '~@',
				replacement: path.resolve(__dirname, './src'),
			},
		],
	},
	plugins: [reactSWC()],
})
