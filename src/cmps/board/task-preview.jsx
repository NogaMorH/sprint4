import { useDispatch, useSelector } from 'react-redux'
import { utilService } from '../../services/util.service'
import { boardService } from '../../services/board.service'
import { BiPencil } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { toggleBlackScreen, setModalTaskId } from '../../store/board/board.actions'
import { TaskEditModal } from './task-edit-modal'
import descriptionIcon from '../../assets/img/description.svg'
import { BsClock } from 'react-icons/bs'
import { Draggable } from 'react-beautiful-dnd'


export const TaskPreview = ({ task, groupId }) => {
    const board = useSelector(state => state.boardModule.board)
    const modalTaskId = useSelector(state => state.systemModule.modalTaskId)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { title, dueDate, memberIds, description, attachments, id } = task

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        return monthAndDay
    }

    const openTaskEditModal = (ev) => {
        ev.stopPropagation()
        // if (modalTaskId === task.id) {
        //     return closeTaskEditModal()
        // }
        dispatch(setModalTaskId(task.id))
        dispatch(toggleBlackScreen())
        document.addEventListener('click', closeTaskEditModal)

    }

    const closeTaskEditModal = (ev) => {
        ev.stopPropagation()
        dispatch(setModalTaskId(null))
        dispatch(toggleBlackScreen())
        document.removeEventListener('click', closeTaskEditModal)
    }

    const openTaskDetails = () => {
        navigate(`/board/${board._id}/group/${groupId}/task/${id}`)
    }

    const isBadge = () => {
        if (dueDate || description || memberIds || attachments) return true
        else return false
    }

    if (!task) return <div>Loading...</div>
    return (
        // <Draggable draggableId={task.id}>
        <section className='task-preview-container'>
            <div className='task-preview' onClick={openTaskDetails}>
                {attachments && attachments.map((attachment, idx) => {
                    if (attachment.isCover) {
                        return <img key={idx} className='task-cover-img' src={attachment.url} alt="cover" />
                    }
                })}
                <div className="task-preview-details">
                    <h4 className="task-title">{title}</h4>
                    <button className="btn task-edit-icon" onClick={openTaskEditModal}><BiPencil /></button>
                    {modalTaskId === id && <TaskEditModal task={task} groupId={groupId} closeTaskEditModal={closeTaskEditModal} />}

                    <button className="btn task-edit-icon" onClick={toggleTaskEditModal}><BiPencil /></button>
                    {modalTaskId === id && <TaskEditModal task={task} groupId={groupId} />}
                    {isBadge() &&
                        <div className="task-badge-container flex">
                            {dueDate &&
                                <span className='task-due-date'><img className='task-badge' src={clockIcon} alt="clock icon" />{getFormatDate(task.dueDate)}</span>
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
                        </div>}
                </div>
            </div>
        </section>
    )
}