import { useDispatch, useSelector } from 'react-redux'
import { utilService } from '../../services/util.service'
import { boardService } from '../../services/board.service'
import { BiPencil } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { setModalTaskId } from '../../store/board/board.actions'
import { TaskEditModal } from './task-edit-modal'
import descriptionIcon from '../../assets/img/description.svg'
// import clockIcon from '../../assets/img/clock.svg'
import { BsClock } from 'react-icons/bs'
import { useState } from 'react'

export const TaskPreview = ({ task, groupId }) => {
    const board = useSelector(state => state.boardModule.board)
    const modalTaskId = useSelector(state => state.systemModule.modalTaskId)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        return monthAndDay
    }

    const handleClick = (ev) => {
        // console.log('ev:', ev)
        ev.stopPropagation()
        setIsEditModalOpen(current => !current)

    }

    const toggleTaskEditModal = (ev) => {
        ev.stopPropagation()
        if (modalTaskId === task.id) {
            return closeTaskEditModal()
        }
        dispatch(setModalTaskId(task.id))
        document.addEventListener('click', closeTaskEditModal)

    }

    const closeTaskEditModal = (ev) => {
        ev.stopPropagation()
        dispatch(setModalTaskId(null))
        document.removeEventListener('click', closeTaskEditModal)
    }

    const openTaskDetails = () => {
        navigate(`/board/${board._id}/group/${groupId}/task/${task.id}`)
    }

    const { title, dueDate, memberIds, description, attachments, id } = task
    if (!task) return <div>Loading...</div>
    return (
        <section className='task-preview-container'>
            <div className='task-preview' onClick={openTaskDetails}>
                {attachments && attachments.map((attachment, idx) => {
                    if (attachment.isCover) {
                        return <img key={idx} className='task-cover-img' src={attachment.url} alt="cover" />
                    }
                })}
                <div className="task-preview-details">
                    <h4 className="task-title">{title}</h4>
                    <div className={isEditModalOpen ? 'main-screen' : ''} onClick={handleClick}>
                        <button className="btn task-edit-icon" onClick={toggleTaskEditModal}><BiPencil /></button>
                        {modalTaskId === id && <TaskEditModal task={task} groupId={groupId} closeTaskEditModal={closeTaskEditModal} />}
                    </div>
                    <div className="task-badge-container flex">
                        {dueDate &&
                            <span className='task-due-date'><BsClock className='task-badge' />{getFormatDate(task.dueDate)}</span>
                        }
                        {description && <div className='task-badge'>
                            <img src={descriptionIcon} alt="description icon" />
                        </div>
                        }
                        <div className="member-avatar">
                            {memberIds && memberIds.map(memberId => (
                                <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)} alt="profile img" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}