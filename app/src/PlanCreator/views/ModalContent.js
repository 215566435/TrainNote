import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Pagination, Steps, Button, Input, Icon } from 'antd'


import { Exercise } from '../../PlanDashboard/views/planContent'

const Step = Steps.Step
const InputGroup = Input.Group

const ChooseExercise = ({ database, choose }) => {
    return (
        <div>
            <div style={{ display: 'flex', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {database.map((item, index) => {
                    return (
                        <div
                            className='Exercise clickable'
                            onClick={() => choose(index)}
                            key={item.id}
                        >
                            <Exercise
                                key={index}
                                title={item.name}
                                url={item.url}
                                width={120}
                            />
                        </div>
                    )
                })}
            </div>
            <Pagination simple defaultCurrent={2} total={50} />
            <Icon type="search" />
        </div>
    )
}

const ExerciseInput = ({ delSet, index }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <InputGroup compact size="large">
                <Input addonBefore={`第${index + 1}组`} style={{ width: 100 }} placeholder='次数' />
                <Input style={{ width: 80 }} placeholder='重量（kg）' />
            </InputGroup>
            <div className='EditExercise-btn-group show'>
                <Button style={{ marginLeft: 2 }}><Icon style={{ fontSize: 20 }} type="copy" /></Button>
                <Button onClick={delSet} style={{ marginLeft: 2 }}><Icon style={{ fontSize: 20 }} type="delete" /></Button>
            </div>
        </div>
    )
}

const EditExercise = ({ choosenItem, Sets, addSet, delSet }) => {
    return (
        <div >
            <Exercise
                title={choosenItem.name}
                url={choosenItem.url}
                width={120}
            />
            <div>
                {Sets.map((item, index) => {
                    return (<ExerciseInput
                        key={item.id}
                        index={index}
                        delSet={() => delSet(item.id)}
                    />)
                })}
            </div>
            <Button onClick={addSet} style={{ marginBottom: 8 }} icon='plus' ></Button>
        </div>
    )
}

class ModalContent extends React.Component {
    constructor(prop) {
        super(...prop)
        this.state = {
            current: 0
        }
        this.done = this.done.bind(this)
        this.pre = this.pre.bind(this)
        this.choose = this.choose.bind(this)
    }
    done() {
        this.props.editDone()
        this.setState({
            current: 0
        })
    }
    pre() {
        if (this.state.current == 0) return
        this.setState({
            current: this.state.current - 1
        })
    }
    choose(index) {
        this.props.choose(index)
        this.setState({
            current: this.state.current + 1
        })
    }

    componentDidMount() {
        if (this.props.database.length != 0) return
        this.props.fetchDatabase()
    }

    render() {
        const { current } = this.state
        return (
            <div>
                <Steps current={current}>
                    <Step key={0} title='选择动作' />
                    <Step key={1} title='设计内容' />
                </Steps>
                <div style={{ display: 'flex', marginTop: 16 }}>
                    {
                        this.state.current == 0 ?
                            <ChooseExercise
                                database={this.props.database}
                                choose={this.choose}
                            />
                            :
                            this.state.current == 1 ?
                                <EditExercise
                                    choosenItem={this.props.choosenItem}
                                    Sets={this.props.Sets}
                                    addSet={this.props.addSet}
                                    delSet={this.props.delSet}
                                />
                                : null
                    }
                </div>
                <div style={{ display: this.state.current == 1 ? 'flex' : 'none', justifyContent: 'space-between', marginTop: 16 }}>
                    <Button type='dashed' onClick={this.pre}>上一步</Button>
                    <Button type='primary' onClick={this.done} >完成</Button>
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    const { choosenIndex } = state.PlanCreator
    const { sets } = state.PlanCreator
    const { database } = state.ExerciseDatabase
    return {
        database: database,
        choosenItem: database[choosenIndex],
        Sets: sets
    }
}
const mapDispach = (dispach) => {
    return {
        fetchDatabase: () => { dispach({ type: 'fetchDatabase' }) },
        choose: (index) => { dispach({ type: 'ChooseExercise', index: index }) },
        addSet: () => { dispach({ type: 'addSet' }) },
        delSet: (id) => { dispach({ type: 'delSet', id: id }) },
        editDone: () => { dispach({ type: 'editDone' }) }
    }
}

export default connect(mapState, mapDispach)(ModalContent)