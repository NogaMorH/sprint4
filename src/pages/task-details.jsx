import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { loadBoard, removeTask, addBoard, updateBoard, removeBoard } from '../store/board/board.actions'
import { utilService } from '../services/util.service'
import { TaskAction } from '../cmps/board/task-action'
import { Checklist } from '../cmps/task-details/checklist'

export const TaskDetails = () => {

    let board = useSelector(state => state.boardModule.board)
    const [task, setTask] = useState(null)
    const [currChecklists, setChecklists] = useState(null)
    const dispatch = useDispatch()
    const params = useParams()
    const { boardId, groupId, taskId } = params

    useEffect(() => {
        loadTask(boardId, groupId, taskId)
    })

    useEffect(() => {
        if (!currChecklists) return
        setTask(prevTask => {
            // console.log('prevTask:', prevTask);
            // console.log('currChecklists:', currChecklists);
            return { ...prevTask, checklists: currChecklists }
        })
        // setTask(prevTask => ({ ...prevTask, checklists: currChecklists }))

    }, [currChecklists])

    useEffect(() => {
        // console.log('task:', task);
        // dispatch()
    }, [task])

    const loadTask = async (boardId, groupId, taskId) => {
        const task = await boardService.getTaskById(boardId, groupId, taskId)
        setTask(task)
        // dispatch - update board ????
    }

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        const time = utilService.formatAMPM(dueDate)
        return monthAndDay + ' at ' + time
    }

    // temporary for task-details page
    if (!board) dispatch(loadBoard(boardId)).then(currBoard => board = currBoard)
    if (!board || !task) return <div>Loading...</div>

    const { title, dueDate, memberIds, attachment, checklists, description } = task

    const updateChecklists = (checklist) => {
        // console.log('checklist:', checklist);
        setChecklists(checklists)
        // if (!currChecklists) return
        // update Checklists-List with checklist
        setChecklists(prevChecklists => (
            prevChecklists.map(currChecklist => {
                if (currChecklist.id === checklist.id) {
                    return checklist
                }
                return currChecklist
            })
        ))
    }

    return (
        <div className="task-details">
            <img id='task-cover-img' src={attachment} alt="cover" />
            <h3 className='task-title'>{title}</h3>

            <div className="member-avatar">
                <h6>Members</h6>
                {memberIds.map(memberId => (
                    <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)} alt="profile img" />
                ))}
            </div>

            <div className="date-container">
                <h6>Due date</h6>
                <input type="checkbox" />
                <span className="date">{getFormatDate(dueDate)}</span>
                {/* <input type="text" value={getFormatDate(dueDate)} /> */}
            </div>

            <div className="description">
                <h4>Description</h4>
                <button>Edit</button>
                <pre>{description}</pre>
            </div>

            <div className="checklist-list">
                {checklists.map(checklist => (
                    <Checklist key={checklist.id} checklist={checklist} updateChecklists={updateChecklists} />
                ))}
            </div>

            {/* remove button for testing */}
            {/* <button onClick={() => dispatch(removeTask(groupId, taskId))}>remove</button> */}

            <TaskAction />
        </div>
    )
}