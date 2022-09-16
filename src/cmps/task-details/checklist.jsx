import { useEffect, useState } from "react"
import { utilService } from "../../services/util.service"
import { Todo } from "./todo"

export const Checklist = ({ checklist, updateChecklists, removeChecklist }) => {

    const [currChecklist, setChecklist] = useState(checklist)
    let { title, todos } = currChecklist
    const [currTodos, setTodos] = useState(todos)

    useEffect(() => {
        // update Checklist with todos
        setChecklist(prevChecklist => ({ ...prevChecklist, todos: currTodos }))
    }, [currTodos])

    useEffect(() => {
        // update Checklist-list
        updateChecklists(currChecklist)
    }, [currChecklist])

    const updateTodos = (todo) => {
        // update Todos with todo
        setTodos(prevTodos => (
            prevTodos.map(currTodo => {
                if (currTodo.id === todo.id) {
                    return todo
                }
                return currTodo
            })
        ))
    }

    const removeTodo = (todoId) => {
        const todos = currTodos.filter(currTodo => currTodo.id !== todoId)
        setTodos(todos)
        // const updatedTodos = currTodos.filter(currTodo => currTodo.id !== todoId)
        // setTodos(updatedTodos)
    }

    const addTodo = () => {
        setTodos(prevTodos => ([...prevTodos, { id: utilService.makeId(), title: '', isDone: false }]))
    }

    return (
        <div className="checklist">
            <h4>{title}</h4>
            <button onClick={() => removeChecklist(currChecklist.id)}>Delete</button>
            <ul className="todo-list">
                {currTodos.map(todo => (
                    <Todo key={todo.id} todo={todo} updateTodos={updateTodos} removeTodo={removeTodo} />
                ))}
            </ul>
            <button id="todo-list-add-btn" onClick={addTodo}>Add an item</button>
        </div>
    )
}