import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFormAddOpen, setModalGroupId, setTitleGroupId, updateGroupTitle } from '../../store/board/board.actions'
import { FormAdd } from './form-add'
import { GroupActionModal } from './group-action-modal'
import { TaskList } from './task-list'
import { removeGroup } from "../../store/board/board.actions"
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { BsPlusLg } from 'react-icons/bs'
import { Draggable } from 'react-beautiful-dnd'

export const GroupPreview = ({ group, index }) => {

    const dispatch = useDispatch()
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const modalGroupId = useSelector(state => state.systemModule.modalGroupId)
    const titleGroupId = useSelector(state => state.systemModule.titleGroupId)
    const [groupTitle, setTitle] = useState(group.title)
    const [isFormAddTaskUp, setFormAddTaskUp] = useState(null)

    const toggleGroupModal = (ev) => {
        ev.stopPropagation()
        if (modalGroupId === group.id) {
            return closeGroupModal()
        }
        dispatch(setModalGroupId(group.id))
        document.addEventListener('click', closeGroupModal)
    }

    const closeGroupModal = () => {
        dispatch(setModalGroupId(null))
        document.removeEventListener('click', closeGroupModal)
    }

    const onRemoveGroup = () => {
        dispatch(removeGroup(group.id))
    }

    const onEditGroupTitle = () => {
        if (titleGroupId === group.id) return
        dispatch(setTitleGroupId(group.id))
    }

    const handleChange = ({ target }) => {
        const value = target.value
        setTitle(value)
    }

    const onUpdateTitle = () => {
        dispatch(setTitleGroupId(null))
        dispatch(updateGroupTitle(group.id, groupTitle))
    }

    const openAddForm = (isUp) => {
        setFormAddTaskUp(isUp)
        dispatch(setIsFormAddOpen(group.id, false))
    }

    const { id, title, tasks } = group
    return (
        <Draggable draggableId={group.id} index={index}>
            {provided => (
                <div className='flex column group-preview' {...provided.draggableProps} ref={provided.innerRef}>
                    <div className='group-title-container' {...provided.dragHandleProps}>
                        {titleGroupId === id
                            ? <textarea name='title' value={groupTitle} className='group-title-edit'
                                onChange={handleChange} onBlur={onUpdateTitle} autoFocus></textarea>
                            : <div className='group-title' onClick={onEditGroupTitle}>
                                <h3>{title}</h3>
                            </div>
                        }
                        <div className='flex btn-container'>
                            <button className='btn btn-open-modal' onClick={toggleGroupModal}>
                                <HiOutlineDotsHorizontal />
                            </button>
                        </div>
                    </div>
                    {modalGroupId === id && <GroupActionModal groupId={id} onRemoveGroup={onRemoveGroup}
                        openAddForm={openAddForm} setFormAddTaskUp={setFormAddTaskUp} />}
                    {formAdd.groupId === id &&
                        isFormAddTaskUp && <FormAdd groupId={id} />}
                    <TaskList tasks={tasks} groupId={id} />
                    {formAdd.groupId === id &&
                        !isFormAddTaskUp && <FormAdd groupId={id} />}
                    {formAdd.groupId !== id && <div className="add-task-container">
                        <button className="btn btn-add-task" onClick={openAddForm}>
                            <BsPlusLg className='plus-icon' />
                            Add a card
                        </button>
                    </div>}
                </div>
            )}
        </Draggable>
    )
}