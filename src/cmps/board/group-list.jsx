import { useDispatch, useSelector } from 'react-redux'
import { GroupPreview } from './group-preview'
import { updateBoard, setIsFormAddOpen, movTask, handleDrag } from '../../store/board/board.actions'
import { FormAdd } from './form-add'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { utilService } from '../../services/util.service'

export const GroupList = ({ groups }) => {
    const board = useSelector(state => state.boardModule.board)
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const dispatch = useDispatch()

    const onDragEnd = (result) => {

        const { destination, source } = result
        const { droppableId, index } = source
        if (!destination) return

        if (destination.droppableId === droppableId &&
            destination.index === index) return

        dispatch(handleDrag(result))
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
