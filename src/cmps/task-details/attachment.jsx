import { FiCreditCard } from 'react-icons/fi'
import { ImArrowUpRight2 } from 'react-icons/im'
import { IoCloseOutline } from 'react-icons/io5'
import { GrAttachment } from 'react-icons/gr'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setModalAttachmentIdx, updateTask } from '../../store/board/board.actions'
import { useSelector } from 'react-redux'

export const Attachment = ({ attachments }) => {

    const [attachmentName, setName] = useState('')
    const modalAttachmnetIdx = useSelector(state => state.systemModule.modalAttachmnetIdx)
    const dispatch = useDispatch()
    const params = useParams()
    const { groupId, taskId } = params

    const checkURL = (url) => {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null)
    }

    const toggleCover = (ev, attachmentIdx) => {
        ev.preventDefault()
        const attachment = attachments[attachmentIdx]
        attachment.isCover = !attachment.isCover

        attachments.forEach((attachment, index) => {
            if (index === attachmentIdx) return
            if (attachment.isCover) attachment.isCover = false
        })
        dispatch(updateTask(groupId, taskId, 'attachments', attachments))
    }

    const removeAttachment = (ev, attachmentIdx) => {
        ev.preventDefault()
        const updatedAttachments = attachments.filter((attachment, idx) => idx !== attachmentIdx)
        dispatch(updateTask(groupId, taskId, 'attachments', updatedAttachments))
    }

    const toggleEditModal = (ev, idx) => {
        ev.preventDefault() // prevent default for link element(line 76)(not working with propagation!)
        ev.stopPropagation() // propagation for click event listener(line 50)

        if (modalAttachmnetIdx === idx) {
            return closeEditModal()
        }
        dispatch(setModalAttachmentIdx(idx))
        document.addEventListener('click', closeEditModal)
    }

    const closeEditModal = () => {
        dispatch(setModalAttachmentIdx(null))
        document.removeEventListener('click', closeEditModal)
    }

    const stopPropagation = (ev) => {
        ev.preventDefault() // prevent default for link element(line 76)(not working with propagation!)
        ev.stopPropagation() // propagation for click event listener(line 50)
    }

    const handleChange = () => {
        setName()
    }

    const updatedName = (idx) => {

    }

    const addAttachment = () => {
        // open the same modal of Task SideBar
    }

    return (
        <div className="attachment-container">
            <span className='attachment-icon'><GrAttachment /></span>
            <h4>Attachments</h4>

            {attachments.map((attachment, idx) => {
                const { name, url, isCover } = attachment

                return (
                    <a key={idx} href={url} target="_blank">
                        <div className="attachment">

                            <div className="attachment-img">
                                {checkURL(url) ?
                                    <img src={url} alt="attachment" />
                                    :
                                    <span className='attachment-img-icon'><GrAttachment /></span>
                                }
                            </div>

                            <div className="attachment-info">
                                <h5 className="name">{name}</h5>
                                <span className='link-icon'><ImArrowUpRight2 /></span>

                                <div className="actions">
                                    Added 2 hours ago -
                                    <button className="actions-remove-btn hover-btn"
                                        onClick={(ev) => removeAttachment(ev, idx)}>Delete</button>
                                    -
                                    <button className="actions-edit-btn hover-btn"
                                        onClick={(ev) => toggleEditModal(ev, idx)}>Edit</button>
                                </div>

                                {checkURL(url) &&
                                    <div className="make-cover hover-btn">
                                        <span className='make-cover-icon'><FiCreditCard /></span>
                                        <button className='make-cover-btn' onClick={(ev) => toggleCover(ev, idx)}>
                                            {isCover ? 'Remove cover' : 'Make cover'}
                                        </button>
                                    </div>
                                }
                            </div>

                            {modalAttachmnetIdx === idx &&
                                <div className="attachment-modal" onClick={stopPropagation}>
                                    <div className="attachment-modal-header">
                                        <span>Edit attachment</span>
                                        <span className='close-icon'><IoCloseOutline /></span>
                                    </div>

                                    <div className="attachment-modal-content">
                                        <label>
                                            Link name <br />
                                            <input type="text" value={name} onChange={handleChange} />
                                        </label>
                                        <button className='update-btn' onClick={() => updatedName(idx)}>Update</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </a>
                )
            })}

            <button className='add-attachment-btn' onClick={addAttachment}>Add an attachment</button>
        </div >
    )
}