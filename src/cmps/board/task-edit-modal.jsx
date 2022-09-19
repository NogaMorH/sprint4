import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeTask, setTitleTaskId, updateTask } from "../../store/board/board.actions"
import { BiCreditCardFront } from 'react-icons/bi'
import { FiCreditCard } from 'react-icons/fi'
import { BsArchive } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { BsClock } from 'react-icons/bs'
import { useState } from "react"


export const TaskEditModal = ({ task, groupId, closeTaskEditModal }) => {
    const dispatch = useDispatch()
    const board = useSelector(state => state.boardModule.board)
    const modalTaskId = useSelector(state => state.systemModule.modalTaskId)
    const [taskTitle, setTitle] = useState(task.title)


    const onUpdateTask = (ev) => {
        ev.stopPropagation()
        dispatch(setTitleTaskId(null))
        dispatch(updateTask(task.id, taskTitle))
    }

    const handleFocus = (ev) => ev.target.select()

    const onEditTaskTitle = () => {
        // if (modalTaskId === task.id) return
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
                {modalTaskId === id &&
                    <textarea name='title' value={taskTitle} className='task-title-edit'
                        onChange={handleChange} onFocus={handleFocus} autoFocus>
                    </textarea>}
                <button className="btn btn-primary-board" onClick={onUpdateTask}>Save</button>
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