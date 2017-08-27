import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Button } from 'antd'
import { Spin, Icon, message, Input } from 'antd';

import { Exercise } from '../../PlanDashboard/views/planContent'
import { getDatabaseAsync } from '../action'

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
            loading: false,
            pageLoading: true
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
    deleteHandle(index) {
        let database = this.state.database
        database[index].loading = true
        this.setState({ database: database })
        request.Delete({
            url: Url,
            id: this.state.database[index].id
        }).then((res) => {
            res.json().then((resJson) => {
                this.setState({
                    database: this.state.database.filter((item, idx) => {
                        if (idx != index) return item
                    })
                })
                message.success('删除成功')
            }).catch((error) => {
                message.error('删除无效：' + error)
            })
        }).catch((error) => {
            message.error('删除请求失败：' + error)
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
        request.Post({
            url: Url,
            jsonData: { name: uploadData.name, url: uploadData.url }
        }).then((res) => {
            res.json().then((resJson) => {
                message.success('添加成功')
                this.setState({
                    database: [...this.state.database, resJson],
                    loading: false
                })
            }).catch((error) => {
                this.setState({ loading: false })
                message.error('添加失败:' + error)
            })
        }).catch((error) => {
            message.error('网络请求错误：' + error)
            this.setState({ loading: false })
        })
    }

    componentDidMount() {
        this.props.getDatabase(this)
    }
    render() {
        return (
            <div
                className='ExerciseDatabase'
                style={{ marginTop: '8px', padding: 24, background: '#fff', minHeight: 280 }}
            >
                {this.state.pageLoading ?
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
                                onDelete={() => { this.deleteHandle(index) }}
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
    return {
        database: state.ExerciseDatabase.database
    }
}

const mapDispach = (dispatch) => {
    return {
        getDatabase: (node) => { dispatch(getDatabaseAsync(node)) }
    }
}

export default connect(mapState, mapDispach)(ExerciseDatabase)