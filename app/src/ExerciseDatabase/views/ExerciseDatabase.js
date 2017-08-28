import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Button } from 'antd'
import { Spin, Icon, message, Input } from 'antd';

import { Exercise } from '../../PlanDashboard/views/planContent'
import { dispatcherAsync } from '../action'

import './ExerciseDatabase.less'


class CustomUpload extends Component {
    constructor(props) {
        super(...props)
        this.onChangehandle = this.onChangehandle.bind(this)
    }
    state = {
        name: '',
        url: ''
    }

    onChangehandle(ctx) {
        this.setState({
            [ctx.target.id]: ctx.target.value
        })
    }
    render() {
        const { addHandle, color, added, loading, Upload } = this.props
        const { name, url } = this.state
        return (
            <div>
                <Spin spinning={loading}>
                    <div>
                        <Icon
                            onClick={addHandle}
                            type="plus-circle-o"
                            style={{ color: color, fontSize: 22 }} />
                    </div>
                    <div className={added ? 'ExerciseAdd' : 'ExerciseAdd closed'}>
                        <div style={{ marginBottom: 16 }}>
                            <Input addonBefore="名称" id='name' placeholder='哑铃卧推' onChange={this.onChangehandle} />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <Input addonBefore="图片地址" id='url' placeholder='仅支持网络图片' onChange={this.onChangehandle} />
                        </div>
                        <Button className='add-new-e' onClick={() => { Upload({ name, url }) }} type="primary">+ 健身动作</Button>
                    </div>
                </Spin>
            </div>
        )
    }
}


class ExerciseDatabase extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            added: false,
            color: '',
            loading: false
        }
        this.addHandle = this.addHandle.bind(this)
        this.Upload = this.Upload.bind(this)
    }
    addHandle() {
        this.setState({
            added: !this.state.added,
            color: this.state.added ? '' : '#08c'
        })
    }
    Upload(uploadData) {
        for (let key in uploadData) {
            if (uploadData[key] === '') {
                message.error('名称和图片地址都不能为空')
                return
            }
        }
        this.setState({ loading: true })
        let chunk = { ...uploadData, node: this }
        this.props.Upload(chunk)
    }

    componentDidMount() {
        if (this.props.database.length != 0) {
            return
        }
        this.props.getDatabase()
    }
    render() {
        return (
            <div
                className='ExerciseDatabase'
                style={{ marginTop: '8px', padding: 24, background: '#fff', minHeight: 280 }}
            >
                {this.props.pageLoading ?
                    <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
                        <Spin size="large" />
                    </div> :
                    ''
                }
                <CustomUpload
                    addHandle={this.addHandle}
                    added={this.state.added}
                    color={this.state.color}
                    loading={this.state.loading}
                    Upload={this.Upload}
                />
                <div className='ExerciseBoard'>
                    {this.props.database.map((item, index) => {
                        return (
                            <Exercise
                                key={index}
                                title={item.name}
                                content=''
                                url={item.url}
                                onDelete={() => { this.props.Delete(index) }}
                                loading={item.loading}
                                close={true}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    const { database, pageState } = state.ExerciseDatabase
    return {
        database: database,
        pageLoading: pageState.loading
    }
}

const mapDispach = (dispatch) => {
    return {
        getDatabase: () => { dispatch(dispatcherAsync('fetchDatabase')) },
        Upload: (uploadData) => { dispatch(dispatcherAsync('fetchUpload', uploadData)) },
        Delete: (index) => { dispatch(dispatcherAsync('fetchDelete', index)) }
    }
}

export default connect(mapState, mapDispach)(ExerciseDatabase)


