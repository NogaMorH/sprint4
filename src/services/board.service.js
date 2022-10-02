import { httpService } from './http.service'
import { utilService } from './util.service'
import { userService } from './user.service'
import { socketService } from './socket.service'

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
    // updateBoard,
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
    moveTask,
    moveGroup,
    updateBoardLabels,
    setBoardIsStarred,
    getBackground,
    getBoardBackground
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
            await httpService.put(BASE_URL + board._id, board)
            return { ...board }
        } catch (err) {
            console.log('Save board has failed:', err)
            throw err
        }
        // boardChannel.postMessage(getActionUpdateBoard(savedBoard))
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        try {
            board = {
                ...board,
                isStarred: false,
                createdBy: {
                    fullname: '',
                    imgUrl: ''
                },
                labels: [],
                members: [],
                groups: [{
                    id: utilService.makeId(),
                    title: '',
                    createdAt: Date.now(),
                    byMember: {
                        id: '',
                        fullname: '',
                        imgUrl: ''
                    },
                    tasks: []
                }]
            }
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

// async function updateBoard(newBoard) {
//     try {
//         await httpService.put(BASE_URL + newBoard._id, newBoard)
//         return { ...newBoard }
//     } catch (err) {
//         console.log('UpdateBoard in board service has failed:', err)
//         throw err
//     }
// }

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
            socketService.updateBoard(board._id)
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

async function moveTask(board, result) {
    try {
        const { destination, source, draggableId } = result
        const { droppableId, index } = source
        const group = board.groups.find(group => group.id === droppableId)
        const task = group.tasks.find(task => task.id === draggableId)

        const start = board.groups.find(group => group.id === droppableId)
        const finish = board.groups.find(group => group.id === destination.droppableId)
        let newGroup
        if (start === finish) {
            group.tasks.splice(index, 1)
            group.tasks.splice(destination.index, 0, task)

            newGroup = {
                ...group,
                tasks: group.tasks
            }

        } else {

            const sourceTasks = start.tasks
            const currTask = sourceTasks.find((task, idx) => index === idx)
            sourceTasks.splice(index, 1)
            const destinationTasks = finish.tasks
            destinationTasks.splice(destination.index, 0, currTask)
            newGroup = {
                ...finish,
                tasks: destinationTasks
            }
        }

        const newBoard = {
            ...board,
            groups: board.groups.map(group => group.id === newGroup.id ? newGroup : group)
        }
        await httpService.put(BASE_URL + board._id, board)
        return newBoard
    } catch (err) {
        console.log('Remove task has failed:', err);
        throw err
    }
}

async function moveGroup(board, result) {
    try {
        const { destination, source, draggableId } = result
        const { index } = source
        const currGroup = board.groups.find(group => group.id === draggableId)
        board.groups.splice(index, 1)
        board.groups.splice(destination.index, 0, currGroup)
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
    const member = board.members.find(member => member.id === memberId)
    const url = member.imgUrl
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
    return board.members.filter(member => memberIds.includes(member.id))
}

function getTaskLabels(board, groupId, taskId) {
    const labelIds = getTask(board, groupId, taskId).labelIds
    return board.labels.filter(label => labelIds.includes(label.id))
}

async function setBoardIsStarred(miniBoards, board) {
    try {
        board.isStarred = !board.isStarred
        const updatedBoard = miniBoards.map(miniBoard => {
            if (board._id === miniBoard._id) return board
            return miniBoard
        })
        await httpService.put(BASE_URL + board._id, board)
        return [...updatedBoard]
    } catch (err) {
        console.log('Set board as starred has failed:', err);
        throw err
    }

}


function getBackground(type) {
    if (type === 'url') {
        return [
            "https://images.unsplash.com/photo-1549608276-5786777e6587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1477&q=80"
        ]
    } else if (type === 'color') {
        return ['#1f79bf', '#d29033', '#51983a', '#b04632', '#89609e', '#cd5a91']
    }


}

function getBoardBackground(type) {
    if (type === 'url') {
        return [
            "https://images.unsplash.com/photo-1549608276-5786777e6587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1460411794035-42aac080490a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1499002238440-d264edd596ec?ixlib=rb-1.2.1&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2175&q=80",
            "https://images.unsplash.com/photo-1509380247342-83d059a517a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
            "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        ]
    } else if (type === 'color') {
        return ['#1f79bf', '#d29033', '#51983a', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#2eaecc', '#838c91']
    }


}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
