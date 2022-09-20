import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFormAddOpen, setModalGroupId, setTitleGroupId, updateGroupTitle } from '../../store/board/board.actions'
import { FormAdd } from './form-add'
import { GroupActionModal } from './group-action-modal'
import { TaskList } from './task-list'
import { removeGroup } from "../../store/board/board.actions"
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { HiPlus } from 'react-icons/hi'

export const GroupPreview = ({ group }) => {

    const dispatch = useDispatch()
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const modalGroupId = useSelector(state => state.systemModule.modalGroupId)
    const titleGroupId = useSelector(state => state.systemModule.titleGroupId)
    const [groupTitle, setTitle] = useState(group.title)

    const toggleGroupModal = (ev) => {
        ev.stopPropagation()
        // console.log('ev:', ev)
        if (modalGroupId === group.id) {
            // console.log('modalGroupId:', modalGroupId)
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

    const openAddForm = () => {
        dispatch(setIsFormAddOpen(group.id, false))
    }

    
    const { id, title, tasks } = group
    return (
        <div className='flex column group-preview '>
            <div className='group-title-container'>
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
                openAddForm={openAddForm} />}
            {formAdd.groupId === id && <FormAdd groupId={id} />}
            <TaskList tasks={tasks} groupId={id} openAddForm={openAddForm} />
            {formAdd.groupId !== id && <div className="add-task-container">
                <button className="btn btn-add-task" onClick={openAddForm}><HiPlus className='plus-icon' />
                    Add a card
                </button>
            </div>}
        </div>
    )
}