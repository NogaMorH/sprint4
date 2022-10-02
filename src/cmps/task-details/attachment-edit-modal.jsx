import { useEffect, useRef, useState } from "react"
import { IoCloseOutline } from 'react-icons/io5'

function useOutsideClick(ref, closeEditModal) {
    useEffect(() => {
        function handleClickOutside(ev) {
            if (ref.current && !ref.current.contains(ev.target)) {
                if (ev.target.name === 'edit-btn') return
                closeEditModal()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])
}

export const AttachmentEditModal = ({ name, closeEditModal, updateName }) => {

    const [filedValue, setFiledValue] = useState(name)
    const wrapperRef = useRef(null)
    useOutsideClick(wrapperRef, closeEditModal)

    useEffect(() => {
        setFiledValue(name)
    }, [])

    const handleChange = ({ target }) => {
        setFiledValue(target.value)
    }

    const update = () => {
        updateName(filedValue)
        closeEditModal()
    }

    return (
        <div className="attachment-edit-modal" ref={wrapperRef} onClick={(ev) => ev.stopPropagation()}>

            <div className="attachment-edit-modal-header">
                <span>Edit attachment</span>
                <span className='close-icon' onClick={closeEditModal}><IoCloseOutline /></span>
            </div>

            <div className="attachment-edit-modal-content">
                <label>
                    Link name <br />
                    <input type="text" value={filedValue} onChange={handleChange} />
                </label>

                <button className='update-btn' onClick={update}>Update</button>
            </div>
        </div>
    )
}