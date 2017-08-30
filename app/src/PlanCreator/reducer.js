export default (state = { Tab: [{}] }, action) => {
    switch (action.type) {
        case 'SET_STATE_PLANCREATOR':
            return { ...state, ...action.state }
        case 'REPLACE_SATE_PLANCREATOR':
            return action.state
        default: return state
    }
}