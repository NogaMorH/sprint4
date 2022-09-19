import { useEffect, useState } from "react"
import { TodoList } from "./todo-list"
import { TbCheckbox } from 'react-icons/tb'

export const Checklist = ({ checklist, updateChecklists, removeChecklist }) => {

    const [currChecklist, setChecklist] = useState(checklist)
    let { title, todos } = currChecklist
    const [currTitle, setTitle] = useState(title)

    useEffect(() => {
        updateChecklist('title', currTitle)
    }, [currTitle])

    useEffect(() => {
        updateChecklists(currChecklist)
    }, [currChecklist])

    const handleTitleChange = ({ target }) => {
        setTitle(target.value)
    }

    const updateChecklist = (name, value) => {
        setChecklist(prevChecklist => ({ ...prevChecklist, [name]: value }))
    }

    return (
        <div className="checklist">
            <div className="checklist-title">
                <label>
                    <span className="checklist-title-icon"><TbCheckbox /></span>
                    <input type="text" name="title" placeholder="Todo..." value={currTitle} onChange={handleTitleChange} />
                </label>
                <button onClick={() => removeChecklist(currChecklist.id)}>Delete</button>
            </div>

            <TodoList todos={todos} updateChecklist={updateChecklist} />
        </div>
    )
}