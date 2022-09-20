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
    removeTask,
    getMemberImgUrl,
    saveTask,
    removeGroup,
    updateGroupTitle,
    getGroup,
    getTask,
    saveGroup,
    updateTaskTitle,
    moveTask,
    duplicateGroup
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
        try {
            const group = getGroup(board, groupId)
            const idx = group.tasks.findIndex(currTask => currTask.id === task.id)
            group.tasks.splice(idx, 1, task)
            await storageService.put(STORAGE_KEY, board)
            return board
        } catch (err) {
            console.log('Save task from board service has failed:', err)
        }
    } else {
        try {
            task.id = utilService.makeId()
            const group = getGroup(board, groupId)
            group.tasks.push(task)
            const newBoard = await storageService.put(STORAGE_KEY, board)
            const updatedBoard = { ...newBoard }
            return updatedBoard
        } catch (err) {
            console.log('Save task from board service has failed:', err)
        }
    }
}

async function saveGroup(board, group) {
    console.log('group from service:', group)
    try {
        group.id = utilService.makeId()
        group.createdAt = Date.now()
        group.style = { color: "#EF7564" }
        group.tasks = []
        // group.byMember = {}

        board.groups.push(group)
        const newBoard = await storageService.put(STORAGE_KEY, board)
        console.log('newBoard:', newBoard)
        const updatedBoard = { ...newBoard }
        return updatedBoard
    } catch (err) {
        console.log('Save group from board service has failed:', err)
    }
}

function getMemberImgUrl(board, memberId) {
    const url = board.members.find(member => member._id === memberId).imgUrl
    return url
}

async function removeTask(board, groupId, taskId) {
    try {
        const group = getGroup(board, groupId)
        const tasks = group.tasks.filter(task => task.id !== taskId)
        group.tasks = tasks
        const newdBoard = await storageService.put(STORAGE_KEY, board)
        const updatedBoard = { ...newdBoard }
        return updatedBoard
    } catch (err) {
        console.log('Remove task has failed:', err);
    }
}

async function removeGroup(board, groupId) {
    try {
        const groups = board.groups.filter(group => group.id !== groupId)
        board.groups = groups
        const newBoard = await storageService.put(STORAGE_KEY, board)
        const updatedBoard = { ...newBoard }
        return updatedBoard
    } catch (err) {
        console.log('Remove group has failed', err)
    }
}

async function updateGroupTitle(board, groupId, title) {
    const group = getGroup(board, groupId)
    group.title = title
    await storageService.put(STORAGE_KEY, board)
    return board
}

async function updateTaskTitle(board, taskId, title) {
    //not working!!!
    // console.log('board: service', board)
    // console.log('groupId: service', groupId)
    // console.log('taskId service', taskId)
    // console.log('title: service', title)
    // const task = getTask(board, groupId, taskId)
    // task.title = title
    // await storageService.put(STORAGE_KEY, board)
    // return board
}

function getGroup(board, groupId) {
    const group = board.groups.find(group => group.id === groupId)
    return group
}

function getTask(board, groupId, taskId) {
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    return task
}

async function moveTask(board, newBoard) {
    // console.log('newBoard:', newBoard)
    try {
        // const group = board.groups.find(group => group.id === source.droppableId)
        // const newBoard = {
        //     ...board,
        //     groups:
        //         board.groups.map(group => group.id === newGroup.id ? newGroup : group)
        // }

        await storageService.put(STORAGE_KEY, newBoard)
        return newBoard

    } catch (err) {
        console.log('Move task from board service has failed:', err)

    }
}

async function duplicateGroup(board, groupId) {
    const group = board.groups.find(group => group.id === groupId)
    const newGroup = { ...group, id: utilService.makeId() }
    const idx = board.groups.findIndex(currGroup => currGroup.id === groupId)
    board.groups.splice(idx, 0, newGroup)
    const newBoard = await storageService.put(STORAGE_KEY, board)
    const updatedBoard = { ...newBoard }
    return updatedBoard
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
