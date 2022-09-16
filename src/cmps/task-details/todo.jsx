export const Todo = ({ todo, handleChange }) => {

    const { title, isDone } = todo

    return (
        <li className="todo">
            <input type="checkbox" checked={isDone} onChange={handleChange} />
            <p className="todo-txt">{title}</p>
        </li>
    )
}