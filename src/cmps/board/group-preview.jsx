import { TaskList } from './task-list'

export const GroupPreview = ({ group }) => {
    return (
        <div className='group-preview flex column'>
            <h3>{group.title}</h3>
            <TaskList tasks={group.tasks} />
        </div>
    )
}