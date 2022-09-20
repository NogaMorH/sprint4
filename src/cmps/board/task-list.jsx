import { TaskPreview } from './task-preview'
import { HiPlus } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'


export const TaskList = ({ tasks, groupId }) => {

    const formAdd = useSelector(state => state.systemModule.formAdd)

    if (!tasks) return <div></div>

    return (
        <div className="task-list-container">
            <Droppable droppableId={groupId} key={groupId} type="task">
                {provided => (
                    <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => (
                            <li key={task.id}>
                                <TaskPreview task={task} groupId={groupId} index={index} />
                            </li>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    )
}
