

export const TaskPreview = ({task}) => {
    return (
        <ul>
            <li key={task.id}>
                <h4>{task.title}</h4>
                {/* <span>{formatTime(task.dueDate)}</span> */}
                {/* {<div>{task.memberIds.map(memberId => memberId)}</div> */}

            </li>
        </ul>
    )
}