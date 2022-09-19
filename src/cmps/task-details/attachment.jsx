import { FiCreditCard } from 'react-icons/fi'
import { ImArrowUpRight2 } from 'react-icons/im'
import { GrAttachment } from 'react-icons/gr'

export const Attachment = ({ attachments, updateTask }) => {

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
        updateTask('attachments', attachments)
    }

    const removeAttachment = (ev, attachmentIdx) => {
        ev.preventDefault()
        const updatedAttachments = attachments.filter((attachment, idx) => idx !== attachmentIdx)
        updateTask('attachments', updatedAttachments)
    }

    const editAttachmentName = (ev, attachmentIdx) => {
        ev.preventDefault()

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
                                        onClick={(ev) => editAttachmentName(ev, idx)}>Edit</button>
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
                        </div>
                    </a>
                )
            })}

            <button className='add-attachment-btn' >Add an attachment</button>
        </div>
    )
}