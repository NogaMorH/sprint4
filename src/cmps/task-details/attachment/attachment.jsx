import { useSelector } from "react-redux"
import { AttachmentEditModal } from "./attachment-edit-modal"
import { utilService } from "../../../services/util.service"
import { useMediaQuery } from "@mui/material"

import { GrAttachment } from 'react-icons/gr'
import { ImArrowUpRight2 } from 'react-icons/im'
import { FiCreditCard } from 'react-icons/fi'

export const Attachment = ({ attachment, idx, toggleCover, toggleModal, removeAttachment, updateAttachments }) => {

    const dynamicModal = useSelector(state => state.systemModule.dynamicModal)
    const { name, url, isCover, time } = attachment
    const matches = useMediaQuery('(max-width: 750px)')

    const openUrl = () => {
        window.open(url, '_blank')?.focus()
    }

    const updateName = (value) => {
        attachment.name = value
        updateAttachments(attachment, idx)
    }

    return (
        <div className="attachment" onClick={openUrl}>

            <div className="attachment-img">
                {utilService.checkURL(url) ?
                    <img src={url} alt="attachment" />
                    :
                    <GrAttachment className="attachment-img-icon" />
                }
            </div>

            <div className="attachment-info">
                <h5 className="name">{name}</h5>
                <ImArrowUpRight2 className="link-icon" />

                <div className="actions">
                    <span>Added {utilService.getFormatDate(time)} - </span>

                    <button className="actions-remove-btn hover-btn" onClick={(ev) => removeAttachment(ev, idx)}>
                        Delete
                    </button>
                    -
                    <button
                        name="edit-btn"
                        className="actions-edit-btn hover-btn"
                        onClick={(ev) => toggleModal('attachment-edit-' + idx, ev)}
                    >
                        Edit
                    </button>
                </div>

                {utilService.checkURL(url) &&
                    <div className="make-cover hover-btn">
                        <FiCreditCard className="make-cover-icon" />

                        <button className="make-cover-btn" onClick={(ev) => toggleCover(ev, idx)}>
                            {isCover ? 'Remove cover' : 'Make cover'}
                        </button>
                    </div>
                }
            </div>

            {dynamicModal.modalType === 'attachment-edit-' + idx && dynamicModal.fromCmp === 'attachment' &&
                <>
                    <AttachmentEditModal name={name} updateName={updateName} idx={idx} toggleModal={toggleModal} />
                    {matches && <div className="black-screen" />}
                </>
            }
        </div>
    )
}