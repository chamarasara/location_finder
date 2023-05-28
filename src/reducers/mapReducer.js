import { SEARCH_RESULT } from '../actions/types'

export default (state = {}, action) => {

    switch (action.type) {
        case SEARCH_RESULT:
            return {...state,[action.payload.id]:action.payload}
        default:
            return state
    }
    
}