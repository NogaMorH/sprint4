import { IoCloseOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { duplicateGroup } from '../../store/board/board.actions'
export const GroupActionModal = ({ groupId, onRemoveGroup, openAddForm }) => {
   

    const dispatch = useDispatch()


    const onDuplicateGroup = () => {
        dispatch(duplicateGroup(groupId))
    }

    return (
        <div className='group-action-modal'>
            <div className="action-modal-title">
                <span>List actions</span>
                <span className='close-icon'><IoCloseOutline /></span>
            </div>
            <div className='btns-container'>
                <button className='btn btn-action' onClick={() => openAddForm(true)}>Add card...</button>
                <button className='btn btn-action' onClick={onRemoveGroup}>Delete list...</button>
                <button className='btn btn-action' onClick={onDuplicateGroup}>Copy list...</button>

            </div>
        </div>
    )
}