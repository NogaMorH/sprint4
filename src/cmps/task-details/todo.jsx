import { useState } from "react"
import { IoCloseOutline } from 'react-icons/io5'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

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
        <li className="todo-container">
            <input type="checkbox" name="isDone" onChange={handleChange} checked={isDone} />

            <div className="todo">
                <textarea className={`todo-textarea ${isDone && 'line-through'}`}
                    value={titleField}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />

                {focused &&
                    <div className="todo-buttons">
                        <button className="todo-save-btn">Save</button>
                        <span><IoCloseOutline /></span>
                    </div>
                }

                <button className='todo-remove-btn' onClick={() => removeTodo(id)}><HiOutlineDotsHorizontal /></button>
            </div>
        </li>
    )
}