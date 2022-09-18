import { useEffect, useState } from "react"
import { TodoList } from "./todo-list"

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

    const updateChecklist = (name, value) => {
        setChecklist(prevChecklist => ({ ...prevChecklist, [name]: value }))
    }

    const handleTitleChange = ({ target }) => {
        setTitle(target.value)
    }

    return (
        <div className="checklist">
            <div className="checklist-title">
                {/* <span>add task icon</span> */}
                <input type="text" name="title" placeholder="Todo..." value={currTitle} onChange={handleTitleChange} />
                <button onClick={() => removeChecklist(currChecklist.id)}>Delete</button>
            </div>

            <TodoList todos={todos} updateChecklist={updateChecklist} />
        </div>
    )
}