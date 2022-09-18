export const GroupActionModal = ({ groupId, onRemoveGroup, openAddForm }) => {

    return (
        <div className='group-action-modal'>
            <div className="action-modal-title">
                List actions
            </div>
            <div className='btns-container'>
                <button className='btn btn-action' onClick={openAddForm}>Add card</button>
                <button className='btn btn-action' onClick={onRemoveGroup}>Delete list</button>
            </div>
        </div>
    )
}