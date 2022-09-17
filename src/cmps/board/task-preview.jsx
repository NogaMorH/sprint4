import { useSelector } from 'react-redux'
import { utilService } from '../../services/util.service'
import { boardService } from '../../services/board.service'
import descriptionIcon from '../../assets/img/description.svg'
import clockIcon from '../../assets/img/clock.svg'


import { Link } from 'react-router-dom'

export const TaskPreview = ({ task, groupId }) => {
    const board = useSelector(state => state.boardModule.board)

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        return monthAndDay
    }

    const { title, dueDate, memberIds, description, attachments } = task
    if (!task) return <div>Loading...</div>
    return (
        <section className='task-preview-container'>
            <Link to={`/board/${board._id}/group/${groupId}/task/${task.id}`}>
                <div className='task-preview'>
                    {attachments && attachments.map((attachment, idx) => {
                        if (attachment.isCover) {
                            return <img key={idx} className='task-cover-img' src={attachment.url} alt="cover" />
                        }
                    })}
                    <div className="task-preview-details">
                        <h4 className='task-title'>{title}</h4>
                        <div className="task-badge-container flex">
                            {dueDate &&
                                <span className='task-due-date'><img className='task-badge' src={clockIcon} alt="clock icon" />{getFormatDate(task.dueDate)}</span>
                            }
                            {description && <div className='task-badge'>
                                <img src={descriptionIcon} alt="description icon" />
                            </div>
                            }
                            <div className="member-avatar">
                                {memberIds && memberIds.map(memberId => (
                                    <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)} alt="profile img" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    )
}