import { useEffect, useState } from "react"
import { TodoList } from "./todo-list"
import { TbCheckbox } from 'react-icons/tb'

export const Checklist = ({ checklist, updateChecklists, removeChecklist }) => {

    // const [currChecklist, setChecklist] = useState(checklist)
    // let { title, todos } = currChecklist
    let { title, todos } = checklist
    // const [currTitle, setTitle] = useState(title)

    // useEffect(() => {
    //     updateChecklist('title', currTitle)
    // }, [currTitle])

    // useEffect(() => {
    //     updateChecklists(currChecklist)
    // }, [currChecklist])

    const handleTitleChange = ({ target }) => {
        // setTitle(target.value)
        // later move this to save title function !!!
        updateChecklist('title', target.value)
    }

    const updateChecklist = (name, value) => {
        // setChecklist(prevChecklist => ({ ...prevChecklist, [name]: value }))
        // console.log('name, value:', name, value);
        checklist = { ...checklist, [name]: value }
        updateChecklists(checklist)
    }

    return (
        <div className="checklist">
            <div className="checklist-title">
                <label>
                    <span className="checklist-title-icon"><TbCheckbox /></span>
                    {/* <input type="text" name="title" placeholder="Todo..." value={currTitle} onChange={handleTitleChange} /> */}
                    <input type="text" name="title" placeholder="Todo..." value={title} onChange={handleTitleChange} />
                </label>
                {/* <button onClick={() => removeChecklist(currChecklist.id)}>Delete</button> */}
                <button onClick={() => removeChecklist(checklist.id)}>Delete</button>
            </div>

            <TodoList todos={todos} updateChecklist={updateChecklist} />
        </div>
    )
}