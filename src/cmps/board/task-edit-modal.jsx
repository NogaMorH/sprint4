import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeTask, setDynamicModal, setModalTaskId, updateTask } from "../../store/board/board.actions"
import { BiCreditCardFront } from 'react-icons/bi'
import { FiCreditCard } from 'react-icons/fi'
import { BsArchive } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { BsClock } from 'react-icons/bs'
import { useState } from "react"
import { TaskPreviewBadge } from "./task-preview-badge"
import { DynamicModal } from "../dynamic-modal/dynamic-modal"

export const TaskEditModal = ({ task, groupId, closeTaskEditModal, isBadge }) => {

    const dispatch = useDispatch()
    const dynamicModal = useSelector(state => state.systemModule.dynamicModal)
    const board = useSelector(state => state.boardModule.board)
    const modalTaskId = useSelector(state => state.systemModule.modalTaskId)
    const [taskTitle, setTitle] = useState(task.title)

    const onUpdateTask = (ev) => {
        ev.stopPropagation()
        dispatch(updateTask(groupId, task.id, 'title', taskTitle))
        closeTaskEditModal(ev)
    }

    const handleFocus = (ev) => ev.target.select()

    const handleChange = ({ target }) => {
        const value = target.value
        console.log('value:', value)
        setTitle(value)
    }

    const onRemoveTask = (ev, taskId) => {
        ev.stopPropagation()
        dispatch(removeTask(groupId, taskId))
        closeTaskEditModal(ev)
    }

    const toggleModal = (ev, type) => {
        ev.stopPropagation()
        if (dynamicModal.modalType === type) {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }
        dispatch(setDynamicModal({ modalType: type, fromCmp: 'task edit modal' }))
    }

    const { id, attachments } = task
    return (
        <div className="task-edit-modal-container">
            <div className="black-screen" onClick={closeTaskEditModal}></div>
            <div className="task-edit-modal">
                <div className="task-edit-content">
                    {attachments && attachments.map((attachment, idx) => {
                        if (attachment.isCover) {
                            return <img key={idx} className='task-cover-img' src={attachment.url} alt="cover" />
                        }
                    })}
                    <form onSubmit={onUpdateTask}>
                        {modalTaskId === id &&
                            <input name='title' value={taskTitle} className='task-title-edit'
                                onClick={(ev) => ev.stopPropagation()}
                                onChange={handleChange} onFocus={handleFocus} autoFocus>
                            </input>}
                        <div className='edit-modal-task-preview' >
                            <div className="edit-modal-task-details">
                                {isBadge() &&
                                    <TaskPreviewBadge task={task} />}
                            </div>
                        </div>
                    </form>
                    <button className="btn btn-primary-board edit-modal" onClick={(ev) => onUpdateTask(ev)}>
                        Save
                    </button>
                </div>
                <div className="task-edit-modal-btns">
                    <span className="btn dark-btn"><Link to={`/board/${board._id}/group/${groupId}/task/${task.id}`}>
                        <BiCreditCardFront className="edit-modal-icon" />Open card</Link> </span>
                    <button className="btn dark-btn" onClick={(ev) => onRemoveTask(ev, id)}>
                        <BsArchive className="edit-modal-icon" />Remove task</button>
                    <button className="btn dark-btn" onClick={(ev) => toggleModal(ev, 'members')}>
                        <AiOutlineUser className="edit-modal-icon" />Change members
                    </button>
                    <button className="btn dark-btn" onClick={(ev) => toggleModal(ev, 'cover')}>
                        <FiCreditCard className="edit-modal-icon" />Change cover
                    </button>
                    <button className="btn dark-btn"><BsClock className="edit-modal-icon" />
                        Edit dates
                    </button>
                </div>
            </div>
            <div className="modal-container">
                {dynamicModal.modalType === 'cover' && dynamicModal.fromCmp === 'task edit modal' &&
                    <DynamicModal type='cover' className="pos-fixed" groupId={groupId} taskId={task.id}
                        closeModal={toggleModal} />
                }
                {dynamicModal.modalType === 'members' && dynamicModal.fromCmp === 'task edit modal' &&
                    <DynamicModal type='members' className="pos-fixed" groupId={groupId} taskId={task.id}
                        closeModal={toggleModal} />
                }
                {dynamicModal.modalType === 'dates' && dynamicModal.fromCmp === 'task edit modal' &&
                    <DynamicModal type='dates' className="pos-fixed" groupId={groupId} taskId={task.id}
                        closeModal={toggleModal} />
                }
            </div>
        </div>
    )
}