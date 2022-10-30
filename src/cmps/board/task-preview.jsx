import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setModalTaskId } from '../../store/board/board.actions'
import { BiPencil } from 'react-icons/bi'

import { Loader } from '../loader'
import { Draggable } from 'react-beautiful-dnd'
import { TaskEditModal } from './task-edit-modal'
import { TaskPreviewBadge } from './task-preview-badge'
import { TaskPreviewLabels } from './task-preview-labels'

export const TaskPreview = ({ task, groupId, index }) => {

    const board = useSelector(state => state.boardModule.board)
    const modalTaskId = useSelector(state => state.systemModule.modalTaskId)
    const { cover, title, dueDate, labelIds, memberIds, description, attachments, id } = task
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openTaskEditModal = (ev) => {
        ev.stopPropagation()
        dispatch(setModalTaskId(task.id))
    }

    const closeTaskEditModal = (ev) => {
        ev.stopPropagation()
        dispatch(setModalTaskId(null))
    }

    const openTaskDetails = () => {
        navigate(`/board/${board._id}/group/${groupId}/task/${id}`)
    }

    const isBadge = () => {
        if (dueDate || description || memberIds || attachments) return true
        else return false
    }

    if (!task) return <Loader />
    return (
        <Draggable key={id} draggableId={id} index={index} isDragDisabled={modalTaskId !== null}>
            {(provided) => (

                <section
                    className="task-preview-container"
                    onClick={openTaskDetails}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {modalTaskId === id &&
                        <TaskEditModal
                            task={task}
                            groupId={groupId}
                            closeTaskEditModal={(ev) => closeTaskEditModal(ev)}
                            isBadge={isBadge}
                        />
                    }

                    <div className="task-preview">
                        {cover &&
                            (cover.img ?
                                <img className="task-cover-img" src={cover.img} alt="cover" />
                                :
                                <div className="task-cover-color" style={{ background: `${cover.color}` }} />
                            )
                        }

                        <div className="task-preview-details">
                            <button
                                className={cover ? "btn task-edit-icon on-cover" : "btn task-edit-icon"}
                                onClick={openTaskEditModal}
                            >
                                <BiPencil />
                            </button>

                            {labelIds &&
                                <TaskPreviewLabels board={board} groupId={groupId} taskId={task.id} />
                            }

                            <div className="task-title">{title}</div>

                            {isBadge() &&
                                <TaskPreviewBadge board={board} task={task} groupId={groupId} />
                            }
                        </div>
                    </div>
                </section >
            )}
        </Draggable>
    )
}