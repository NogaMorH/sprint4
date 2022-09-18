import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeTask, setTitleTaskId, updateTaskTitle } from "../../store/board/board.actions"
import { BiCreditCardFront } from 'react-icons/bi'
import { FiCreditCard } from 'react-icons/fi'
import { BsArchive } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { BsClock } from 'react-icons/bs'
import { useState } from "react"


export const TaskEditModal = ({ task, groupId, closeTaskEditModal }) => {
    const dispatch = useDispatch()
    const board = useSelector(state => state.boardModule.board)
    const titleTaskId = useSelector(state => state.systemModule.titleTaskId)
    const [taskTitle, setTitle] = useState(task.title)


    const onUpdateTitle = (ev) => {
        ev.stopPropagation()
        dispatch(setTitleTaskId(null))
        dispatch(updateTaskTitle(task.id, taskTitle))
    }


    const onEditTaskTitle = () => {
        if (titleTaskId === task.id) return
        dispatch(setTitleTaskId(task.id))
    }

    const handleChange = ({ target }) => {
        const value = target.value
        setTitle(value)
    }

    const onRemoveTask = (ev, taskId) => {
        ev.stopPropagation()
        dispatch(removeTask(groupId, taskId))
    }



    const { id, title } = task
    return (
        <div className="task-edit-modal">
            <div className='task-title-container'>
                {titleTaskId === id
                    ? <textarea name='title' value={taskTitle} className='task-title-edit'
                        onChange={handleChange} onBlur={onUpdateTitle} autoFocus></textarea>
                    : <div className='task-title' onClick={onEditTaskTitle}>
                        <h3>{title}</h3>
                    </div>}
                <button className="btn btn-primary-board" onClick={onUpdateTitle}>Save</button>
                <span className="btn dark-btn"><Link to={`/board/${board._id}/group/${groupId}/task/${task.id}`}>
                    <BiCreditCardFront className="edit-modal-icon" />Open card</Link> </span>
                <button className="btn dark-btn" onClick={(ev) => onRemoveTask(ev, id)}>
                    <BsArchive className="edit-modal-icon" />Remove task</button>
                {/* <button className="btn btn-close"onClick={closeTaskEditModal}>X</button> */}
                <button className="btn dark-btn"> <AiOutlineUser className="edit-modal-icon" />Change members</button>
                <button className="btn dark-btn"><FiCreditCard className="edit-modal-icon" />Change cover</button>
                <button className="btn dark-btn"><BsClock className="edit-modal-icon" />Edit dates</button>
            </div>
        </div>

    )

}