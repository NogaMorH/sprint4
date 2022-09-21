import { useEffect, useState } from "react"
import { IoCloseOutline } from 'react-icons/io5'

export const AttachmentEditModal = ({ name, toggleEditModal, updateName }) => {

    const [filedValue, setFiledValue] = useState(name)

    useEffect(() => {
        setFiledValue(name)
    }, [])

    const handleChange = ({ target }) => {
        setFiledValue(target.value)
    }

    const update = (ev) => {
        updateName(filedValue)
        toggleEditModal(ev)
    }

    return (
        <div className="attachment-modal" onClick={(ev) => ev.stopPropagation()}>
            <div className="attachment-modal-header">
                <span>Edit attachment</span>
                <span className='close-icon' onClick={toggleEditModal}><IoCloseOutline /></span>
            </div>

            <div className="attachment-modal-content">
                <label>
                    Link name <br />
                    <input type="text" value={filedValue} onChange={handleChange} />
                </label>
                <button className='update-btn' onClick={update}>Update</button>
            </div>
        </div>
    )
}