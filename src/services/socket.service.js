import io from 'socket.io-client'
import { httpService } from './http.service'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030/'
export const socketService = createSocketService()

// for debugging from console
window.socketService = socketService
let socketIsReady = false

socketService.setup()

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'
const SOCKET_EMIT_UPDATE_BOARD = 'update-board'
const SOCKET_EMIT_SET_BOARD = 'set-board'

function createSocketService() {
  let socket = null
  const socketService = {
    async setup() {
      if (socket) return
      await httpService.get('setup-session')
      socket = io(baseUrl, { reconnection: false })
      socketIsReady = true
    },
    async updateBoard(boardId) {
      if (!socket) await socketService.setup()
      socket.emit(SOCKET_EMIT_UPDATE_BOARD, boardId)
    },
    async setBoard(boardId) {
      console.log('boardId:', boardId)
      if (!socket) await socketService.setup()
      socket.emit(SOCKET_EMIT_SET_BOARD, boardId)
    },
    // async updateBoards() {
    //   if (!socket) await socketService.setup()
    //   socket.emit(SOCKET_EMIT_UPDATE_BOARDS)
    // },
    async on(eventName, cb) {
      if (!socket) await socketService.setup()
      socket.on(eventName, cb)
    },
    async off(eventName, cb = null) {
      if (!socket) await socketService.setup()
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    async login(userId) {
      if (!socket) await socketService.setup()
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    async logout() {
      if (!socket) await socketService.setup()
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
      socketIsReady = false
    }
  }
  return socketService
}