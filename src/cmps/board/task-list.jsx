import { TaskPreview } from './task-preview'
// import { useState } from "react"


export const TaskList = ({ tasks, groupId }) => {

    // get members ids from the board.members and get only the members url

    return (
        <div className="task-list-container">
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id}>
                        <TaskPreview task={task} groupId={groupId} />
                    </li>

                ))}
            </ul>
            <div className="add-task-container">
                <button className="btn btn-add-task">Add a card</button>
            </div>
        </div>
    )
}
