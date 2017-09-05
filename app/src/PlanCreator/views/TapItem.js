import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

import { Tabs, Button, Input, Icon, Modal } from 'antd'

import ModalContent from './ModalContent'

const TabPane = Tabs.TabPane

export default class TapItem extends Component {
    constructor(props) {
        super(...props)
        this.edit = this.edit.bind(this)
        this.onTitleChange = this.onTitleChange.bind(this)
        this.state = {
            edited: false,
            addModal: false,
            value: '',
            id: props.id
        }
    }

    setAddModalVisible(AddModalVisible) {
        this.setState({ addModal: AddModalVisible });
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
                <div style={{ marginTop: 16 }}>
                    <Button
                        style={{ width: 240, height: 120 }} type='dashed'
                        onClick={() => this.setAddModalVisible(true)}>
                        <Icon style={{ fontSize: 25 }} type="plus" />
                    </Button>
                </div>
                <Modal
                    title="请选择动作"
                    footer={null}
                    wrapClassName="vertical-center-modal"
                    visible={this.state.addModal}
                    onOk={() => this.setAddModalVisible(false)}
                    onCancel={() => this.setAddModalVisible(false)}
                    maskClosable={false}
                >
                    <ModalContent />
                </Modal>
            </div>
        )
    }
}
