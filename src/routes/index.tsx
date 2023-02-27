import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/views/home/index'
import Detail from '@/views/detail/index'
import Login from '@/views/login/index'
import { Layout } from 'antd'
import CusHeader from '@/components/Header/index'
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
						<Route path="/login" element={<Login />} />
					</Routes>
				</Content>
			</Layout>
		</BrowserRouter>
	)
}

export default App
