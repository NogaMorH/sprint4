import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { useSelector } from "react-redux"
import { FiClock } from 'react-icons/fi'
import { GrTextAlignFull } from 'react-icons/gr'
import { ImAttachment } from 'react-icons/im'
import { TbCheckbox } from 'react-icons/tb'
import { FaRegSquare } from 'react-icons/fa'
import { updateTask } from "../../store/board/board.actions"
import { useDispatch } from "react-redux"


export const TaskPreviewBadge = ({ task, groupId }) => {

    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()

    const { title, dueDate, memberIds, description, attachments, id, checklists } = task

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        return monthAndDay
    }

    const getTotalTasks = () => {
        const checklistLength = checklists.map(currChecklist => {
            return currChecklist.todos.length
        })
        const length = checklistLength.reduce((acc, num) => {
            return acc + num
        }, 0)

        let counter = 0
        checklists.map(checklist => {
            checklist.todos.map(todo => {
                if (todo.isDone) counter++
            })
        })
        return counter + '/' + length
    }

    const getDateStyle = () => {
        const difference = dueDate.ms - new window.Date().getTime()
        let backgroundColor
        let color = '#fff'

        if (dueDate.isDone) {
            backgroundColor = '#61BD4F'
        }
        else if (Math.sign(difference) === -1) {
            backgroundColor = '#EB5A46'
        }
        else if (difference < 86400000 && difference > 0) {
            backgroundColor = '#F2D600'
        } else {
            backgroundColor = '#f4f5f7'
            color = '#5e6c84'
        }

        return { backgroundColor, color }
    }

    const toggleIsDone = (ev) => {
        ev.stopPropagation()
        dispatch(updateTask(groupId, task.id, 'dueDate', { ...dueDate, isDone: !dueDate.isDone }))
    }

    return (
        <div className="task-badge-container flex">
            <div className='task-badges'>
                {dueDate?.ms &&
                    <span className='task-due-date' style={getDateStyle()} onClick={toggleIsDone}>
                        <span className='clock-badge'><FiClock /></span>

                        {dueDate.isDone ?
                            <span className='checklist-badge'><TbCheckbox /></span>
                            :
                            <span className='checklist-badge-empty'><FaRegSquare /></span>
                        }
                        <span className="task-due-date-date">{getFormatDate(task.dueDate.ms)}</span>
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
                    </span>
                }
                {checklists?.length > 0 &&
                    <span className="checklist-count-container">
                        <span><TbCheckbox className="checklist-badge" /></span>
                        <span className="checklist-count">{getTotalTasks()}</span>
                    </span>
                }
            </div>
            <div className="member-avatar">
                {memberIds && memberIds.map(memberId => (
                    <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)}
                        alt="profile img" />
                ))}
            </div>
        </div>
    )
}