import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoard, addBoard, updateBoard, removeBoard } from '../store/board/board.actions'
import { boardService } from '../services/board.service'
import { setIsFormAddOpen } from '../store/board/board.actions'
import { GroupList } from '../cmps/board/group-list'
import { useParams } from 'react-router-dom'

import { BoardMainHeader } from '../cmps/board/board-main-header'
import { BoardSecondaryHeader } from '../cmps/board/board-secondary-header'
import { FormAdd } from '../cmps/board/form-add'
import { BsPlusLg } from 'react-icons/bs'

// import { showSuccessMsg } from '../services/event-bus.service.js'

export const Board = () => {
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const board = useSelector(state => state.boardModule.board)
    const isBlackScreenOpen = useSelector(state => state.systemModule.isBlackScreenOpen)
    const dispatch = useDispatch()
    const params = useParams()
    console.log('formAdd:', formAdd)

    useEffect(() => {
        dispatch(loadBoard(params.boardId))
    }, [params.boardId])


    const onAddGroup = () => {
        dispatch(setIsFormAddOpen(null, true))
    }


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
            <div className='board-layout board-page'>
                <div className={isBlackScreenOpen ? 'black-screen' : 'disabled-black-screen'}></div>
                <BoardMainHeader />
                <main className='full board-layout board-layout board'>
                    <BoardSecondaryHeader board={board} />
                    <div className='group-list-container'>
                        <GroupList groups={board.groups} />
                        {formAdd.isAddGroup
                            ? <FormAdd />
                            : <button className='btn btn-add-group' onClick={onAddGroup}>
                                <BsPlusLg className='plus-icon' />Add another list
                            </button>
                        }
                    </div>
                </main>
            </div>

    )
}
