import { useSelector } from 'react-redux'
import { utilService } from '../../services/util.service'
import { boardService } from '../../services/board.service'

export const TaskPreview = ({ task }) => {
    const board = useSelector(state => state.boardModule.board)

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        return monthAndDay
    }


    const { title, dueDate, memberIds } = task
    if (!task) return <div>Loading...</div>
    return (
        <section className='task-preview-container'>
            <div className='task-preview'>
                <h4 className='task-title'>{title}</h4>
                {task.attachment && task.attachment.isCover &&
                    < img src={task.attachment.url} alt="" />
                }
                <div className="task-badge">
                    {dueDate && <span>{getFormatDate(task.dueDate)}</span>}
                </div>
                <div className="task-preview-members">
                    {memberIds && memberIds.map(memberId => (
                        <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)} alt="profile img" />
                    ))}
                </div>


            </div>
        </section>
    )
}