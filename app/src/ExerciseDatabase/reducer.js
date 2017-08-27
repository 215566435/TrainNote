
export default (state = { database: [] }, action) => {
    switch (action.type) {
        case 'GET_DATABASE':
            console.log(action.database)
            return { ...state, database: action.database }
        default: return state

    }
}