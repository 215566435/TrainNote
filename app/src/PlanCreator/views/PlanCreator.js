import React from 'react'
import { Component } from 'react'
import { Tabs, Button } from 'antd'

import TapItem from './TapItem'

import './PlanCreator.less'

const TabPane = Tabs.TabPane

function callback(key) {
    console.log(key);
}

export default class PlanCreator extends Component {
    constructor(props) {
        super(...props)
    }

    render() {
        return (
            <div style={{ marginTop: '8px', padding: 24, background: '#fff' }}>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.add}>ADD</Button>
                </div>
                <Tabs defaultActiveKey="1" type="editable-card" onChange={callback}>
                    <TabPane tab="Tab 1" key="1"><TapItem /></TabPane>
                    <TabPane tab="Tab 2" key="2"><TapItem /></TabPane>
                    <TabPane tab="Tab 3" key="3"><TapItem /></TabPane>
                </Tabs>
            </div>
        )
    }
}

