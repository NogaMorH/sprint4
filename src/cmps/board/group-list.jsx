import { useDispatch, useSelector } from 'react-redux'
import { GroupPreview } from './group-preview'
import { updateBoard, setIsFormAddOpen } from '../../store/board/board.actions'
import { FormAdd } from './form-add'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { utilService } from '../../services/util.service'
export const GroupList = ({ groups, provided }) => {
    const board = useSelector(state => state.boardModule.board)
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const dispatch = useDispatch()


    const onDragEnd = (result) => {

        const { destination, source, draggableId, type } = result
        const { droppableId, index } = source
        if (!destination) return

        if (destination.droppableId === droppableId &&
            destination.index === index) return

        if (type === 'group') {
            const currGroup = board.groups.find(group => group.id === draggableId)
            board.groups.splice(index, 1)
            board.groups.splice(destination.index, 0, currGroup)
            dispatch(updateBoard(board))
            return
        }

        const group = board.groups.find(group => group.id === droppableId)
        console.log('group:', group)
        const task = group.tasks.find(task => task.id === draggableId)

        const start = board.groups.find(group => group.id === droppableId)
        const finish = board.groups.find(group => group.id === destination.droppableId)
        let newGroup
        if (start === finish) {
            group.tasks.splice(index, 1)
            group.tasks.splice(destination.index, 0, task)

            newGroup = {
                ...group,
                tasks: group.tasks
            }

        } else {

            const sourceTasks = start.tasks
            const currTask = sourceTasks.find((task, idx) => index === idx)
            sourceTasks.splice(index, 1)
            const destinationTasks = finish.tasks
            destinationTasks.splice(destination.index, 0, currTask)
            newGroup = {
                ...finish,
                tasks: destinationTasks
            }

        }
        console.log('newGroup:', newGroup)
        console.log('board:', board)

        const newBoard = {
            ...board,
            groups:
                board.groups.map(group => group.id === newGroup.id ? newGroup : group)
        }
        dispatch(updateBoard(newBoard))
        console.log('newBoard end of function:', newBoard)

    }

    if (!groups) return <div>Loading....</div>
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={utilService.makeId()} direction="horizontal" type="group">
                {provided => (
                    <div className="group-list flex"
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {groups.map((group, index) =>
                            <GroupPreview key={group.id} group={group} index={index} />)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
