import { useEffect, useState } from "react"

export const Todo = ({ todo, updateTodos, removeTodo }) => {

    const [currTodo, setTodo] = useState(todo)
    let { id, title, isDone } = currTodo

    useEffect(() => {
        updateTodos(currTodo)
    }, [currTodo])

    const handleChange = ({ target }) => {
        let { name, value } = target
        if (name === 'isDone') value = !isDone
        setTodo(prevTodo => ({ ...prevTodo, [name]: value }))
    }

    return (
        <li className="todo">
            <input type="checkbox" name="isDone" onChange={handleChange} checked={isDone} />
            <input type="text" name="title" placeholder="Todo..." value={title} onChange={handleChange} />
            <button id="todo-remove-btn" onClick={() => removeTodo(id)}>Remove</button>
        </li>
    )
}