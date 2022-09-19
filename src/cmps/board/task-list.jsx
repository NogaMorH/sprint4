import { TaskPreview } from './task-preview'
import { HiPlus } from 'react-icons/hi'
import { useSelector } from 'react-redux'

export const TaskList = ({ tasks, groupId, openAddForm }) => {

    const formAdd = useSelector(state => state.systemModule.formAdd)

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
        </div>
    )
}
