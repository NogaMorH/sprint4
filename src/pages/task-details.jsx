import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { loadBoard, setModalAttachmentIdx, toggleBlackScreen, updateTask } from '../store/board/board.actions'
import { TaskSideBar } from '../cmps/task-details/task-sidebar'
import { Members } from '../cmps/task-details/members'
import { DueDate } from '../cmps/task-details/due-date'
import { Description } from '../cmps/task-details/description'
import { AttachmentList } from '../cmps/task-details/attachment-list'
import { ChecklistList } from '../cmps/task-details/checklist-list'
import { BiCreditCardFront } from 'react-icons/bi'
// import { useHistory } from "react-router-dom"

export const TaskDetails = () => {

    const board = useSelector(state => state.boardModule.board)
    const [taskTitle, setTaskTitle] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const history = useHistory() // useHistory not working !!!
    const params = useParams()
    const { boardId, groupId, taskId } = params
    const ref = useRef()

    useEffect(() => {
        dispatch(loadBoard(boardId))
        setTimeout(openTaskDetails, 1)
        // console.log('history:', history);
        // history.push(`/board/${board._id}`)
    }, [])

    useEffect(() => {
        if (!board) return
        setTaskTitle(title)
    }, [board])

    useEffect(() => {
        if (!board || !taskTitle) return
        dispatch(updateTask(groupId, taskId, 'title', taskTitle))
    }, [taskTitle])

    const openTaskDetails = () => {
        dispatch(toggleBlackScreen())
        document.addEventListener('click', closeTaskDetails)
        // ref.current.addEventListener('click', closeAttachmentEditModal)
    }

    const closeTaskDetails = () => {
        dispatch(toggleBlackScreen())
        document.removeEventListener('click', closeTaskDetails)
        navigate(`/board/${board._id}`)
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
    const { title, dueDate, memberIds, attachments, checklists, description } = boardService.getTask(board, groupId, taskId)

    return (
        <div className="task-details-layout task-details-container" ref={ref} onClick={(ev) => ev.stopPropagation()}>
            <div className='full task-details-cover'>
                {attachments && attachments.map((attachment, idx) => {
                    if (attachment.isCover) {
                        return <img key={idx} className='task-cover-img' src={attachment.url} alt="cover" />
                    }
                })}
            </div>

            <div className='task-title'>
                <span className='task-title-icon'><BiCreditCardFront /></span>
                <input className='task-title-header' type="text" value={taskTitle} onChange={handleTitleChange} />
                <div className='task-title-subtitle'>in list {boardService.getGroup(board, groupId).title}</div>
            </div>

            <main className='task-details'>
                <div className="task-details-content">
                    {memberIds && <Members board={board} memberIds={memberIds} />}

                    {dueDate && <DueDate dueDate={dueDate} />}

                    <Description description={description} />

                    {attachments && <AttachmentList attachments={attachments} />}

                    {checklists && <ChecklistList checklists={checklists} />}
                </div>

                <TaskSideBar />
            </main>
        </div>
    )
}