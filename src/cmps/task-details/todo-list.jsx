import { utilService } from "../../services/util.service"
import { Todo } from "./todo"

export const TodoList = ({ todos, updateChecklist }) => {

    const updateTodos = (todo) => {
        const updatedTodos = todos.map(currTodo => {
            if (currTodo.id === todo.id) {
                return todo
            }
            return currTodo
        })
        updateChecklist('todos', updatedTodos)
    }

    const addTodo = () => {
        todos.push({ id: utilService.makeId(), title: '', isDone: false })
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
            <button className="add-todo-btn" onClick={addTodo}>Add an item</button>
        </div>
    )
}