
import { SEARCH_RESULT } from './types'

export const addSearchResult = (result) => (dispatch) => {
        dispatch({ type: SEARCH_RESULT, payload: result })
    }

