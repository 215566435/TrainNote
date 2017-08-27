import React from 'react';
import { Layout, Menu, Icon, Affix } from 'antd';
const { Sider } = Layout;
import { Link } from 'react-router-dom'

const MenuList = [
    { icon: 'user', link: '/', title: '控制面板' },
    { icon: 'video-camera', link: '/about', title: '临时2' },
    { icon: 'upload', link: '/', title: '临时3' },
]

export const LeftSider = ({ collapsed }) => {
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <Affix >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                    {MenuList.map((item, index) => {
                        return (
                            <Menu.Item key={index}>
                                <Link to={item.link}>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </Link>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </Affix>
        </Sider>
    )
}
