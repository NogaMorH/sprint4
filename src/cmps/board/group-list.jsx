import { useDispatch, useSelector } from 'react-redux'
import { GroupPreview } from './group-preview'
import { moveTask, setIsFormAddOpen } from '../../store/board/board.actions'
import { FormAdd } from './form-add'
import { BsPlusLg } from 'react-icons/bs'
import { DragDropContext } from 'react-beautiful-dnd'

export const GroupList = ({ groups, provided }) => {
    // console.log('groups:', groups)
    const board = useSelector(state => state.boardModule.board)
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const dispatch = useDispatch()


    const onAddGroup = () => {
        dispatch(setIsFormAddOpen(null, true))
    }


    const onDragEnd = (result) => {
        console.log('result:', result)

        //Todo: reorder our groups
        const { destination, source, draggableId } = result
        const { droppableId, index } = source
        // console.log('draggableId:', draggableId)
        if (!destination) return

        if (destination.droppableId === droppableId &&
            destination.index === index) return

        const group = board.groups.find(group => group.id === droppableId)
        const newTasks = [...group.tasks]
        console.log('newTasks:', newTasks)
        newTasks.splice(index, 1)
        newTasks.splice(destination.index, 0, draggableId)
        console.log('draggableId:', draggableId)
        
        const newGroup = {
            ...group,
            tasks: newTasks
        }

        const newBoard = {
            ...board,
            groups:
                board.groups.map(group => group.id === newGroup.id ? newGroup : group)
        }
        console.log('newBoard:', newBoard)
        console.log('draggableId:', draggableId)
        console.log('droppableId:', droppableId)
        dispatch(moveTask(newBoard))


        // const group = groups.find(group => group.id === source.droppableId)
        // console.log('source.droppableId:', source.droppableId)
        // console.log('group:', group) 
        // const taskIds = group.tasks.map(task => task.id)
        // console.log('newTasksIds:', taskIds)
        // console.log('group.tasks:', group.tasks)

    }

    if (!groups) return <div>Loading....</div>
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="group-list flex">
                {groups.map(group =>
                    <GroupPreview key={group.id} group={group} />)}
                {/* {provided.placeholder} */}
            {formAdd.isAddGroup
                ? <FormAdd />
                : <button className='btn btn-add-group' onClick={onAddGroup}>
                    <BsPlusLg className='plus-icon' />Add another list
                </button>
            }
        </div>
    )
}
