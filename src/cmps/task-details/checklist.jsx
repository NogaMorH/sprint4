import { Todo } from "./todo"

export const Checklist = ({ checklist }) => {

    const { title, todos } = checklist

    const handleChange = () => {
        console.log('checkbox checked');
    }

    return (
        <div className="checklist">
            <h4>{title}</h4>
            <button>Delete</button>
            <ul className="todo-list">
                {todos.map(todo => (
                    <Todo key={todo.id} todo={todo} handleChange={handleChange} />
                ))}
            </ul>
        </div>
    )
}