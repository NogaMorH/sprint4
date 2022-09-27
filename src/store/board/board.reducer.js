const initialState = {
    boards: [],
    board: null

}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, board: action.board }
        case 'SET_BOARDS':
            return { ...state, boards: action.miniBoards }
        case 'UPDATE_BOARD':
            return { ...state, board: action.updatedBoard }
         
        default:
            return state
    }
    // For debug:
    // window.boardState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    // return newState
}
