import { TaskPreview } from './task-preview'
import { HiPlus } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'


export const TaskList = ({ tasks, groupId, openAddForm }) => {

    const formAdd = useSelector(state => state.systemModule.formAdd)

    if (!tasks) return <div></div>

    return (
        // <Droppable droppableId={groupId}>
            <div className="task-list-container">
                <ul className="task-list">
                    {tasks.map(task => (
                        <li key={task.id}>
                            <TaskPreview task={task} groupId={groupId} />
                        </li>
                    ))}
                </ul>
                {formAdd.groupId !== groupId && <div className="add-task-container">
                    <button className="btn btn-add-task" onClick={openAddForm}><HiPlus className='plus-icon' />
                        Add a card
                    </button>
                </div>}
            </div>
        // </Droppable>
    )
}
