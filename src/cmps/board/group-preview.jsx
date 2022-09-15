import { TaskList } from './task-list'

export const GroupPreview = ({ group }) => {
    return (
        <div className='group-preview flex column'>
            <div className='group-title'>
            <h3>{group.title}</h3>
            <div>...</div>
            </div>
            {/* {board.tasks.labelsId && <div className="group-labels">

            </div>} */}
            <TaskList tasks={group.tasks} />
            
        </div>
    )
}