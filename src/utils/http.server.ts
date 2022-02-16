import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios'

const server = axios.create({
	timeout: 5000,
	baseURL: '/api',
	// headers: {
	// 	'content-type': 'json/plain',
	// },
})

let token = ''

server.interceptors.request.use(
	(config) => {
		if (!token) {
			token = localStorage.getItem('usertoken') || ''
		}

		if (token) {
			(config.headers as AxiosRequestHeaders).Authorization = token
		}

		return config
	},
	(error) => {
		return Promise.reject(new Error(error))
	},
)

interface IResponseData {
	data: { [key: string]: unknown } | null
	message: string
	status: string
}

server.interceptors.response.use(
	(res: AxiosResponse<IResponseData>) => {
		// console.log('response----', res)
		const { data, config, status } = res
		if (status && config.url?.includes('login')) {
			const token = data.data?.token as string
			if (token) {
				localStorage.setItem('usertoken', token)
			}
		}
		return data
	},
	(error) => {
		console.log('请求错误：', error)
		return Promise.reject(new Error(error))
	},
)

const http = {
	post(url: string, params: object, headers?: AxiosRequestHeaders) {
		return server.post(url, params, { headers })
	},
	get(url: string, params?: object, headers?: AxiosRequestHeaders) {
		return server.get(url, { params, headers })
	},
}

export default http
