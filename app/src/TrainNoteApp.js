import React from 'react';
import { Layout, Icon, Tooltip } from 'antd';
import { Route, Link } from 'react-router-dom'

import { LeftSider } from './LeftSider/index'
import { view as BodyCard } from './BodyCards'
import { view as PlanDashBoard } from './PlanDashboard'
import { view as ExerciseDatabase } from './ExerciseDatabase'
import { view as PlanCreator } from './PlanCreator'
import { view as LoginPage } from './Login'

import './TrainNoteApp.less'
import planUrl from '../image/strategy.svg'
import calendarUrl from '../image/calendar.svg'
import databaseUrl from '../image/wheel.svg'


const { Header, Content } = Layout;


const HeaderBtn = ({ iconUrl, titleText, to }) => {
    return (
        <div style={{marginLeft:'22px'}}>
            <Tooltip placement="bottom" title={titleText}>
                <Link to={to}> <img style={{ width: 50 }} src={iconUrl} /></Link>
            </Tooltip>
        </div>
    )
}

const Main = () => {
    return (
        <Layout className='ant-layout ant-layout-has-sider' >
            <Layout >
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{ padding: 8, display: 'flex' }} >
                        <HeaderBtn iconUrl={planUrl} titleText={'计划定制'} to='/' />
                        <HeaderBtn iconUrl={calendarUrl} titleText={'每日计划'} to='/Plan' />
                        <HeaderBtn iconUrl={databaseUrl} titleText={'动作库'} to='/Database' />
                    </div>
                </Header>

                <Route exact path='/' component={PlanCreator} />
                <Route path='/Plan' component={PlanDashBoard} />
                <Route path='/Database' component={ExerciseDatabase} />
            </Layout>
        </Layout>
    )
}

const Login = () => {
    return (
        <Route exact path='/Login' component={LoginPage} />
    )
}

export default class SiderDemo extends React.Component {

    render() {
        let ownDoc = document

        let username = console.log(ownDoc.cookie)
        return (
            <div className='innerRoot'>
                <Main />
                <Login />
            </div>

        )
    }
}
