export const ChecklistProgressBar = ({ checklist }) => {

    const value = checklist.todos.filter(todo => todo.isDone).length
    const max = checklist.todos.length

    return (
        <div className="progress-bar">
            <span>{(value / max) * 100}%</span>
            <progress value={value} max={max} />
        </div>
    )
}