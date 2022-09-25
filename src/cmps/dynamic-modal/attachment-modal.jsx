import { useEffect, useState } from "react"
import { useRef } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateTask } from "../../store/board/board.actions"

export const AttachmentModal = ({ groupId, taskId, closeModal }) => {

    const board = useSelector(state => state.boardModule.board)
    const attachments = boardService.getTask(board, groupId, taskId).attachments
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    const onChange = ({ target }) => {
        if (target.name === 'url') {
            setUrl(target.value)
        } else {
            setName(target.value)
        }
        
        // console.log('target.files:', target.files);
        // if (target.files) {
        //     setUrl(URL.createObjectURL(target.files[0]))
        // }
    }

    const addAttachment = () => {
        const attachment = { name, url, isCover: false }
        attachments.unshift(attachment)
        dispatch(updateTask(groupId, taskId, 'attachments', attachments))
        closeModal()
    }

    return (
        <div className='dynamic-modal attachment-modal'>

            <div className="dynamic-header">
                <h5>Attach from...</h5>
                <span onClick={closeModal}><IoCloseOutline /></span>
            </div>

            <button className="attach-file">
                <span>Computer</span>
                {/* <input type="file" onChange={onChange} /> */}
            </button>

            <div className="dynamic-content attach-link">
                <h6>Attach a link</h6>
                <input name="url" className="dynamic-input" type="text" placeholder="Paste any link here..." ref={ref} value={url} onChange={onChange} />

                <h6>Link name (optional)</h6>
                <input name="name" className="dynamic-input" type="text" value={name} onChange={onChange} />

                <button className="attach-btn" onClick={addAttachment}>Attach</button>
            </div>
        </div>
    )
}