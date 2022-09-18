import { useEffect, useState } from "react"
import { utilService } from "../../services/util.service"
import { Todo } from "./todo"

export const TodoList = ({ todos, updateChecklist }) => {

    const [currTodos, setTodos] = useState(todos)

    useEffect(() => {
        updateChecklist('todos', currTodos)
    }, [currTodos])

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

    return (
        <div className="todo-list-container">
            <ul className="todo-list">
                {currTodos.map(todo => (
                    <Todo key={todo.id} todo={todo} updateTodos={updateTodos} removeTodo={removeTodo} />
                ))}
            </ul>
            <button className="add-todo-btn" onClick={addTodo}>Add an item</button>
        </div>
    )
}