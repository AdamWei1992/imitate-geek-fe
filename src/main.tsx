import './public-path'
import React from 'react'
import ReactDom from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
// import App from '@/views/home/index'
import ViewRoutes from '@/routes'

import '@/assets/css/index.less'

function render(props: any) {
	const { container } = props
	ReactDom.render(
		<ViewRoutes />,
		container
			? container.querySelector('#root')
			: document.getElementById('root'),
	)
}

if (!window.__POWERED_BY_QIANKUN__) {
	render({})
}

export async function bootstrap() {
	console.log('[react16] react app bootstraped')
}

export async function mount(props: any) {
	console.log('[react16] props from main framework', props)
	render(props)
}

export async function unmount(props: any) {
	const { container } = props
	ReactDom.unmountComponentAtNode(
		container
			? container.querySelector('#root')
			: document.querySelector('#root'),
	)
}
