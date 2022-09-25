import { userService } from '../../services/user.service.js'

const initialState = {
    user: userService.getLoggedinUser()
}
export function userReducer(state = initialState, action) {
    // var newState = state
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user }
        // case 'REMOVE_USER':
        //     return {
        //         ...state,
        //         users: state.users.filter(user => user._id !== action.userId)
        //     }
        //     break
        default:
            return state
    }

    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    // return newState
}
