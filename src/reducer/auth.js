import * as Types from '../constant/actionType'

export default function auth(state = {}, action) {
    switch (action.type) {
        case Types.AUTH_USER:
    return { ...state, error: '', authenticated: true }
        case Types.UNAUTH_USER:
    return { ...state, authenticated: false }
        case Types.AUTH_ERROR:
    return { ...state, error: action.payload }
        case Types.FETCH_MESSAGE:
    return { ...state, message: action.payload }
        default:
    return state
}
}

