import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { loadBoard, addBoard, updateBoard, removeBoard } from '../store/board/board.actions'
import { utilService } from '../services/util.service'

export const TaskDetails = () => {

    let board = useSelector(state => state.boardModule.board)
    const [task, setTask] = useState(null)
    const dispatch = useDispatch()
    const params = useParams()
    const { boardId, groupId, taskId } = params

    if (!board) dispatch(loadBoard(boardId)).then(currBoard => board = currBoard)

    useEffect(() => {
        loadTask(boardId, groupId, taskId)
    }, [])

    const loadTask = async (boardId, groupId, taskId) => {
        const task = await boardService.getTaskById(boardId, groupId, taskId)
        // console.log('task:', task);
        // dispatch - update board
        setTask(task)
    }

    if (!board || !task) return <div>Loading...</div>
    const { title, dueDate, memberIds, attachment, checklists } = task

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        const time = utilService.formatAMPM(dueDate)
        return monthAndDay + ' At ' + time
    }

    return (
        <div style={{ border: '1px solid black' }}>
            <img src={attachment} width="100" />
            <h4>{title}</h4>
            <div className="members">
                Members
                {memberIds.map(memberId => (
                    <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)} width="50" />
                ))}
            </div>
            <div className="date">
                <input type="checkbox" />
                <span>{getFormatDate(dueDate)}</span>
                {/* <input type="text" value={getFormatDate(dueDate)} /> */}
            </div>
        </div>
    )
}