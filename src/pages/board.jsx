import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoard, updateBoardFromSocket } from '../store/board/board.actions'
import { setIsFormAddOpen } from '../store/board/board.actions'
import { GroupList } from '../cmps/board/group-list'
import { Outlet, useParams } from 'react-router-dom'
import { MainHeader } from '../cmps/main-header'
import { BoardSecondaryHeader } from '../cmps/board/board-secondary-header'
import { FormAdd } from '../cmps/board/form-add'
import { BsPlusLg } from 'react-icons/bs'
import { socketService } from '../services/socket.service'

// import { showSuccessMsg } from '../services/event-bus.service.js'

export const Board = () => {
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadBoard(params.boardId))
    }, [params.boardId])

    useEffect(() => {
        socketService.on('board-updated', (board) => {
            dispatch(updateBoardFromSocket(board))
        })
    }, [])

    const onAddGroup = () => {
        dispatch(setIsFormAddOpen(null, true))
    }

    const getBoardBg = (board) => {
        let style = {}
        if (board.style?.imgUrl) {
            style = {
                background: `url(${board.style.imgUrl})`
            }
        } else {
            style = {
                backgroundColor: board.style.bgColor
            }
        }
        return style
    }

    if (!board) return <div>Loading...</div>
    return (
        <div className='board-layout board-page'>
            <MainHeader />
            <main className='full board-layout board-layout board' style={getBoardBg(board)}>
                <BoardSecondaryHeader board={board} />
                <div className='group-list-container'>
                    <GroupList groups={board.groups} />
                    {formAdd.isAddGroup
                        ? <FormAdd />
                        : <button className='btn btn-add-group' onClick={onAddGroup}>
                            <BsPlusLg className='plus-icon' />
                            Add another list
                        </button>
                    }
                    <Outlet />
                </div>
            </main>
        </div>

    )
}
