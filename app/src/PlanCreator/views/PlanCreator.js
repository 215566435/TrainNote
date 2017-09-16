import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Button, Modal, Input } from 'antd'

import TapItem from './TapItem'

import './PlanCreator.less'

const TabPane = Tabs.TabPane
const confirm = Modal.confirm


class PlanCreator extends Component {
    constructor(props) {
        super(...props)
        this.onchange = this.onchange.bind(this)
        this.edit = this.edit.bind(this)
        this.planTitleEdit = this.planTitleEdit.bind(this)
        this.titleChange = this.titleChange.bind(this)
        this.state = {
            planTitleEdited: false,
            titleValue: ''
        }
    }
    onchange(key) {
        this.props.onchange(key)
    }
    edit(key) {
        let that = this
        confirm({
            title: '你确定要删除吗？',
            onOk() {
                that.props.delTab(key)
            }
        })
    }
    shouldComponentUpdate(nextProps) {
        return true
    }
    planTitleEdit() {
        this.setState({
            planTitleEdited: !this.state.planTitleEdited
        })
        if (this.state.planTitleEdited) {
            this.props.planTitleEdit(this.state.titleValue)
        }
    }
    titleChange(e) {
        console.log(e.target.value)
        this.setState({
            titleValue: e.target.value
        })
    }

    render() {
        const { tabs } = this.props
        return (
            <div style={{ marginTop: '8px', padding: 24, background: '#fff' }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={this.props.add}>增加一天</Button>
                    <div>
                        <div className={this.state.planTitleEdited ? 'tapInput edit' : 'tapInput close'}>
                            <Input size="large" value={this.state.titleValue} onChange={this.titleChange} placeholder="输入计划名字" />
                        </div>
                        <Button onClick={this.planTitleEdit} >{this.props.planTitle}</Button>
                    </div>
                </div>
                <Tabs
                    activeKey={`${this.props.activeTab}`}
                    type="editable-card"
                    hideAdd={true}
                    onChange={this.onchange}
                    onEdit={this.edit}
                    tabPosition='left'
                >
                    {tabs.map((item, index) => {
                        return (
                            <TabPane tab={tabs[index].title} key={item.id}>
                                <TapItem
                                    id={index}
                                    editTitle={this.props.editTitle}
                                />
                            </TabPane>
                        )
                    })}
                </Tabs>
            </div>
        )
    }
}

const mapState = (state) => {
    console.log(state.planTitle)
    return {
        tabs: state.PlanCreator.Tab,
        activeTab: state.PlanCreator.activeTab || 1,
        planTitle: state.PlanCreator.planTitle || '设置计划名称'
    }
}

const mapDispatch = (dispatch) => {
    return {
        add: () => dispatch({ type: 'addTab' }),
        onchange: (key) => dispatch({ type: 'activeTab', key: key }),
        delTab: (key) => dispatch({ type: 'delTab', key: key }),
        editTitle: (bundles) => dispatch({ type: 'editTitle', bundles: bundles }),
        TabClick: (key) => (dispatch({ type: 'TabClick', key: key })),
        planTitleEdit: (value) => (dispatch({ type: 'planTitleEdit', value: value }))
    }
}

export default connect(mapState, mapDispatch)(PlanCreator)