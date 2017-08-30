import request from '../NetWorkUtils/request'
import { message } from 'antd';
import { call, put, take, select } from 'redux-saga/effects';

const Url = 'http://127.0.0.1:3000/api/exercise'

const setState = ({ state }) => ({
    type: 'SET_STATE_PLANCREATOR',
    state: state
})

const addTab = function* () {
   
    try {
        let state = yield select(state => state.PlanCreator)
        let Tab = state.Tab
        let newTab = [...Tab, { title: 'dog' }]
        console.log(newTab)
        yield put(setState({
            state: { ...state, Tab: newTab, activeTab: newTab.length }
        }))
    } catch (error) {
        message.error('出错:' + error)
    }
}

const activeTab = function* (others) {
    try {
        let state = yield select(state => state.PlanCreator)
        message.success('进来了')
        yield put(setState({
            state: { ...state, activeTab: others.key }
        }))
    } catch (error) {
        message.error('出错:' + error)
    }
}



const takeFn = {
    addTab: addTab,
    activeTab: activeTab
}

export const watchSagaPlanCreator = function* () {
    var Fn = []
    for (let key in takeFn) {
        Fn.push(key)
    }
    while (true) {
        const { type, ...others } = yield take(Fn)
        yield call(takeFn[type], others)
    }
}