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
import { Labels } from '../cmps/task-details/labels'
import { Loader } from "../cmps/loader"
import { Cover } from '../cmps/task-details/cover'

export const TaskDetails = () => {

    const board = useSelector(state => state.boardModule.board)
    const dynamicModal = useSelector(state => state.systemModule.dynamicModal)
    const [taskTitle, setTaskTitle] = useState('')
    const { groupId, taskId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    const handleTitleChange = ({ target }) => {
        setTaskTitle(target.value)
    }

    if (!board) return <Loader />
    const task = boardService.getTask(board, groupId, taskId)
    const { title, dueDate, memberIds, attachments, checklists, description, cover, labelIds } = task

    return (
        <div className="black-screen" onClick={closeTaskDetails}>
            <div className="task-details-wrapper">
                <div className="task-details-layout task-details-container" ref={ref} onClick={closeModal}>

                    <Cover cover={cover} />

                    <div className="task-title">
                        <BiCreditCardFront className="task-title-icon" />
                        <input className="task-title-header" type="text" value={taskTitle} onChange={handleTitleChange} />

                        <div className="task-title-subtitle">
                            in list&nbsp;
                            <span>{boardService.getGroup(board, groupId).title}</span>
                        </div>
                    </div>

                    <main className="task-details">
                        <div className="task-details-content">

                            <div className="content-info">
                                {memberIds?.length > 0 && <Members members={boardService.getTaskMembers(board, groupId, taskId)} />}

                                {labelIds?.length > 0 && <Labels board={board} />}
                            </div>

                            {dueDate && <Date dueDate={dueDate} />}

                            <Description description={description} />

                            {attachments?.length > 0 && <AttachmentList attachments={attachments} />}

                            {checklists && <ChecklistList checklists={checklists} />}
                        </div>

                        <TaskSideBar />
                    </main>
                </div>

                <div className="task-details-margin-bottom" />
            </div>
        </div>
    )
}