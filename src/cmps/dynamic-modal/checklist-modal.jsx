import { useEffect, useRef, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { updateTask } from "../../store/board/board.actions"

export const ChecklistModal = ({ groupId, taskId, closeModal }) => {

    const board = useSelector(state => state.boardModule.board)
    const [title, setTitle] = useState('Checklist')
    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    const onChange = ({ target }) => {
        setTitle(target.value)
    }

    const addChecklist = () => {
        const checklists = boardService.getTask(board, groupId, taskId).checklists
        const checklist = { id: utilService.makeId(), title, todos: [] }
        checklists.push(checklist)
        dispatch(updateTask(groupId, taskId, 'checklists', checklists))
        closeModal()
    }

    return (
        <div className='dynamic-modal checklist-modal'>
            <div className="dynamic-header">
                <h5>Add checklist</h5>
                <span onClick={closeModal}><IoCloseOutline /></span>
            </div>

            <div className="dynamic-content">
                <h6>Title</h6>
                <input className="dynamic-input" type="text" placeholder="Search members" ref={ref} value={title} onChange={onChange} />
                <button className="add-btn" onClick={addChecklist}>Add</button>
            </div>
        </div>
    )
}