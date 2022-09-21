import { useDispatch, useSelector } from 'react-redux'
import { utilService } from '../../services/util.service'
import { boardService } from '../../services/board.service'
import { BiPencil } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { toggleBlackScreen, setModalTaskId } from '../../store/board/board.actions'
import { TaskEditModal } from './task-edit-modal'
import { FiClock } from 'react-icons/fi'
import { GrTextAlignFull } from 'react-icons/gr'
import { Draggable } from 'react-beautiful-dnd'
import { ImAttachment } from 'react-icons/im'

export const TaskPreview = ({ task, groupId, index }) => {
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
        <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
                <section className='task-preview-container'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    {modalTaskId === id &&
                        <TaskEditModal task={task} groupId={groupId}
                            closeTaskEditModal={(ev) => closeTaskEditModal(ev)} />}
                    <div className='task-preview' onClick={openTaskDetails}>
                        {attachments && attachments.map((attachment, idx) => {
                            if (attachment.isCover) {
                                return <img key={idx} className='task-cover-img' src={attachment.url} alt="cover" />
                            }
                        })}
                        <div className="task-preview-details">
                            <h4 className="task-title">{title}</h4>
                            <button className="btn task-edit-icon" onClick={openTaskEditModal}>
                                <BiPencil />
                            </button>
                            {isBadge() &&
                                <div className="task-badge-container flex">
                                    <div className='task-badges'>
                                        {dueDate &&
                                            <span className='task-due-date'>
                                                <span className='clock-badge'>
                                                    <FiClock />
                                                </span>
                                                {getFormatDate(task.dueDate)}
                                            </span>
                                        }
                                        {description &&
                                            <span className='description-badge'>
                                                <GrTextAlignFull />
                                            </span>
                                        }
                                        {attachments &&
                                            <span className='task-attachment'>
                                                <span className='attachment-badge'>
                                                    <ImAttachment />
                                                </span>
                                                {attachments.length}
                                            </span>}
                                    </div>
                                    <div className="member-avatar">
                                        {memberIds && memberIds.map(memberId => (
                                            <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)}
                                                alt="profile img" />
                                        ))}
                                    </div>
                                </div>}
                        </div>
                    </div>
                </section >
            )}
        </Draggable>
    )
}