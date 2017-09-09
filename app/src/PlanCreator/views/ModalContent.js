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

const ExerciseInput = ({ delSet, index, InputChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <InputGroup compact size="large">
                <Input
                    addonBefore={`第${index + 1}组`}
                    style={{ width: 100 }}
                    placeholder='次数'
                    onChange={(detail) => { InputChange({ type: 'rap', index: index, detail: detail }) }}
                />
                <Input
                    style={{ width: 80 }}
                    placeholder='重量（kg）'
                    onChange={(detail) => { InputChange({ type: 'weight', index: index, detail: detail }) }}
                />
            </InputGroup>
            <div className='EditExercise-btn-group show'>
                <Button style={{ marginLeft: 2 }}><Icon style={{ fontSize: 20 }} type="copy" /></Button>
                <Button onClick={delSet} style={{ marginLeft: 2 }}><Icon style={{ fontSize: 20 }} type="delete" /></Button>
            </div>
        </div>
    )
}

const EditExercise = ({ choosenItem, Sets, addSet, delSet, InputChange }) => {
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
                        InputChange={InputChange}
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
        this.done = this.done.bind(this)
        this.pre = this.pre.bind(this)
        this.choose = this.choose.bind(this)
    }
    done() {
        this.props.editDone()
    }
    pre() {
        if (this.props.ModalCurrent == 0) return
    }
    choose(index) {
        this.props.choose(index)
    }

    componentDidMount() {
        if (this.props.database.length != 0) return
        this.props.fetchDatabase()
    }

    render() {
        const { ModalCurrent } = this.props
        return (
            <div>
                <Steps current={ModalCurrent}>
                    <Step key={0} title='选择动作' />
                    <Step key={1} title='设计内容' />
                </Steps>
                <div style={{ display: 'flex', marginTop: 16 }}>
                    {
                        ModalCurrent === 0 ?
                            <ChooseExercise
                                database={this.props.database}
                                choose={this.choose}
                            />
                            :
                            ModalCurrent === 1 ?
                                <EditExercise
                                    choosenItem={this.props.choosenItem}
                                    Sets={this.props.Sets}
                                    addSet={this.props.addSet}
                                    delSet={this.props.delSet}
                                    InputChange={this.props.InputChange}
                                />
                                : null
                    }
                </div>
                <div style={{ display: ModalCurrent == 1 ? 'flex' : 'none', justifyContent: 'space-between', marginTop: 16 }}>
                    <Button type='dashed' onClick={this.pre}>上一步</Button>
                    <Button type='primary' onClick={this.done} >完成</Button>
                </div>
            </div>
        )
    }
}

const ModalCurrentSelector = (state, activeTab) => {
    for (let row in state.Tab) {
        if (state.Tab[row].id == activeTab) {
            return state.Tab[row].ModalCurrent
        }
    }
}

const mapState = (state) => {
    const { choosenName, choosenUrl, sets, activeTab } = state.PlanCreator
    const { database } = state.ExerciseDatabase
    return {
        database: database,
        choosenItem: {
            name: choosenName,
            url: choosenUrl
        },
        Sets: sets,
        ModalCurrent: ModalCurrentSelector(state.PlanCreator, activeTab)
    }
}
const mapDispach = (dispach) => {
    return {
        fetchDatabase: () => { dispach({ type: 'fetchDatabase' }) },
        choose: (index) => { dispach({ type: 'ChooseExercise', index: index }) },
        addSet: () => { dispach({ type: 'addSet' }) },
        delSet: (id) => { dispach({ type: 'delSet', id: id }) },
        editDone: () => { dispach({ type: 'editDone' }) },
        InputChange: (bundle) => { dispach({ type: 'inputChange', bundle: bundle }) }
    }
}

export default connect(mapState, mapDispach)(ModalContent)