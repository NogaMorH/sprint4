export const Checklists = ({ checklists, handleChange }) => {

    return (
        <div className="checklists-container">
            {checklists.map(checklist => (
                <div key={checklist.id} className="checklist">
                    <h4>{checklist.title}</h4>
                    <ul>
                        {checklist.todos.map(todo => {
                            return <li key={todo.id}>
                                <input type="checkbox" checked={todo.isDone} onChange={handleChange} />
                                <h6>{todo.title}</h6>
                            </li>
                        })}
                    </ul>
                </div>
            ))}
        </div>
    )
}