import { useSelector } from "react-redux"
import { GrAttachment } from 'react-icons/gr'
import { ImArrowUpRight2 } from 'react-icons/im'
import { FiCreditCard } from 'react-icons/fi'
import { setModalAttachmentIdx } from '../../store/board/board.actions'
import { useDispatch } from "react-redux"
import { AttachmentEditModal } from "./attachment-edit-modal"

export const Attachment = ({ attachment, idx, toggleCover, removeAttachment, updateAttachments, closeAttachmentEditModal, checkURL }) => {

    const modalAttachmnetIdx = useSelector(state => state.systemModule.modalAttachmnetIdx)
    const dispatch = useDispatch()
    const { name, url, isCover } = attachment

    const openUrl = () => {
        window.open(url, '_blank')?.focus()
    }

    const toggleEditModal = (ev) => {
        ev.stopPropagation()

        if (modalAttachmnetIdx === idx) {
            return closeEditModal()
        }
        dispatch(setModalAttachmentIdx(idx))
    }

    const closeEditModal = () => {
        dispatch(setModalAttachmentIdx(null))
    }

    const updateName = (value) => {
        attachment = { ...attachment, name: value }
        updateAttachments(attachment, idx)
    }

    return (
        <div className="attachment" onClick={openUrl}>
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
                    <button name='edit-btn' className="actions-edit-btn hover-btn"
                        onClick={toggleEditModal}>Edit</button>
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

            {modalAttachmnetIdx === idx && <AttachmentEditModal name={name} closeEditModal={closeEditModal} updateName={updateName} />}
        </div>
    )
}