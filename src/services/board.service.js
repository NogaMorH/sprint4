import { httpService } from './http.service'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const BASE_URL = 'board/'
// const boardChannel = new BroadcastChannel('boardChannel')


//     ; (() => {
//         boardChannel.addEventListener('message', (ev) => {
//             store.dispatch(ev.data)
//         })
//     })()

// var gBoards = require('../data/board')

export const boardService = {
    query,
    getBoardById,
    save,
    remove,
    updateBoard,
    saveGroup,
    removeGroup,
    duplicateGroup,
    updateGroupTitle,
    saveTask,
    removeTask,
    getMemberImgUrl,
    getGroup,
    getTask,
    getTaskMembers,
    getTaskLabels,
    updateBoardLabels
}
// window.cs = boardService

async function query() {
    try {
        return await httpService.get(BASE_URL)
    } catch (err) {
        console.log('Query has failed:', err)
        throw err
    }
}

async function getBoardById(boardId) {
    try {
        return await httpService.get(BASE_URL + boardId)
        // return axios.get(`/api/board/${boardId}`)
    } catch (err) {
        console.log('Get board by id has failed', err)
        throw err
    }
}

async function save(board) {
    var savedBoard
    if (board._id) {
        try {
            savedBoard = await httpService.put(BASE_URL, board)
        } catch (err) {
            console.log('Save board has failed:', err)
            throw err
        }
        // boardChannel.postMessage(getActionUpdateBoard(savedBoard))
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        try {
            savedBoard = await httpService.post(BASE_URL, board)
            // boardChannel.postMessage(getActionAddBoard(savedBoard))
        } catch (err) {
            console.log('Save board has failed:', err)
            throw err
        }
    }
    return savedBoard
}

async function remove(boardId) {
    try {
        return await httpService.delete(BASE_URL + boardId)
        // boardChannel.postMessage(getActionRemoveBoard(boardId))
    } catch (err) {
        console.log('Remove has failed:', err)
        throw err
    }
}

async function updateBoard(newBoard) {
    try {
        await httpService.put(BASE_URL + newBoard._id, newBoard)
        return { ...newBoard }
    } catch (err) {
        console.log('UpdateBoard in board service has failed:', err)
        throw err
    }
}

async function saveGroup(board, group) {
    try {
        group.id = utilService.makeId()
        group.createdAt = Date.now()
        group.style = { color: "#EF7564" }
        group.tasks = []
        // group.byMember = {}
        board.groups.push(group)
        await httpService.put(BASE_URL + board._id, board)
        return { ...board }
    } catch (err) {
        console.log('Save group in board service has failed:', err)
        throw err
    }
}

async function removeGroup(board, groupId) {
    try {
        const groups = board.groups.filter(group => group.id !== groupId)
        board.groups = groups
        await httpService.put(BASE_URL + board._id, board)
        return { ...board }
    } catch (err) {
        console.log('Remove group has failed', err)
        throw err
    }
}

async function duplicateGroup(board, groupId) {
    try {
        const group = board.groups.find(group => group.id === groupId)
        const newGroup = { ...group, id: utilService.makeId() }
        const idx = board.groups.findIndex(currGroup => currGroup.id === groupId)
        board.groups.splice(idx, 0, newGroup)
        await httpService.put(BASE_URL + board._id, board)
        return { ...board }
    } catch (err) {
        console.log('Duplicate group has failed in board service:', err)
        throw err
    }
}

async function updateGroupTitle(board, groupId, title) {
    try {
        const group = getGroup(board, groupId)
        group.title = title
        await httpService.put(BASE_URL + board._id, board)
        return { ...board }
    } catch (err) {
        console.log('Update group title has failed in board service:', err)
        throw err
    }
}

async function saveTask(board, groupId, task) {
    if (task.id) {
        try {
            const group = getGroup(board, groupId)
            const idx = group.tasks.findIndex(currTask => currTask.id === task.id)
            group.tasks.splice(idx, 1, task)
            await httpService.put(BASE_URL + board._id, board)
            return { ...board }
        } catch (err) {
            console.log('Save task from board service has failed:', err)
            throw err
        }
    } else {
        try {
            task.id = utilService.makeId()
            const group = getGroup(board, groupId)
            group.tasks.push(task)
            await httpService.put(BASE_URL + board._id, board)
            return { ...board }
        } catch (err) {
            console.log('Save task from board service has failed:', err)
            throw err
        }
    }
}

async function removeTask(board, groupId, taskId) {
    try {
        const group = getGroup(board, groupId)
        const tasks = group.tasks.filter(task => task.id !== taskId)
        group.tasks = tasks
        await httpService.put(BASE_URL + board._id, board)
        return { ...board }
    } catch (err) {
        console.log('Remove task has failed:', err);
        throw err
    }
}

async function updateBoardLabels(board, labels) {
    try {
        board.labels = labels
        await httpService.put(BASE_URL + board._id, board)
        return { ...board }
    } catch (err) {
        console.log('UpdateBoard in board service has failed:', err)
        throw err
    }
}

function getMemberImgUrl(board, memberId) {
    const url = board.members.find(member => member._id === memberId).imgUrl
    return url
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

function getTaskMembers(board, groupId, taskId) {
    const memberIds = getTask(board, groupId, taskId).memberIds
    return board.members.filter(member => memberIds.includes(member._id))
}

function getTaskLabels(board, groupId, taskId) {
    const labelIds = getTask(board, groupId, taskId).labelIds
    return board.labels.filter(label => labelIds.includes(label.id))
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
