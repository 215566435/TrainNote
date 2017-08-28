
export default (state = { database: [], pageState: { loading: true } }, action) => {

    switch (action.type) {
        case 'GET_DATABASE':
            let newPageState = { ...state.pageState, loading: false }
            return { ...state, database: action.database, pageState: newPageState }
        case 'UPLOAD':
            let changedDatabase = { ...action.database, loading: false }
            return { ...state, database: [changedDatabase, ...state.database] }
        case 'DELETE_DATA':
            let newDatabase = state.database.filter((item, index) => {
                if (index !== action.index) {
                    return item
                }
            })
            return { ...state, database: newDatabase }
        default: return state

    }
}