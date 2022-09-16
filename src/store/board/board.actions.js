import { boardService } from "../../services/board.service.js";
import { userService } from "../../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

// Action Creators:
// export function getActionRemoveBoard(boardId) {
//     return {
//         type: 'REMOVE_CAR',
//         boardId
//     }
// }
// export function getActionAddBoard(board) {
//     return {
//         type: 'ADD_CAR',
//         board
//     }
// }
// export function getActionUpdateBoard(board) {
//     return {
//         type: 'UPDATE_CAR',
//         board
//     }
// }

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getBoardById(boardId)
            dispatch({ type: 'SET_BOARD', board })

        } catch (err) {
            showErrorMsg('Cannot load boards')
            console.log('Cannot load boards', err)
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            console.log('Deleted Succesfully!');
            // dispatch(getActionRemoveBoard(boardId))
            showSuccessMsg('Board removed')
        } catch (err) {
            showErrorMsg('Cannot remove board')
            console.log('Cannot remove board', err)
        }
    }
}

export function addBoard(board) {
    return (dispatch) => {
        boardService.save(board)
            .then(savedBoard => {
                console.log('Added Board', savedBoard);
                // dispatch(getActionAddBoard(savedBoard))
                showSuccessMsg('Board added')
            })
            .catch(err => {
                showErrorMsg('Cannot add board')
                console.log('Cannot add board', err)
            })
    }
}

export function saveTask(groupId, task) {
    return (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            console.log('board:', board)
            boardService.saveTask(board, groupId, task)
                .then(updatedBoard => {
                    console.log('updatedBoard:', updatedBoard)
                    dispatch('UPDATE_BOARD', updatedBoard)
                })
        } catch (err) {
            console.error('Save task in board actions has failed:', err)
        }
    }
}

export function removeTask(groupId, taskId) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            console.log('board:', board);
            const updatedBoard = await boardService.removeTask(board, groupId, taskId)
            console.log('Deleted Succesfully!');
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
            showSuccessMsg('Task removed')
        } catch (err) {
            showErrorMsg('Cannot remove task')
            console.log('Cannot remove task', err)
        }
    }
}

export function setIsFormAddOpen(groupId, isAddGroup) {
    return (dispatch) => {
        // console.log('groupId:', groupId)
        // console.log('isAddGroup:', isAddGroup)
        dispatch({ type: 'SET_FORM_ADD_GROUP_ID', groupId })
        dispatch({ type: 'SET_FORM_ADD_IS_ADD_GROUP', isAddGroup })
    }
}

export function setModalGroupId(groupId) {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_GROUP_MODAL_OPEN', groupId })
    }
}

export function removeGroup(groupId) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const updatedBoard = await boardService.removeGroup(board, groupId)
            console.log('Deleted seuccesfully')
            dispatch({ type: 'UPDATE_BOARD', updatedBoard })
            showSuccessMsg('Group removed')


        } catch (err) {
            showErrorMsg('Cannot remove group')
            console.log('Cannot remove task', err)
        }
    }
}

// export function updateBoard(board) {
//     return (dispatch) => {
//         boardService.save(board)
//             .then(savedBoard => {
//                 console.log('Updated Board:', savedBoard);
//                 // dispatch(getActionUpdateBoard(savedBoard))
//                 showSuccessMsg('Board updated')
//             })
//             .catch(err => {
//                 showErrorMsg('Cannot update board')
//                 console.log('Cannot save board', err)
//             })
//     }
// }

// export function checkout() {
//     return async (dispatch, getState) => {
//         try {
//             const state = getState()
//             const total = state.boardModule.boardt.reduce((acc, board) => acc + board.price, 0)
//             const score = await userService.changeScore(-total)
//             dispatch({ type: 'SET_SCORE', score })
//             dispatch({ type: 'CLEAR_CART' })
//             showSuccessMsg('Charged you: $' + total.toLocaleString())
//         } catch (err) {
//             showErrorMsg('Cannot checkout, login first')
//             console.log('BoardActions: err in checkout', err)
//         }
//     }
// }


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_CAR',
            boardId
        })
        showSuccessMsg('Board removed')

        boardService.remove(boardId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully');
            })
            .catch(err => {
                showErrorMsg('Cannot remove board')
                console.log('Cannot load boards', err)
                dispatch({
                    type: 'UNDO_REMOVE_CAR',
                })
            })
    }
}