import { useEffect, useState } from "react"
import { utilService } from "../../services/util.service"
import { Todo } from "./todo"

export const Checklist = ({ checklist, updateChecklists, removeChecklist }) => {

    const [currChecklist, setChecklist] = useState(checklist)
    let { title, todos } = currChecklist
    const [currTitle, setTitle] = useState(title)
    const [currTodos, setTodos] = useState(todos)

    // update Checklis's title
    useEffect(() => {
        setChecklist(prevChecklist => ({ ...prevChecklist, title: currTitle }))
    }, [currTitle])

    // update Checklist's' todos
    useEffect(() => {
        setChecklist(prevChecklist => ({ ...prevChecklist, todos: currTodos }))
    }, [currTodos])

    // update Checklist-list
    useEffect(() => {
        updateChecklists(currChecklist)
    }, [currChecklist])

    // update Todos with todo
    const updateTodos = (todo) => {
        setTodos(prevTodos => (
            prevTodos.map(currTodo => {
                if (currTodo.id === todo.id) {
                    return todo
                }
                return currTodo
            })
        ))
    }

    const addTodo = () => {
        setTodos(prevTodos => ([...prevTodos, { id: utilService.makeId(), title: '', isDone: false }]))
    }

    const removeTodo = (todoId) => {
        const updatedTodos = currTodos.filter(currTodo => currTodo.id !== todoId)
        setTodos(updatedTodos)
    }

    const handleTitleChange = ({ target }) => {
        setTitle(target.value)
    }

    return (
        <div className="checklist">
            <div className="checklist-title">
                <input type="text" name="title" placeholder="Todo..." value={currTitle} onChange={handleTitleChange} />
                <button onClick={() => removeChecklist(currChecklist.id)}>Delete</button>
            </div>
            <ul className="todo-list">
                {currTodos.map(todo => (
                    <Todo key={todo.id} todo={todo} updateTodos={updateTodos} removeTodo={removeTodo} />
                ))}
            </ul>
            <button className="checklist-add-todo-btn" onClick={addTodo}>Add an item</button>
        </div>
    )
}