import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { useSelector } from "react-redux"
import { FiClock } from 'react-icons/fi'
import { GrTextAlignFull } from 'react-icons/gr'
import { ImAttachment } from 'react-icons/im'

export const TaskPreviewBadge = ({ task }) => {

    const board = useSelector(state => state.boardModule.board)

    const { title, dueDate, memberIds, description, attachments, id, checklists } = task

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        return monthAndDay
    }


    // const getDoneChecklistCount = (ev) => {
    //     ev.stopPropagation()
    //    const checklistLength =  checklists.map(currChecklist => {
    //        return currChecklist.todos.length
    //     })
    //     const length = checklistLength.reduce((acc, num) => {
    //         console.log('num:', num)
    //         console.log('acc:', acc)
    //         return acc+num
    //     })
        
    //     const check = checklists.checklist[]
        
        //  checklists.chcklist.todos.map(todo => {
            //     if (todo.isDone) return counter++
            //     else console.log('not done!')
            
            //  })
            
        //     console.log('length:', length)
        //     console.log('checklistLength:', checklistLength)
        //     let doneTasks 
        //     let counter=0

        //     checklistLengthreduce((counter , todo) => {
        //     if(todo.isDone) return counter++
            
        //  },counter)
        //  console.log('counter:', counter)


        //  let counter = checklists.todos.filter(todo => {
        //     if(todo.idDone) 
        
    
    
    return (
        <div className="task-badge-container flex">
            <div className='task-badges'>
                {dueDate && dueDate.ms &&
                    <span className='task-due-date'>
                        <span className='clock-badge'>
                            <FiClock />
                        </span>
                        {getFormatDate(task.dueDate.ms)}
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
                    </span>}
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