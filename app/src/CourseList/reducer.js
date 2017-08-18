


export default (state = { model: [], trainer: [] }, action) => {
    switch (action.type) {
        case 'GET_COURSE':
            let a = action.courseList.map((item) => {
                return item.course
            })
            return { ...state, model: a }
        case 'GET_TRAINER':
            return { ...state, trainer: action.trainer }
        default: return state

    }
}