import { TodoList } from "./todo-list"
import { TbCheckbox } from 'react-icons/tb'

export const Checklist = ({ checklist, updateChecklists, removeChecklist }) => {

    let { title, todos } = checklist

    const handleTitleChange = ({ target }) => {
        // later move this to save title function !!!
        updateChecklist('title', target.value)
    }

    const updateChecklist = (name, value) => {
        checklist = { ...checklist, [name]: value }
        updateChecklists(checklist)
    }

    return (
        <div className="checklist">
            <div className="checklist-title">
                <label>
                    <span className="checklist-title-icon"><TbCheckbox /></span>
                    <input type="text" name="title" placeholder="Todo..." value={title} onChange={handleTitleChange} />
                </label>
                <button onClick={() => removeChecklist(checklist.id)}>Delete</button>
            </div>

            <TodoList todos={todos} updateChecklist={updateChecklist} />
        </div>
    )
}