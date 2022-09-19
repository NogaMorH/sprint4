import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { loadBoard, updateTask } from '../store/board/board.actions'
import { TaskSideBar } from '../cmps/board/task-sidebar'
import { Members } from '../cmps/task-details/members'
import { DueDate } from '../cmps/task-details/dueDate'
import { Description } from '../cmps/task-details/description'
import { Attachment } from '../cmps/task-details/attachment'
import { ChecklistList } from '../cmps/task-details/checklist-list'
import { BiCreditCardFront } from 'react-icons/bi'

export const TaskDetails = () => {

    const board = useSelector(state => state.boardModule.board)
    const [taskTitle, setTaskTitle] = useState('')
    const dispatch = useDispatch()
    const params = useParams()
    const { boardId, groupId, taskId } = params

    useEffect(() => {
        dispatch(loadBoard(boardId))
    }, [])

    useEffect(() => {
        if (!board) return
        setTaskTitle(title)
    }, [board])

    useEffect(() => {
        if (!board) return
        dispatch(updateTask(groupId, taskId, 'title', taskTitle))
    }, [taskTitle])

    const handleTitleChange = ({ target }) => {
        setTaskTitle(target.value)
    }

    if (!board) return <div>Loading...</div>
    // const { title, dueDate, memberIds, attachments, checklists, description } = boardService.getTask(board, groupId, taskId)
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    // console.log('----------------------------');
    // console.log('board:', board);
    // console.log('task:', task);
    const { title, dueDate, memberIds, attachments, checklists, description } = task

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
                <span className='task-title-icon'><BiCreditCardFront /></span>
                <input className='task-title-header' type="text" value={taskTitle} onChange={handleTitleChange} />
                <div className='task-title-subtitle'>in list {boardService.getGroup(board, groupId).title}</div>
            </div>

            <main className='task-details'>
                <div className="task-details-content">
                    {memberIds && <Members board={board} memberIds={memberIds} />}

                    {dueDate && <DueDate dueDate={dueDate} />}

                    <Description description={description} />

                    {attachments && <Attachment attachments={attachments} />}

                    {checklists && <ChecklistList checklists={checklists} />}
                </div>

                <TaskSideBar />
            </main>
        </div>
    )
}