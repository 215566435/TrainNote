import request from '../NetWorkUtils/request'
import { message } from 'antd';

const Url = 'http://127.0.0.1:3000/api/exercise'

const getDatabase = (database) => ({
    type: "GET_DATABASE",
    database: database
})

export const addTab = () => ({
    type: "AddTab"
})


export const getDatabaseAsync = (node) => {
    return (dispatch, getState) => {
        fetch(Url, {
            method: 'GET'
        }).then((res) => {
            res.json().then((resJson) => {
                let fixedRes = resJson.map((item) => {
                    let i = item
                    i['loading'] = false
                    return i
                })
                message.success('读取数据成功')
                dispatch(getDatabase(fixedRes))
            }).catch((error) => {
                message.error('读取数据失败:' + error)
            })
        })
    }
}

