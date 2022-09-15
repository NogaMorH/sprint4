import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
// import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard } from '../store/board/board.actions'
// import { store } from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'board'
// const boardChannel = new BroadcastChannel('boardChannel')


//     ; (() => {
//         boardChannel.addEventListener('message', (ev) => {
//             store.dispatch(ev.data)
//         })
//     })()

// var gBoards = require('../data/board')
// console.log('gBoards:', gBoards)

export const boardService = {
    query,
    getBoardById,
    save,
    remove,
    // getEmptyBoard,
}
window.cs = boardService

function query(filterBy) {
    return storageService.query(STORAGE_KEY)
}
async function getBoardById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
     
    
    // return axios.get(`/api/board/${boardId}`)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
    // boardChannel.postMessage(getActionRemoveBoard(boardId))
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
        // boardChannel.postMessage(getActionUpdateBoard(savedBoard))

    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
        // boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}



// function getEmptyBoard() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }

async function getTaskById(boardId, groupId, taskId) {
    // const board = await storageService.get(STORAGE_KEY, boardId)
    // console.log('board:', board);
    const group = await storageService.get('groupes', groupId)
    console.log('group:', group);
    // const group = await board.groupes.find(group => group.id === groupId)
    // console.log('group:', group);
    // return await group.tasks.find(task => task.id === taskId)
    // return axios.get(`/api/board/${boardId}`)
}


// function saveTask(boardId, groupId, task, activity) {
//     const board = getById(boardId)
//     // PUT /api/board/b123/task/t678

//     // TODO: find the task, and update
//     board.activities.unshift(activity)
//     saveBoard(board)
//     // return board
//     // return task
// }


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




