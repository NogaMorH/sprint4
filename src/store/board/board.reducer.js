const initialState = {
    board: {},
    lastRemovedBoard: null
}
export function boardReducer(state = initialState, action) {
    var newState = state
    var board
    switch (action.type) {
        case 'SET_BOARD':
            return newState = { ...state, board: action.board }

        // case 'REMOVE_BOARD':
        //     const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
        //     board = state.boards.filter(board => board._id !== action.boardId)
        //     return newState = { ...state, boards, lastRemovedBoard }

        // case 'ADD_BOARD':
        //     return newState = { ...state, boards: [...state.boards, action.board] }

        // case 'UPDATE_BOARD':
        //     boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
        //     return newState = { ...state, boards }

        // case 'UNDO_REMOVE_BOARD':
        //     if (state.lastRemovedBoard) {
        //         return newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
        //     }
        default:
    }
    // For debug:
    window.boardState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState
}