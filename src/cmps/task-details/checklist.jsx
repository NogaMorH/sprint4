import { useState } from "react"
import { ChecklistProgressBar } from "./checklist-progress-bar"
import { TodoList } from "./todo-list"

import { TbCheckbox } from 'react-icons/tb'
import { IoCloseOutline } from 'react-icons/io5'

export const Checklist = ({ checklist, updateChecklists, removeChecklist }) => {

    let { title, todos } = checklist
    const [titleField, setTitleField] = useState(title)
    const [focused, setFocused] = useState(false)

    const onFocus = () => setFocused(true)

    const onBlur = (ev) => {
        if (!ev.relatedTarget) {
            setTitleField(title)
        }
        else if (ev.relatedTarget.className === 'checklist-title-save-btn') {
            updateChecklist('title', titleField)
        }

        setFocused(false)
    }

    const handleTitleChange = ({ target }) => {
        setTitleField(target.value)
    }

    const updateChecklist = (name, value) => {
        checklist = { ...checklist, [name]: value }
        updateChecklists(checklist)
    }

    return (
        <div className="checklist">

            <div className="checklist-title">
                <TbCheckbox className="checklist-title-icon" />

                <textarea className="checklist-title-textarea"
                    value={titleField}
                    onChange={handleTitleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />

                {!focused &&
                    <button className="delete-btn" onClick={() => removeChecklist(checklist.id)}>
                        Delete
                    </button>
                }

                {focused &&
                    <div className="checklist-title-buttons">
                        <button className="checklist-title-save-btn">Save</button>
                        <IoCloseOutline className="close-icon" />
                    </div>
                }
            </div>

            <ChecklistProgressBar checklist={checklist} />

            <TodoList todos={todos} updateChecklist={updateChecklist} />
        </div>
    )
}