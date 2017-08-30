import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Button } from 'antd'

import TapItem from './TapItem'

import './PlanCreator.less'

const TabPane = Tabs.TabPane

function callback(key) {
    console.log(key);
}

class PlanCreator extends Component {
    constructor(props) {
        super(...props)
        this.onchange = this.onchange.bind(this)
    }
    onchange(key) {
        this.props.onchange(key)
    }
    render() {
        return (
            <div style={{ marginTop: '8px', padding: 24, background: '#fff' }}>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.props.add}>ADD</Button>

                </div>
                <Tabs
                    activeKey={`${this.props.activeTab}`}
                    type="editable-card"
                    hideAdd={true}
                    onChange={this.onchange}
                >
                    {this.props.tabs.map((item, index) => {
                        console.log(this.props.tabs.length)
                        return (
                            <TabPane tab={`Day ${index + 1}`} key={index + 1}><TapItem /></TabPane>
                        )
                    })}
                </Tabs>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        tabs: state.PlanCreator.Tab,
        activeTab: state.PlanCreator.activeTab || 1
    }
}

const mapDispatch = (dispatch) => {
    return {
        add: () => dispatch({ type: 'addTab' }),
        onchange: (key) => dispatch({ type: 'activeTab', key: key })
    }
}

export default connect(mapState, mapDispatch)(PlanCreator)