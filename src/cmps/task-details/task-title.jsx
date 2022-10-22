import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateTask } from "../../store/board/board.actions"
import { BiCreditCardFront } from "react-icons/bi"

export const TaskTitle = ({ title, board }) => {

    const [taskTitle, setTaskTitle] = useState(title)
    const { groupId, taskId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateTask(groupId, taskId, 'title', taskTitle))
    }, [taskTitle])

    const handleTitleChange = ({ target }) => {
        setTaskTitle(target.value)
    }

    return (
        <div className="task-title">
            <BiCreditCardFront className="task-title-icon" />
            <input className="task-title-header" type="text" value={taskTitle} onChange={handleTitleChange} />

            <div className="task-title-subtitle">
                in list&nbsp;
                <span>{boardService.getGroup(board, groupId).title}</span>
            </div>
        </div>
    )
}