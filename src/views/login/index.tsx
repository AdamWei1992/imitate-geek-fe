import http from '@/utils/http.server'
import { Form, Input, Button, FormItemProps, FormProps } from 'antd'
import React, { ChangeEvent, useCallback, useState } from 'react'
import './index.less'

const formLayout: FormProps = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
}

const buttonLayout: FormItemProps = {
	wrapperCol: { offset: 8, span: 10 },
}

const Login: React.FC = () => {
	const onFinish = useCallback(() => {
		console.log('onfinish')
	}, [])
	// 点击登录按钮
	const handleClickLogin = async () => {
		const params = { username, password }
		let res = null
		try {
			res = await http.post('/user/login', params)
		} catch (error) {
			console.log('登录失败：', error)
		}
		console.log('login success', res)
	}
	// 点击注册按钮
	const handleClickRegister = async () => {
		console.log('register')
		const params = { username, password }

		let res = null
		try {
			res = await http.post('/user/regist', params)
		} catch (error) {
			console.log('注册失败：', error)
		}

		console.log('register success', res)
	}
	// 测试接口
	const handleClickTest = async () => {
		http.post('/content/list', { id: '123' })
	}

	const [user, setUser] = useState({
		username: '',
		password: '',
	})
	const { username, password } = user

	const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const val = ev.target.value || ''
		setUser({ username: val, password })
	}

	const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const val = ev.target.value || ''
		setUser({ username, password: val })
	}

	return (
		<div className="login-wrapper">
			<Form {...formLayout} className="wrapper-form" onFinish={onFinish}>
				<Form.Item label="用户名" name="username">
					<Input
						value={username}
						placeholder="请输入用户名"
						onChange={handleNameChange}
					/>
				</Form.Item>
				<Form.Item label="密码" name="password">
					<Input.Password
						value={password}
						placeholder="请输入密码"
						onChange={handlePasswordChange}
					/>
				</Form.Item>
				<Form.Item {...buttonLayout}>
					<Button
						className="buttons-login"
						type="primary"
						onClick={handleClickLogin}
					>
						登录
					</Button>
					<Button onClick={handleClickRegister}>注册</Button>
					<Button onClick={handleClickTest}>测试</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
export default Login
