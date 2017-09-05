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
        let id = Date.now()
        let newTab = [...Tab, {
            title: '新的一天',
            id: id
        }]
        yield put(setState({
            state: { ...state, Tab: newTab, activeTab: `${id}` }
        }))
    } catch (error) {
        message.error('出错:' + error)
    }
}

const activeTab = function* (others) {
    try {
        let state = yield select(state => state.PlanCreator)
        yield put(setState({
            state: { ...state, activeTab: others.key }
        }))
    } catch (error) {
        message.error('出错:' + error)
    }
}

const delTab = function* (others) {
    try {
        console.log(others)
        let state = yield select(state => state.PlanCreator)
        const { Tab } = state
        let newTab = Tab.filter((item, index) => {
            if (item.id != others.key) {
                return item
            }
        })

        yield put(setState({
            state: { ...state, Tab: newTab }
        }))

    } catch (error) {
        message.error('出错:' + error)
    }
}

const editTitle = function* (others) {
    try {

        let state = yield select(state => state.PlanCreator)
        const { Tab } = state
        let newTab = Tab.map((item, index) => {
            if (index == others.bundles.key) {

                return { ...item, title: others.bundles.value }
            }
            return item
        })
        yield put({ type: 'REPLACE_SATE_PLANCREATOR', state: { ...state, Tab: newTab } })
    } catch (error) {

    }
}
const TabClick = function* (others) {
    console.log('哈哈:',others)
}

const ChooseExercise = function* (others) {
    console.log(others)
    try {
        let state = yield select(state => state.PlanCreator)
        yield put({ type: 'SET_STATE_PLANCREATOR', state: { ...state, choosen: others.index } })
    } catch (e) {

    }

}

const takeFn = {
    addTab: addTab,
    activeTab: activeTab,
    delTab: delTab,
    editTitle: editTitle,
    ChooseExercise: ChooseExercise,
    TabClick: TabClick
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