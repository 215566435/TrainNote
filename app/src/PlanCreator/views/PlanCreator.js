import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Button } from 'antd'

import TapItem from './TapItem'
import { addTab } from '../action'

import './PlanCreator.less'

const TabPane = Tabs.TabPane

function callback(key) {
    console.log(key);
}

class PlanCreator extends Component {
    constructor(props) {
        super(...props)
    }
    render() {
        return (
            <div style={{ marginTop: '8px', padding: 24, background: '#fff' }}>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.props.add}>ADD</Button>
                </div>
                <Tabs defaultActiveKey="1" type="editable-card" hideAdd={true} onChange={callback}>
                    <TabPane tab="Tab 1" key="1"><TapItem /></TabPane>
                    <TabPane tab="Tab 2" key="2"><TapItem /></TabPane>
                    <TabPane tab="Tab 3" key="3"><TapItem /></TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapState = () => {

}

const mapDispatch = (dispatch) => {
    return {
        add: () => dispatch(addTab())
    }
}

export default connect()(PlanCreator)