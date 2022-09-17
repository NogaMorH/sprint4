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
    getTaskById,
    save,
    remove,
    removeTask,
    getMemberImgUrl,
    saveTask,
    removeGroup,
    updateGroupTitle
}
// window.cs = boardService

function query(filterBy) {
    // const {tasks} = board.groups
    // console.log('filterBy:', filterBy)
    // if (filterBy) {
    //     const { task } = filterBy
    //     if(task) {
    //         const regex = new RegExp(task, 'i')
    //         tasks = tasks.filter(task => regex.text(task.title))
    //     }
    // }
    return storageService.query(STORAGE_KEY)
}

function getBoardById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/board/${boardId}`)
}

async function getTaskById(boardId, groupId, taskId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    const group = board.groups.find(group => group.id === groupId)
    return group.tasks.find(task => task.id === taskId)

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

async function saveTask(board, groupId, task) {
    if (task.id) {
        console.log('update task')
    } else {
        try {
            task.id = utilService.makeId()
            const group = _getGroup(board, groupId)
            group.tasks.push(task)
            await storageService.put(STORAGE_KEY, board)
            return board
        } catch (err) {
            console.log('Save task from board service has failed:', err)
        }
    }
}

function getMemberImgUrl(board, memberId) {
    const url = board.members.find(member => member._id === memberId).imgUrl
    return url
}

async function removeTask(board, groupId, taskId) {
    try {
        const group = _getGroup(board, groupId)
        const tasks = group.tasks.filter(task => task.id !== taskId)
        group.tasks = tasks
        await storageService.put(STORAGE_KEY, board)
        return board
    } catch (err) {
        console.log('Remove task has failed:', err);
    }
}

async function removeGroup(board, groupId) {
    try {
        const groups = board.groups.filter(group => group.id !== groupId)
        console.log('groups:', groups)
        board.groups = groups
        await storageService.put(STORAGE_KEY, board)
        return board
    } catch (err) {
        console.log('Remove group has failed', err)
    }
}

async function updateGroupTitle(board, groupId, title) {
    const group = _getGroup(board, groupId)
    group.title = title
    await storageService.put(STORAGE_KEY, board)
    return board
}

function _getGroup(board, groupId) {
    const group = board.groups.find(group => group.id === groupId)
    return group
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
