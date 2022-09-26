// import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
// import { showSuccessMsg } from '../services/event-bus.service'

const USER_BASE_URL = 'user/'
const AUTH_BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update
}

// window.userService = userService

function getUsers() {
    try {
        return httpService.query(USER_BASE_URL)
    } catch (err) {
        console.log('Get users from user service has failed:', err)
    }
}

// function onUserUpdate(user) {
//     showSuccessMsg(`This user ${user.fullname} just got updated from socket`)
// }

async function getById(userId) {
    try {
        const user = await httpService.get(USER_BASE_URL + userId)
        // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
        // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
        // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
        return user
    } catch (err) {
        console.log('Get by id has failed in user service', err)
    }
}

function remove(userId) {
    try {
        return httpService.delete(USER_BASE_URL + userId)
    } catch (err) {
        console.log('Remove has failed in user service', err)
    }
}

async function update(user) {
    try {
        await httpService.put(USER_BASE_URL + user._id, user)
        if (getLoggedinUser()._id === user._id) saveLocalUser(user)
        return user
    } catch (err) {
        console.log('Update has failed in user service', err)
    }
}

async function login(userCred) {
    try {
        const users = await httpService.get(`${AUTH_BASE_URL}login`, userCred)
        console.log('users:', users)
        const user = users.find(user => {
            return user.username === userCred.username && user.password === userCred.password
        })
        console.log('user:', user)
        if (user) {
            // socketService.login(user._id)
            return saveLocalUser(user)
        }
    } catch (err) {
        console.log('Login has failed in user service', err)
    }
}

async function signup(userCred) {
    try {
        const user = await httpService.post(`${AUTH_BASE_URL}signup`, userCred)
        // socketService.login(user._id)
        return saveLocalUser(user)
    } catch (err) {
        console.log('Signup has failed in user service', err)
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



