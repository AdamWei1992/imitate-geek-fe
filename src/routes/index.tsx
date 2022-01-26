import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/views/home'
import Detail from '@/views/detail'
import { Layout } from 'antd'
import CusHeader from '@/components/Header'
import './index.less'

const { Header, Content } = Layout

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Layout className="layout-wrapper">
				<Header className="wrapper-header">
					<CusHeader />
				</Header>
				<Content>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/detail" element={<Detail />} />
					</Routes>
				</Content>
			</Layout>
		</BrowserRouter>
	)
}

export default App
