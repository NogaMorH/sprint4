import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { setDynamicModal, setModalAttachmentIdx, updateTask } from '../store/board/board.actions'
import { TaskSideBar } from '../cmps/task-details/task-sidebar'
import { Members } from '../cmps/task-details/members'
import { DueDate } from '../cmps/task-details/due-date'
import { Description } from '../cmps/task-details/description'
import { AttachmentList } from '../cmps/task-details/attachment-list'
import { ChecklistList } from '../cmps/task-details/checklist-list'
import { BiCreditCardFront } from 'react-icons/bi'
import { IoCloseOutline } from 'react-icons/io5'
import { Labels } from '../cmps/task-details/labels'
import { FiCreditCard } from 'react-icons/fi'
import { DynamicModal } from '../cmps/dynamic-modal/dynamic-modal'

export const TaskDetails = () => {

    const board = useSelector(state => state.boardModule.board)
    const dynamicModal = useSelector(state => state.systemModule.dynamicModal)
    const [taskTitle, setTaskTitle] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { groupId, taskId } = params
    const ref = useRef()

    useEffect(() => {
        if (!board) return
        setTaskTitle(title)
    }, [board])

    useEffect(() => {
        if (!board || !taskTitle) return
        if (taskTitle !== title) dispatch(updateTask(groupId, taskId, 'title', taskTitle))
    }, [taskTitle])

    const closeTaskDetails = () => {
        navigate(`/board/${board._id}`)
    }

    const toggleModal = () => {
        if (dynamicModal.modalType === 'cover') {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }
        dispatch(setDynamicModal({ modalType: 'cover', fromCmp: 'cover' }))
    }

    // const closeAttachmentEditModal = (ev) => {
    //     if (ev.target.className === 'attachment-modal-header' ||
    //         ev.target.className === 'attachment-modal-content' ||
    //         ev.target.className === 'update-btn') {
    //         return
    //     }
    //     dispatch(setModalAttachmentIdx(null))
    //     document.removeEventListener('click', closeAttachmentEditModal)
    // }

    const handleTitleChange = ({ target }) => {
        setTaskTitle(target.value)
    }

    if (!board) return <div>Loading...</div>
    const task = boardService.getTask(board, groupId, taskId)
    const { title, dueDate, memberIds, attachments, checklists, description, cover, labelIds } = task

    return (
        <div className="black-screen" onClick={closeTaskDetails}>
            <div className="task-details-layout task-details-container" ref={ref} onClick={(ev) => ev.stopPropagation()}>

                <div className='full task-details-cover'>
                    {dynamicModal.modalType === 'cover' && dynamicModal.fromCmp === 'cover' &&
                        <DynamicModal type='cover' groupId={groupId} taskId={taskId} closeModal={toggleModal} />
                    }
                    <button className="close-task-details" onClick={closeTaskDetails}><IoCloseOutline /> </button>
                    <button className="btn btn-cover-modal" onClick={toggleModal}>
                        <span className='cover-modal-icon'><FiCreditCard /></span>
                        Cover
                    </button>

                    {cover &&
                        (cover.img ?
                            <img className='task-cover-img' src={cover.img} alt="cover" />
                            :
                            <div className='task-cover-color' style={{ background: `${cover.color}` }}></div>
                        )
                    }
                </div>

                <div className='task-title'>
                    <span className='task-title-icon'><BiCreditCardFront /></span>
                    <input className='task-title-header' type="text" value={taskTitle} onChange={handleTitleChange} />
                    <div className='task-title-subtitle'>in list {boardService.getGroup(board, groupId).title}</div>
                </div>

                <main className='task-details'>
                    <div className="task-details-content">
                        {/* {memberIds && <Members board={board} memberIds={memberIds} />} */}
                        {memberIds && <Members members={boardService.getTaskMembers(board, groupId, taskId)} />}

                        {labelIds && labelIds.length > 0 && <Labels board={board} />}

                        {dueDate && <DueDate dueDate={dueDate} />}

                        <Description description={description} />

                        {attachments && <AttachmentList attachments={attachments} task={task} />}

                        {checklists && <ChecklistList checklists={checklists} />}
                    </div>

                    <TaskSideBar task={task} />
                </main>
            </div>
        </div>
    )
}