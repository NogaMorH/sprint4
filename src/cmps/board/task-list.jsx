import { TaskPreview } from './task-preview'
import { HiPlus } from 'react-icons/hi'
// import { useState } from "react"



export const TaskList = ({ tasks, groupId }) => {
    if (!tasks) return <div></div>
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
                <button className="btn btn-add-task"><HiPlus className='plus-icon' /> Add a card </button>
            </div>
        </div>
    )
}
