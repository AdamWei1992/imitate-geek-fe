import React from 'react'
import ReactDom from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
// import App from '@/views/home/index'
import ViewRoutes from '@/routes/index'

// import 'antd/dist/antd.less'
import '@/assets/css/index.less'

ReactDom.render(<ViewRoutes />, document.getElementById('root'))
