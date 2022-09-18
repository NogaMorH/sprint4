import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeTask } from "../../store/board/board.actions"

export const TaskEditModal = ({ task, groupId }) => {
    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()

    const onRemoveTask = (ev, taskId) => {
        ev.stopPropagation()
        dispatch(removeTask(groupId ,taskId))
    }

    const { id } = task
    return (
        <div className="task-edit-modal">
            <h4>hello from task edit modal</h4>
            <span className="btn dark-btn"><Link to={`/board/${board._id}/group/${groupId}/task/${task.id}`}>Open card</Link> </span>
            <span className="btn dark-btn"><button onClick={(ev) => onRemoveTask(ev, id)}>Remove task</button></span>
        </div>
    )

}