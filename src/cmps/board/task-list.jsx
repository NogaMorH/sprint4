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

    //onAddTask = () => {
        //on click adds a task to task list and renders the option to write task content
        //default task content is a text area place holder - "Enter a title for this card..."
        //when i press enter opens another task and an X button to close the new task
        //two way data binding

    // }


    return (
        <div className="task-list-container">
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id}>
                        <TaskPreview task={task} />
                    </li>

                ))}
            </ul>
            <div className="add-task-container">
                <button className="btn btn-add-task">Add a card</button>
            </div>
        </div>
    )
}
