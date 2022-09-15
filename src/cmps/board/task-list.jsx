import { TaskPreview } from './task-preview'
// import { useState } from "react"


export const TaskList = ({ tasks }) => {
    // get members ids from the board.members and get only the members url

    // const [date, setDate] = useState(new Date())

    // const formatTime = (milliSec) => {
    //     const date = new Date(milliSec)
    //     const month = date.getMonth() + 1
    //     const day = date.getDate()
    //     const mashu = month + day
    //     console.log('mashu:', mashu)

    //     }


    return (
        <ul className="task-list">
            {tasks.map(task => (
                <li key={task.id}>
                    <TaskPreview task={task} />
                </li>

            ))}
        </ul>
    )
}
