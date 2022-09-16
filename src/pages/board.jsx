import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoard, addBoard, updateBoard, removeBoard } from '../store/board/board.actions'
import { boardService } from '../services/board.service'
import { BoardHeader } from '../cmps/board/board-header'
import { GroupList } from '../cmps/board/group-list'
import { useParams } from 'react-router-dom'
// import { showSuccessMsg } from '../services/event-bus.service.js'

export const Board = () => {
    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadBoard(params.boardId))
    }, [])

    useEffect(() => {
        console.log('board from did update:', board)
    }, [board])

    // const onRemoveBoard = (boardId) => {
    //     dispatch(removeBoard(boardId))
    // }

    // const onAddBoard = () => {
    //     const board = boardService.getEmptyBoard()
    //     board.vendor = prompt('Vendor?')
    //     addBoard(board)
    // }
    // const onUpdateBoard = (board) => {
    //     const price = +prompt('New price?')
    //     const boardToSave = { ...board, price }
    //     updateBoard(boardToSave)
    // }

    if (!board) return <div>Loading...</div>
    return (

        <main className='board '>
            <div className='board-header-container'>
                <BoardHeader board={board} />
            </div>
            <div className="board-layout">
                <GroupList groups={board.groups} />
            </div>
        </main>
    )
}
