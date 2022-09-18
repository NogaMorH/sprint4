import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { loadBoard, removeTask, addBoard, updateBoard, removeBoard, saveTask } from '../store/board/board.actions'
import { utilService } from '../services/util.service'
import { TaskSideBar } from '../cmps/board/task-sidebar'
import cardIcon from '../assets/img/card.svg'
import { Attachment } from '../cmps/task-details/attachment'
import { ChecklistList } from '../cmps/task-details/checklist-list'

export const TaskDetails = () => {

    const board = useSelector(state => state.boardModule.board)
    const [task, setTask] = useState(null)
    const dispatch = useDispatch()
    const params = useParams()
    const { boardId, groupId, taskId } = params

    useEffect(() => {
        dispatch(loadBoard(boardId))
    }, [])

    useEffect(() => {
        if (!board) return
        const task = boardService.getTask(board, groupId, taskId)
        setTask(task)
    }, [board])

    useEffect(() => {
        if (!task) return
        dispatch(saveTask(groupId, task))
    }, [task])

    if (!task) return <div>Loading...</div>
    const { title, dueDate, memberIds, attachments, checklists, description } = task

    const updateTask = (name, value) => {
        setTask(prevTask => ({ ...prevTask, [name]: value }))
    }

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        const time = utilService.formatAMPM(dueDate)
        return monthAndDay + ' at ' + time
    }

    return (
        <div className="task-details-layout task-details-container">
            <div className='full task-details-cover'>
                {attachments && attachments.map((attachment, idx) => {
                    if (attachment.isCover) {
                        return <img key={idx} className='task-cover-img' src={attachment.url} alt="cover" />
                    }
                })}
            </div>

            <div className='task-title'>
                {/* <img src={cardIcon} alt='' className='card-icon' /> */}
                <h3 className='task-title-header'>{title}</h3>
                <div className='task-title-subtitle'>in list {boardService.getGroup(board, groupId).title}</div>
            </div>

            <main className='task-details'>
                <div className="task-details-content">

                    {memberIds &&
                        <div className="members">
                            <h6>Members</h6>
                            <div className="members-profile-img">
                                {memberIds.map(memberId => (
                                    <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)} alt="profile img" />
                                ))}
                            </div>
                        </div>
                    }

                    {dueDate &&
                        <div className="date-container">
                            <h6>Due date</h6>
                            <div className="date">
                                <input type="checkbox" />
                                <button>{getFormatDate(dueDate)}</button>
                            </div>
                            {/* <input type="text" value={getFormatDate(dueDate)} /> */}
                        </div>
                    }

                    <div className="description">
                        <div className="description-header">
                            <h4>Description</h4>
                            {description &&
                                <button>Edit</button>
                            }
                        </div>
                        <pre>{description}</pre>
                    </div>

                    {attachments && <Attachment attachments={attachments} updateTask={updateTask} />}

                    {checklists && <ChecklistList checklists={checklists} updateTask={updateTask} />}
                </div>

                <TaskSideBar />
            </main>
        </div>
    )
}