import { TaskList } from './task-list'

export const GroupPreview = ({ group }) => {
    return (
        <div>
            <h3>{group.title}</h3>
            <TaskList tasks={group.tasks} />
        </div>
    )
}