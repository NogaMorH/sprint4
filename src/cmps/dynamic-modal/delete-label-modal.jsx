export const DeleteLabelModal = ({ label, updateLabels }) => {

    return (
        <div className="delete-label-modal dynamic-content">
            <p>This will remove this label from all cards. There is no undo.</p>
            <button onClick={() => updateLabels(label, 'delete')}>Delete</button>
        </div>
    )
}