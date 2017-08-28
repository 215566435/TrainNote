import request from '../NetWorkUtils/request'
import { message } from 'antd';

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



const fetchDatabase = (dispatch, getState) => {
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
            dispatch(getDatabase([]))
        })
    })
}
const fetchUpload = (dispatch, getState, uploadData) => {
    let node = uploadData.node
    request.Post({
        url: Url,
        jsonData: { name: uploadData.name, url: uploadData.url }
    }).then((res) => {
        res.json().then((resJson) => {
            message.success('添加成功')
            dispatch(uploadDataBack(resJson))
            node.setState({ loading: false })
        }).catch((error) => {
            message.error('添加失败:' + error)
            node.setState({ loading: false })
        })
    }).catch((error) => {
        message.error('网络请求错误：' + error)
        node.setState({ loading: false })
    })
}

const fetchDelete = (dispatch, getState, index) => {
    const { database } = getState().ExerciseDatabase

    request.Delete({
        url: Url,
        id: database[index].id
    }).then((res) => {
        res.json().then((resJson) => {
            dispatch(deleteData(index))
            message.success('删除成功')
        }).catch((error) => {
            message.error('删除无效：' + error)
        })
    }).catch((error) => {
        message.error('删除请求失败：' + error)
    })
}



export const dispatcherAsync = (fnName, chunks = null) => {
    return (dispatch, getState) => {
        fn[fnName](dispatch, getState, chunks)
    }
}

const fn = {
    fetchDatabase: fetchDatabase,
    fetchUpload: fetchUpload,
    fetchDelete: fetchDelete
}