import React, { useEffect, useState } from 'react'
// import http from '@/utils/http.server'
import './index.less'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const App: React.FC = () => {
	// const params = {
	// 	name: 'yewei',
	// 	password: '3gynj20J#001',
	// }

	// http.post('/user/login', params)

	const navigate = useNavigate()

	const handleClickLogin = () => {
		navigate('/login')
	}

	return (
		<div className="home-wrapper">
			<Button onClick={handleClickLogin}>去登录！！！</Button>
		</div>
	)
}

export default App
