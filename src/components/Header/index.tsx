import React, { useState } from 'react'
import './index.less'
import { Menu, Dropdown, Input } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import classNames from 'classnames'
// 用户头像
import userImg from '@/assets/img/header-user-bg.webp'
// console.log('userImg', userImg)

const { Search } = Input

interface MenuItemObj {
	id: 'string'
	name: 'string'
}

const Drops: React.FC<{ list: MenuItemObj[] }> = ({ list }) => {
	return (
		<Menu>
			{list.map((item) => {
				return <Menu.Item key={item.id}>{item.name}</Menu.Item>
			})}
		</Menu>
	)
}

const Header: React.FC = () => {
	const tabs = [
		{ id: 'tab0', name: '首页' },
		{
			id: 'tab1',
			name: '讲堂',
			children: [
				{ id: 'drop10', name: '课程' },
				{ id: 'drop11', name: '每日一课' },
				{ id: 'drop12', name: '大厂案例' },
			],
		},
		{
			id: 'tab2',
			name: '训练营',
			children: [
				{ id: 'drop20', name: '课程' },
				{ id: 'drop21', name: '每日一课' },
				{ id: 'drop22', name: '大厂案例' },
			],
		},
		{ id: 'tab3', name: '部落' },
		{ id: 'tab4', name: '兑换中心' },
		{ id: 'tab5', name: '企业版', icon: '' },
		{ id: 'tab6', name: 'App下载', icon: '' },
	]

	const [tabActive, useTabActive] = useState(tabs[0].id)

	const handleClickTabsItem = (id: string) => {
		return () => {
			useTabActive(id)
		}
	}

	return (
		<div className="cus-header-wrapper">
			<div className="wrapper-icon"></div>
			<div className="wrapper-tabs">
				{tabs.map((item) => {
					const hasChild = item.children && item.children.length
					const tabsItemClass = classNames('tabs-item', {
						'tabs-drop-btn': hasChild,
						active: tabActive === item.id,
					})
					if (hasChild) {
						return (
							<Dropdown
								key={item.id}
								overlay={
									<Drops
										list={item.children as MenuItemObj[]}
									/>
								}
							>
								<div className={tabsItemClass}>
									<span>{item.name}</span>
									<DownOutlined />
								</div>
							</Dropdown>
						)
					}
					return (
						<div
							key={item.id}
							className={tabsItemClass}
							onClick={handleClickTabsItem(item.id)}
						>
							{item.name}
						</div>
					)
				})}
				<div className="tabs-search">
					<Search className="search-box" />
				</div>
			</div>
			<div className="wrapper-user">
				<img src={userImg} alt="" />
			</div>
		</div>
	)
}

export default Header
