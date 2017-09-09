import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

import { Tabs, Button, Input, Icon, Modal } from 'antd'

import ModalContent from './ModalContent'
import { Exercise, ExerciseHOC } from '../../PlanDashboard/views/planContent'

const TabPane = Tabs.TabPane

class TapItem extends Component {
    constructor(props) {
        super(...props)
        console.log(props)
        this.edit = this.edit.bind(this)
        this.onTitleChange = this.onTitleChange.bind(this)
        this.state = {
            edited: false,
            addModal: false,
            value: '',
            id: props.id
        }
    }

    setAddModalVisible(AddModalVisible, current) {
        this.props.setAddModalVisible({
            ModalVisible: AddModalVisible,
            current: current
        })
    }
    edit() {
        if (this.state.edited) {
            this.props.editTitle({
                key: this.state.id,
                value: this.state.value
            })
        }

        this.setState({
            edited: !this.state.edited
        })
    }
    onTitleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (
            <div >
                <div className={this.state.edited ? 'tapInput edit' : 'tapInput close'}>
                    <Input size="large" value={this.state.value} onChange={this.onTitleChange} placeholder="输入标题" />
                </div>
                <Button
                    type={this.state.edited ? 'primary' : 'dashed'}
                    onClick={this.edit}
                >
                    {this.state.edited ? '完成' : '修改标题'}
                </Button>
                <span style={{ display: 'flex', flexWrap: 'wrap', marginTop: 22 }}>
                    {this.props.todayExe.map((item, index) => {
                        const ExeContent = item.set.map((itm, idx) => {
                            return (
                                <p
                                    key={itm.id}
                                >
                                    {`第${idx + 1}组：${itm.rap}次，${itm.weight}kg`}
                                </p>
                            )
                        })
                        const ExerciseClick = ExerciseHOC({
                            url: item.url,
                            title: item.name,
                            key: item.id,
                            content: ExeContent,
                            onclick: () => this.props.onEditExe({
                                id: item.id,
                                name: item.name,
                                url: item.url
                            })
                        })
                        return (
                            <ExerciseClick
                                key={item.id}
                            />
                        )
                    })}
                </span>
                <div style={{ marginTop: 16 }}>
                    <Button
                        style={{ width: 240, height: 120 }} type='dashed'
                        onClick={() => this.setAddModalVisible(true, 0)}>
                        <Icon style={{ fontSize: 25 }} type="plus" />
                    </Button>
                </div>
                <Modal
                    title="请选择动作"
                    footer={null}
                    wrapClassName="vertical-center-modal"
                    visible={this.props.ModalVisible}
                    onCancel={() => this.setAddModalVisible(false, 0)}
                    maskClosable={false}
                >
                    <ModalContent />
                </Modal>
            </div>
        )
    }
}

const setVisible = ({ state, id }) => {
    for (let row in state) {
        if (state[row].id == id) {
            return state[row].ModalVisible
        }
    }
}

const selectTodayExe = (state) => {
    const { activeTab, Tab } = state
    for (let row in Tab) {
        if (Tab[row].id == activeTab) {
            return Tab[row].todayExe
        }
    }
}

const mapState = (state) => {
    return {
        ModalVisible: setVisible(
            {
                state: state.PlanCreator.Tab,
                id: state.PlanCreator.activeTab
            }
        ),
        todayExe: selectTodayExe(state.PlanCreator)
    }
}

const mapDispatch = (dispatch) => {
    return {
        setAddModalVisible: (condition) => dispatch({ type: 'setAddModalVisible', condition: condition }),
        onEditExe: (bundles) => dispatch({ type: 'onEditExe', bundles: bundles })
    }
}

export default connect(mapState, mapDispatch)(TapItem)