export const DeleteLabelModal = ({ id, removeLabel }) => {

    return (
        <div className="delete-label-modal dynamic-content">
            <p>This will remove this label from all cards. There is no undo.</p>
            <button onClick={() => removeLabel(id)}>Delete</button>
        </div>
    )
}