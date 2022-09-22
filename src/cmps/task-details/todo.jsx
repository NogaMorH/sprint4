import { useState } from "react"
import { IoCloseOutline } from 'react-icons/io5'

export const Todo = ({ todo, updateTodos, removeTodo }) => {

    let { id, title, isDone } = todo
    const [titleField, setTitleField] = useState(title)
    const [focused, setFocused] = useState(false)

    const onFocus = () => setFocused(true)

    const onBlur = (ev) => {
        if (!ev.relatedTarget) {
            setTitleField(title)
            console.log('Checklist title canceled!')
        }
        else if (ev.relatedTarget.className === 'todo-save-btn') {
            todo = { ...todo, title: titleField }
            updateTodos(todo)
            console.log('Checklist title saved!')
        }
        setFocused(false)
    }

    const handleChange = ({ target }) => {
        let { name, value } = target
        if (name === 'isDone') {
            todo = { ...todo, isDone: !isDone }
            updateTodos(todo)
        } else {
            setTitleField(value)
        }
    }

    return (
        <li className="todo">
            <input type="checkbox" name="isDone" onChange={handleChange} checked={isDone} />

            <div className="todo">
                <textarea className="todo-textarea"
                    value={titleField}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />

                {!focused && <button className="todo-remove-btn" onClick={() => removeTodo(id)}>Delete</button>}

                {focused &&
                    <div className="todo-buttons">
                        <button className="todo-save-btn">Save</button>
                        <span><IoCloseOutline /></span>
                    </div>
                }
            </div>
        </li>
    )
}