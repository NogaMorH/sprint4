import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { loadBoard, removeTask, addBoard, updateBoard, removeBoard, saveTask } from '../store/board/board.actions'
import { utilService } from '../services/util.service'
import { TaskSideBar } from '../cmps/board/task-sidebar'
import { Checklist } from '../cmps/task-details/checklist'
import cardIcon from '../assets/img/card.svg'

export const TaskDetails = () => {

    let board = useSelector(state => state.boardModule.board)
    const [task, setTask] = useState(null)
    const [currChecklists, setChecklists] = useState(null)
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
        if (!currChecklists) return
        setTask(prevTask => ({ ...prevTask, checklists: currChecklists }))
    }, [currChecklists])

    useEffect(() => {
        if (!task) return
        dispatch(saveTask(groupId, task))
    }, [task])

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        const time = utilService.formatAMPM(dueDate)
        return monthAndDay + ' at ' + time
    }

    if (!task) return <div>Loading...</div>

    const { title, dueDate, memberIds, attachments, checklists, description } = task

    // update Checklists-List with checklist
    const updateChecklists = (checklist) => {
        setChecklists(checklists)
        setChecklists(prevChecklists => (
            prevChecklists.map(currChecklist => {
                if (currChecklist.id === checklist.id) {
                    return checklist
                }
                return currChecklist
            })
        ))
    }

    const removeChecklist = (checklistId) => {
        const updatedChecklists = currChecklists.filter(currChecklist => currChecklist.id !== checklistId)
        setChecklists(updatedChecklists)
    }

    const toggleCover = (attachmentIdx) => {
        const attachment = attachments[attachmentIdx]
        attachment.isCover = !attachment.isCover

        attachments.forEach((attachment, index) => {
            if (index === attachmentIdx) return
            if (attachment.isCover) attachment.isCover = false
        })
        setTask(prevTask => ({ ...prevTask, attachments }))
    }

    function checkURL(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    const removeAttachment = (attachmentIdx) => {
        const updatedAttachments = attachments.filter((attachment, idx) => idx !== attachmentIdx)
        setTask(prevTask => ({ ...prevTask, attachments: updatedAttachments }))
    }

    return (
        <div className="task-details-layout task-details">
            <div className='full task-details-cover'>
                {attachments && attachments.map((attachment, idx) => {
                    if (attachment.isCover) {
                        return <img key={idx} className='task-cover-img' src={attachment.url} alt="cover" />
                    }
                })}
            </div>

            <main className='task-details-content'>
                <div className='task-title-container'>
                    {/* <img src={cardIcon} alt='' className='card-icon' /> */}
                    <h3 className='task-title'>{title}</h3>
                    <div className='task-subtitle'>in list {boardService.getGroup(board, groupId).title}</div>
                </div>

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

                {attachments &&
                    <div className="attachment-container">
                        <h4>Attachments</h4>
                        {attachments.map((attachment, idx) => {
                            return (
                                <div key={idx} className="attachment">
                                    {/* remove the ! from the boolean - exists only for testing */}
                                    {/* {console.log('checkURL:', checkURL(attachment.url))} */}
                                    {!checkURL(attachment.url) ?
                                        <div>
                                            <img src={attachment.url} alt="attachment" />
                                            <button onClick={() => toggleCover(idx)}>{attachment.isCover ? 'Remove cover' : 'Make cover'}</button>
                                        </div>
                                        :
                                        <img src="data:image/jpeg;base64,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" alt="attachment" />
                                    }
                                    <button onClick={() => removeAttachment(idx)}>Delete</button>
                                    <a href={attachment.url} target="_blank">Link</a>
                                </div>
                            )
                        })}
                        <button className='add-attachment-btn' >Add an attachment</button>
                    </div>
                }

                {checklists &&
                    <div className="checklist-list">
                        {checklists.map(checklist => (
                            <Checklist key={checklist.id}
                                checklist={checklist}
                                updateChecklists={updateChecklists}
                                removeChecklist={removeChecklist}
                            />
                        ))}
                    </div>
                }
            </main>
            <div className="task-side-bar">
                <TaskSideBar />
            </div>
        </div>
    )
}