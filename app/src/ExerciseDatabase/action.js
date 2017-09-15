import { message } from 'antd';
import { call, put, take, select } from 'redux-saga/effects';

import request from '../NetWorkUtils/request'


const Url = 'http://127.0.0.1:3000/api/exercise'

const getDatabase = (database) => ({
    type: "GET_DATABASE",
    database: database
})
const uploadDataBack = (database) => ({
    type: "UPLOAD",
    database: database
})
const deleteData = (index) => ({
    type: "DELETE_DATA",
    index: index
})


const fetchDatabase = function* () {
    try {
        let res = yield call(fetch, Url,{credentials: 'include'})
        let resJon = yield res.json()

        let state = yield select(state => state.ExerciseDatabase)
        message.success('读取数据成功')
        yield put({
            type: 'SET_STATE',
            state: { ...state, database: resJon, pageState: { loading: false } }
        })
    } catch (error) {
        message.error('读取数据失败:' + error)
    }
}

const Upload = function* (others) {
    const { name, url } = others.uploadData
    try {
        const state = yield select(state => state.ExerciseDatabase)
        yield put({
            type: 'SET_STATE',
            state: { ...state, uploadLoading: true }
        })

        let res = yield call(request.Post, {
            url: Url,
            jsonData: { name: name, url: url }
        })
        let json = yield res.json()
        let changedDatabase = { ...json, loading: false }
        yield put({
            type: 'SET_STATE',
            state: { ...state, database: [changedDatabase, ...state.database], uploadLoading: false }
        })
        message.success('上传数据成功!')
    } catch (error) {
        message.error('上传数据失败:' + error)
    }
}

const Delete = function* (others) {
    const state = yield select(state => state.ExerciseDatabase)
    const { database } = state
    const { index } = others

    try {
        let res = yield call(request.Delete, {
            url: Url,
            id: database[index].id
        })
        let newDatabase = database.filter((item, idx) => {
            if (idx !== index) {
                return item
            }
        })
        yield put({ type: "SET_STATE", state: { ...state, database: newDatabase } })
        message.success('删除成功')
    } catch (error) {
        message.error('删除失败：' + error)
    }

}


const takeFn = {
    fetchDatabase: fetchDatabase,
    Upload: Upload,
    Delete: Delete
}

export const watchSagaDatabase = function* () {
    var Fn = []
    for (let key in takeFn) {
        Fn.push(key)
    }
    while (true) {
        const { type, ...others } = yield take(Fn)
        yield call(takeFn[type], others)
    }
}