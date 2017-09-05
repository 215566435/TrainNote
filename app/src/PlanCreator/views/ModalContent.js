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
                            key={index}
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

class EditExercise extends React.Component {
    render() {
        console.log(this.props.choosenItem)
        return (
            <div >
                <Exercise
                    title={this.props.choosenItem.name}
                    url={this.props.choosenItem.url}
                    width={120}
                />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <InputGroup compact size="large">
                        <Input style={{ width: 60 }} placeholder='组数' />
                        <Input style={{ width: 60 }} placeholder='次数' />
                        <Input style={{ width: 80 }} placeholder='重量（kg）' />
                    </InputGroup>
                    <div className= 'EditExercise-btn-group show'>
                        <Button style={{ marginLeft: 2 }}><Icon style={{ fontSize: 20 }} type="copy" /></Button>
                        <Button style={{ marginLeft: 2 }}><Icon style={{ fontSize: 20 }} type="delete" /></Button>
                    </div>
                </div>
            </div>
        )
    }
}

class ModalContent extends React.Component {
    constructor(prop) {
        super(...prop)
        this.state = {
            current: 0
        }
        this.next = this.next.bind(this)
        this.pre = this.pre.bind(this)
        this.choose = this.choose.bind(this)
    }
    next() {
        this.setState({
            current: this.state.current + 1
        })
    }
    pre() {
        if (this.state.current == 0) return
        this.setState({
            current: this.state.current - 1
        })
    }

    componentDidMount() {
        if (this.props.database.length != 0) return
        this.props.fetchDatabase()
    }
    choose(index) {
        this.props.choose(index)
        this.next()
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
                                />
                                : ''
                    }
                </div>
                <div style={{ display:this.state.current == 1?'flex':'none', justifyContent: 'space-between', marginTop: 16 }}>
                    <Button type='dashed' onClick={this.pre}>上一步</Button>
                    <Button type='primary' onClick={this.next}>下一步</Button>
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    const { choosen } = state.PlanCreator
    const { database } = state.ExerciseDatabase
    console.log(state.PlanCreator)
    return {
        database: database,
        choosenItem: database[choosen]
    }
}
const mapDispach = (dispach) => {
    return {
        fetchDatabase: () => { dispach({ type: 'fetchDatabase' }) },
        choose: (index) => { dispach({ type: 'ChooseExercise', index: index }) }
    }
}

export default connect(mapState, mapDispach)(ModalContent)