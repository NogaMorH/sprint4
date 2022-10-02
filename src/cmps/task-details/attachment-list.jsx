import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setDynamicModal, updateTask } from '../../store/board/board.actions'
import { Attachment } from './attachment'
import { ImAttachment } from 'react-icons/im'
import { DynamicModal } from '../dynamic-modal/dynamic-modal'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@mui/material'

export const AttachmentList = ({ attachments }) => {

    const dynamicModal = useSelector(state => state.systemModule.dynamicModal)
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width: 750px)')
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

    const toggleModal = () => {
        if (dynamicModal.modalType === 'attachment') {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }
        dispatch(setDynamicModal({ modalType: 'attachment', fromCmp: 'attachment' }))
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
                        checkURL={checkURL}
                    />
                )
            })}

            <button className='add-attachment-btn' onClick={toggleModal}>Add an attachment</button>

            {dynamicModal.modalType === 'attachment' && dynamicModal.fromCmp === 'attachment' &&
                <>
                    {matches && <div className="black-screen"></div>}
                    <DynamicModal type='attachment' groupId={groupId} taskId={taskId} closeModal={toggleModal} />
                </>
            }
        </div >
    )
}