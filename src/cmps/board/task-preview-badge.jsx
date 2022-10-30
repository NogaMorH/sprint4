import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { updateTask } from "../../store/board/board.actions"

import { FiClock } from 'react-icons/fi'
import { GrTextAlignFull } from 'react-icons/gr'
import { ImAttachment } from 'react-icons/im'
import { TbCheckbox } from 'react-icons/tb'
import { FaRegSquare } from 'react-icons/fa'

export const TaskPreviewBadge = ({ task, groupId }) => {

    const board = useSelector(state => state.boardModule.board)
    const { dueDate, memberIds, description, attachments, checklists } = task
    const dispatch = useDispatch()

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
            <div className="task-badges">

                {dueDate?.ms &&
                    <div className="task-date" style={getDateStyle()} onClick={toggleIsDone}>
                        <FiClock className="clock-badge" />

                        {dueDate.isDone ?
                            <TbCheckbox className="checklist-badge" />
                            :
                            <FaRegSquare className="checklist-badge-empty" />
                        }

                        <span className="task-date-time">{utilService.formatMonthDay(dueDate.ms)}</span>
                    </div>
                }

                {description &&
                    <GrTextAlignFull className="description-badge" />
                }

                {attachments?.length > 0 &&
                    <div className="task-attachment">
                        <ImAttachment className="attachment-badge" />
                        {attachments.length}
                    </div>
                }

                {checklists?.length > 0 &&
                    <div className="checklist-count-container">
                        <TbCheckbox className="checklist-badge" />
                        <span className="checklist-count">{getTotalTasks()}</span>
                    </div>
                }
            </div>

            <div className="member-avatar-list">
                {memberIds &&
                    memberIds.map(memberId => (
                        <img key={memberId}
                            src={boardService.getMemberImgUrl(board, memberId)}
                            alt="profile img"
                        />
                    ))}
            </div>
        </div>
    )
}