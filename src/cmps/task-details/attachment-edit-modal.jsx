import { useEffect, useRef, useState } from "react"
import { IoCloseOutline } from 'react-icons/io5'

export const AttachmentEditModal = ({ name, updateName, idx, toggleModal }) => {

    const [filedValue, setFiledValue] = useState(name)
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    const handleChange = ({ target }) => {
        setFiledValue(target.value)
    }

    const update = () => {
        updateName(filedValue)
        toggleModal('attachment-edit-' + idx)
    }

    return (
        <div className="dynamic-modal attachment-edit-modal" onClick={(ev) => ev.stopPropagation()}>

            <div className="dynamic-header">
                <h5>Edit attachment</h5>
                <IoCloseOutline className="icon-close" onClick={() => toggleModal('attachment-edit-' + idx)} />
            </div>

            <div className="dynamic-content">
                <label>
                    <h6>Link name</h6>
                    <input className="dynamic-input" type="text" ref={ref} value={filedValue} onChange={handleChange} />
                </label>

                <button className="update-btn" onClick={update}>Update</button>
            </div>
        </div>
    )
}