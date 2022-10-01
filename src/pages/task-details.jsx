import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { setDynamicModal, updateTask } from '../store/board/board.actions'
import { TaskSideBar } from '../cmps/task-details/task-sidebar'
import { Members } from '../cmps/task-details/members'
import { Date } from '../cmps/task-details/date'
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

    const closeModal = (ev) => {
        ev.stopPropagation()
        if (dynamicModal.modalType) {
            dispatch(setDynamicModal({ modalTYpe: null, fromCmp: null }))
        }
    }

    const toggleCoverModal = () => {
        if (dynamicModal.modalType === 'cover') {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }
        dispatch(setDynamicModal({ modalType: 'cover', fromCmp: 'cover' }))
    }

    const handleTitleChange = ({ target }) => {
        setTaskTitle(target.value)
    }

    if (!board) return <div>Loading...</div>
    const task = boardService.getTask(board, groupId, taskId)
    const { title, dueDate, memberIds, attachments, checklists, description, cover, labelIds } = task

    return (
        <div className="black-screen" onClick={closeTaskDetails}>
            <div className="task-details-layout task-details-container" ref={ref} onClick={closeModal}>

                <div className='full task-details-cover'>
                    {dynamicModal.modalType === 'cover' && dynamicModal.fromCmp === 'cover' &&
                        <DynamicModal type='cover' groupId={groupId} taskId={taskId} closeModal={toggleCoverModal} />
                    }
                    <button className="close-task-details" onClick={closeTaskDetails}><IoCloseOutline /> </button>

                    <button className="btn btn-cover-modal" onClick={toggleCoverModal}>
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

                    <div className='task-title-subtitle'>
                        in list&nbsp;
                        <span>{boardService.getGroup(board, groupId).title}</span>
                    </div>
                </div>

                <main className='task-details'>
                    <div className="task-details-content">

                        <div className="content-info">
                            {memberIds?.length > 0 && <Members members={boardService.getTaskMembers(board, groupId, taskId)} />}

                            {labelIds?.length > 0 && <Labels board={board} />}
                        </div>

                        {dueDate && <Date dueDate={dueDate} />}

                        <Description description={description} />

                        {attachments?.length > 0 && <AttachmentList attachments={attachments} task={task} />}

                        {checklists && <ChecklistList checklists={checklists} />}
                    </div>

                    <TaskSideBar task={task} />
                </main>
            </div>
        </div>
    )
}