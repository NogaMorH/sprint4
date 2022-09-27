import { useState } from "react"
import { utilService } from "../../services/util.service"
import { Todo } from "./todo"

export const TodoList = ({ todos, updateChecklist }) => {

    const [title, setTitle] = useState('')
    const [focused, setFocused] = useState(false)

    const updateTodos = (todo) => {
        console.log('todo:', todo);
        const updatedTodos = todos.map(currTodo => {
            if (currTodo.id === todo.id) {
                return todo
            }
            return currTodo
        })
        updateChecklist('todos', updatedTodos)
    }

    const onFocus = () => setFocused(true)

    const onBlur = (ev) => {
        setFocused(false)
        if (ev.relatedTarget?.className === 'todo-add-btn') {
            addTodo()
            setTitle('')
        }
    }

    const handleChange = ({ target }) => {
        setTitle(target.value)
    }

    const addTodo = () => {
        todos.push({ id: utilService.makeId(), title, isDone: false })
        updateChecklist('todos', todos)
    }

    const removeTodo = (todoId) => {
        const updatedTodos = todos.filter(currTodo => currTodo.id !== todoId)
        updateChecklist('todos', updatedTodos)
    }

    return (
        <div className="todo-list-container">
            <ul className="todo-list">
                {todos.map(todo => (
                    <Todo key={todo.id} todo={todo} updateTodos={updateTodos} removeTodo={removeTodo} />
                ))}
            </ul>
            {!focused && <button className="add-todo-btn" onClick={onFocus}>Add an item</button>}

            {focused &&
                <div className="new-todo">
                    <textarea className='new-todo-textarea'
                        placeholder="Add an item"
                        value={title}
                        onChange={handleChange}
                        onBlur={onBlur}
                        autoFocus
                    />

                    <div className="new-todo-buttons">
                        <button className="todo-add-btn">Add</button>
                        <button className="todo-cancel-btn">Cancel</button>
                    </div>
                </div>
            }
        </div>
    )
}