import { useSelector } from 'react-redux'
import { utilService } from '../../services/util.service'
import { boardService } from '../../services/board.service'
import descriptionSvg from '../../assets/img/description.svg'
import clockSvg from '../../assets/img/clock.svg'



export const TaskPreview = ({ task }) => {
    const board = useSelector(state => state.boardModule.board)

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        return monthAndDay
    }




    const { title, dueDate, memberIds, description } = task
    if (!task) return <div>Loading...</div>
    return (
        <section className='task-preview-container'>
            <div className='task-preview'>

                {task.attachment && task.attachment.isCover &&
                    < img src={task.attachment.url} alt="" />
                }
                <h4 className='task-title'>{title}</h4>
                <div className="task-badge-container flex">
                    {dueDate &&
                        <span> <img className='task-badge' src={clockSvg} alt="" />{getFormatDate(task.dueDate)}</span>
                    }
                    {description && <div className='task-badge'>
                        <img src={descriptionSvg} alt="" />
                    </div>
                    }
                </div>
                <div className="member-avatar">
                    {memberIds && memberIds.map(memberId => (
                        <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)} alt="profile img" />
                    ))}
                </div>


            </div>
        </section>
    )
}