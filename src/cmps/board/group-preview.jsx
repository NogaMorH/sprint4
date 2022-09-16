import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalGroupId, setTitleGroupId, updateGroupTitle } from '../../store/board/board.actions'
import { FormAdd } from './form-add'
import { GroupActionModal } from './group-action-modal'
import { TaskList } from './task-list'
import { removeGroup } from "../../store/board/board.actions"





export const GroupPreview = ({ group }) => {

    const dispatch = useDispatch()
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const modalGroupId = useSelector(state => state.systemModule.modalGroupId)
    const titleGroupId = useSelector(state => state.systemModule.titleGroupId)
    const [groupTitle, setTitle] = useState(group.title)
    // const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

    // useEffect(() => {
    //     isFormAddOpen()
    // }, [formAdd])

    const openGroupModal = (ev) => {
        ev.stopPropagation()
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

    const { id, title, tasks } = group
    return (
        <div className='group-preview flex column'>
            <div className='group-title-container'>
                {titleGroupId === id
                    ? <textarea name='title' value={groupTitle} className='group-title-edit'
                        onChange={handleChange} onBlur={onUpdateTitle}></textarea>
                    : <div className='group-title' onClick={onEditGroupTitle}>
                        <h3>{title}</h3>
                    </div>
                }
                <button className='btn' onClick={openGroupModal}>...</button>
            </div>
            {modalGroupId === id && <GroupActionModal groupId={id} onRemoveGroup={onRemoveGroup} />}
            {formAdd.groupId === id && <FormAdd groupId={id} />}
            <TaskList tasks={tasks} />
        </div>
    )
}