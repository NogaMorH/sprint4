import { useState } from "react"
import { useSelector } from "react-redux"
import { GrAttachment } from 'react-icons/gr'
import { ImArrowUpRight2 } from 'react-icons/im'
import { IoCloseOutline } from 'react-icons/io5'
import { FiCreditCard } from 'react-icons/fi'
import { setModalAttachmentIdx } from '../../store/board/board.actions'
import { useDispatch } from "react-redux"

export const Attachment = ({ attachment, idx, toggleCover, removeAttachment, updateAttachments }) => {

    const [attachmentName, setName] = useState(attachment.name)
    const modalAttachmnetIdx = useSelector(state => state.systemModule.modalAttachmnetIdx)
    const dispatch = useDispatch()
    const { name, url, isCover } = attachment

    const checkURL = (url) => {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null)
    }

    const toggleEditModal = (ev) => {
        ev.preventDefault() // prevent default for link element(line 76)(not working with propagation!)
        ev.stopPropagation() // propagation for click event listener(line 50)
        console.log('ev:', ev);
        console.log('idx:', idx);
        console.log('modalIdx:', modalAttachmnetIdx);

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

    const handleChange = ({ target }) => {
        setName(target.value)
    }

    const updatedName = () => {
        attachment = { ...attachment, name: attachmentName }
        updateAttachments(attachment, idx)
    }

    return (
        <a href={url} target="_blank">
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

                {modalAttachmnetIdx === idx &&
                    <div className="attachment-modal" onClick={stopPropagation}>
                        <div className="attachment-modal-header">
                            <span>Edit attachment</span>
                            <span className='close-icon'><IoCloseOutline /></span>
                        </div>

                        <div className="attachment-modal-content">
                            <label>
                                Link name <br />
                                <input type="text" value={attachmentName} onChange={handleChange} />
                            </label>
                            <button className='update-btn' onClick={updatedName}>Update</button>
                        </div>
                    </div>
                }
            </div>
        </a>
    )
}