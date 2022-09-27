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
            <header className="modal-title">
                <span className='title'>List actions</span>
                <button className='btn close-icon'><IoCloseOutline /></button>
            </header>
            <ul className='btns-list'>
                <li className='btn-action-container'>
                    <button className='btn btn-action' onClick={() => openAddForm(true)}>Add card...</button>
                </li>
                <li className='btn-action-container'>
                    <button className='btn btn-action' onClick={onRemoveGroup}>Delete list...</button>
                </li>
                <li className='btn-action-container'>
                    <button className='btn btn-action' onClick={onDuplicateGroup}>Copy list...</button>
                </li>
            </ul>
        </div>
    )
}