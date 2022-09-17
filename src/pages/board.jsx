import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoard, addBoard, updateBoard, removeBoard } from '../store/board/board.actions'
import { boardService } from '../services/board.service'
import { GroupList } from '../cmps/board/group-list'
import { useParams } from 'react-router-dom'
import { BoardMainHeader } from '../cmps/board/board-main-header'
import { BoardSecondaryHeader } from '../cmps/board/board-secondary-header'
// import { showSuccessMsg } from '../services/event-bus.service.js'

export const Board = () => {
    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadBoard(params.boardId))
    }, [params.boardId])

    // useEffect(() => {
    //     if (!board) return
    //     console.log('board from did update:', board)
    // }, [board])

    // const onRemoveBoard = (boardId) => {
    //     dispatch(removeBoard(boardId))
    // }

    // const onAddBoard = () => {
    //     const board = boardService.getEmptyBoard()
    //     board.vendor = prompt('Vendor?')
    //     addBoard(board)
    // }

    if (!board) return <div>Loading...</div>
    return (
        <div className='board-page'>
            <BoardMainHeader />
            <main className='board'>
                <BoardSecondaryHeader board={board} />
                <div className='board-layout group-list-container'>
                    <GroupList groups={board.groups} />
                </div>
            </main>
        </div>
    )
}
