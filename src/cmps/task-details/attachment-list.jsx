import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateTask } from '../../store/board/board.actions'
import { Attachment } from './attachment'
import { ImAttachment } from 'react-icons/im'

export const AttachmentList = ({ attachments, closeAttachmentEditModal, task }) => {

    const dispatch = useDispatch()
    const params = useParams()
    const { groupId, taskId } = params

    const checkURL = (url) => {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null)
    }

    const toggleCover = (ev, idx) => {
        ev.stopPropagation()
        const attachment = attachments[idx]
        attachment.isCover = !attachment.isCover

        attachments.forEach((attachment, index) => {
            if (index === idx) return
            if (attachment.isCover) attachment.isCover = false
        })
        dispatch(updateTask(groupId, taskId, 'attachments', attachments))

        if (attachment.isCover) {
            dispatch(updateTask(groupId, taskId, 'cover', { img: attachment.url }))
        } else {
            dispatch(updateTask(groupId, taskId, 'cover', {}))
        }
    }

    const removeAttachment = (ev, idx) => {
        ev.stopPropagation()
        const updatedAttachments = attachments.filter((attachment, index) => index !== idx)
        dispatch(updateTask(groupId, taskId, 'attachments', updatedAttachments))
    }

    const updateAttachments = (attachment, idx) => {
        attachments.splice(idx, 1, attachment)
        dispatch(updateTask(groupId, taskId, 'attachments', attachments))
    }

    const addAttachment = () => {
        // opens the same modal dynamic of Task SideBar
    }

    return (
        <div className="attachment-list">
            <div className="attachment-list-header">
                <span className='attachment-icon'><ImAttachment /></span>
                <h4>Attachments</h4>
            </div>

            {attachments.map((attachment, idx) => {
                return (
                    <Attachment key={idx}
                        attachment={attachment}
                        idx={idx}
                        toggleCover={toggleCover}
                        removeAttachment={removeAttachment}
                        updateAttachments={updateAttachments}
                        closeAttachmentEditModal={closeAttachmentEditModal}
                        checkURL={checkURL}
                    />
                )
            })}

            <button className='add-attachment-btn' onClick={addAttachment}>Add an attachment</button>
        </div >
    )
}