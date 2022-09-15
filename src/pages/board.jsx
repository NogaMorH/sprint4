import React, { useEffect } from 'react'
import { connect } from 'react-redux'
<<<<<<< HEAD


import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board/board.actions'

import { showSuccessMsg } from '../services/event-bus.service.js'
=======
import { useDispatch, useSelector } from 'react-redux'
import { loadBoard, addBoard, updateBoard, removeBoard } from '../store/board/board.actions'
>>>>>>> 1639118d9d31eb7f8af57a293b5b98ff0efaa86e
import { boardService } from '../services/board.service'
import { BoardHeader } from '../cmps/board/board-header'
import { GroupList } from '../cmps/board/group-list'
import { useParams } from 'react-router-dom'
// import { showSuccessMsg } from '../services/event-bus.service.js'

<<<<<<< HEAD
function _Board({ loadBoards, addBoard, updateBoard, removeBoard, boards }) {
=======
export const Board = () => {
    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()
    const params = useParams()
>>>>>>> 1639118d9d31eb7f8af57a293b5b98ff0efaa86e

    useEffect(() => {
        dispatch(loadBoard(params.boardId))
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

<<<<<<< HEAD
=======

console.log('board grouppssssss:', board.groups)
if(!board) return <div>Loading...</div>
>>>>>>> 1639118d9d31eb7f8af57a293b5b98ff0efaa86e
    return (
        
        <div className='board'>
            <h3>Boards App</h3>
            <h1> hello from board b101</h1>
            <BoardHeader />
            <GroupList groups={board.groups} />


<<<<<<< HEAD
                <ul className="board-list">

                    {boards.map(board =>
                        <li className="board-preview" key={board._id}>
                            <h4>{board.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${board.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{board.owner && board.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveBoard(board._id) }}>x</button>
                                <button onClick={() => { onUpdateBoard(board) }}>Edit</button>
                            </div>
                        </li>)
                    }

                </ul>
            </main>
=======
>>>>>>> 1639118d9d31eb7f8af57a293b5b98ff0efaa86e
        </div>
    )
}


<<<<<<< HEAD
function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadBoards,
    removeBoard,
    addBoard,
    updateBoard
}
=======
// function mapStateToProps(state) {
//     return {
//         boards: state.boardModule.boards
//     }
// }
// const mapDispatchToProps = {
//     loadBoard,
//     removeBoard,
//     addBoard,
//     updateBoard,
//     addToBoardt
// }
>>>>>>> 1639118d9d31eb7f8af57a293b5b98ff0efaa86e


// export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)