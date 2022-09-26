import { useDispatch, useSelector } from 'react-redux'
import { utilService } from '../../services/util.service'
import { boardService } from '../../services/board.service'
import { BiPencil } from 'react-icons/bi'
import { Outlet, useNavigate } from 'react-router-dom'
import { toggleBlackScreen, setModalTaskId } from '../../store/board/board.actions'
import { TaskEditModal } from './task-edit-modal'

import { Draggable } from 'react-beautiful-dnd'
import { TaskPreviewBadge } from './task-preview-badge'

export const TaskPreview = ({ task, groupId, index }) => {
    const board = useSelector(state => state.boardModule.board)
    const modalTaskId = useSelector(state => state.systemModule.modalTaskId)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { title, dueDate, memberIds, description, attachments, id } = task

    const openTaskEditModal = (ev) => {
        ev.stopPropagation()
        dispatch(setModalTaskId(task.id))
        // dispatch(toggleBlackScreen())
        // document.addEventListener('click', closeTaskEditModal)
    }

    const closeTaskEditModal = (ev) => {
        ev.stopPropagation()
        dispatch(setModalTaskId(null))
        // dispatch(toggleBlackScreen())
        console.log('close:');
        // document.removeEventListener('click', closeTaskEditModal)
    }

    const openTaskDetails = () => {
        navigate(`/board/${board._id}/group/${groupId}/task/${id}`)
    }

    const isBadge = () => {
        if (dueDate || description || memberIds || attachments) return true
        else return false
    }
    const { cover } = task

    if (!task) return <div>Loading...</div>
    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
                <section className='task-preview-container'
                    onClick={openTaskDetails}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>

                    {modalTaskId === id &&
                        <TaskEditModal task={task} groupId={groupId}
                            closeTaskEditModal={(ev) => closeTaskEditModal(ev)} isBadge={isBadge} />}
                    <div className='task-preview'>
                        {cover &&
                            (cover.img ?
                                <img className='task-cover-img' src={cover.img} alt="cover" />
                                :
                                <div className='task-cover-color' style={{ background: `${cover.color}` }}>
                                </div>)}
                        <div className="task-preview-details">
                            <div className="task-title">{title}</div>
                            <button className="btn task-edit-icon" onClick={openTaskEditModal}>
                                <BiPencil />
                            </button>
                            {isBadge() &&
                                <TaskPreviewBadge task={task} />}
                        </div>
                    </div>
                </section >
            )}
        </Draggable>
    )
}