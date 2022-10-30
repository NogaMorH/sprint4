import { useEffect, useState } from "react"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateTask } from "../../store/board/board.actions"
import { IoCloseOutline } from "react-icons/io5"

export const AttachmentModal = ({ groupId, taskId, closeModal, className }) => {

    const board = useSelector(state => state.boardModule.board)
    let attachments = boardService.getTask(board, groupId, taskId).attachments
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')
    const [isFile, setIsFile] = useState(false)
    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    useEffect(() => {
        if (isFile) addAttachment()
    }, [isFile])

    const onChange = ({ target }) => {
        setIsFile(false)

        if (target.files) {
            setUrl(URL.createObjectURL(target.files[0]))
            setName(target.files[0].name)
            setIsFile(true)
        }
        else if (target.name === 'url') {
            setUrl(target.value)
        } else {
            setName(target.value)
        }
    }

    const addAttachment = () => {
        const attachment = { name, url, isCover: false, time: Date.now() }
        if (!attachments) attachments = []
        attachments.unshift(attachment)
        dispatch(updateTask(groupId, taskId, 'attachments', attachments))
        closeModal()
    }

    return (
        <div
            className={`dynamic-modal attachment-modal ${className ? className : ''}`}
            onClick={(ev) => ev.stopPropagation()}
        >
            <div className="dynamic-header">
                <h5>Attach from...</h5>
                <IoCloseOutline className="icon-close" onClick={closeModal} />
            </div>

            <button className="attach-file">
                <div>Computer</div>
                <input type="file" onChange={onChange} />
            </button>

            <div className="dynamic-content attach-link">
                <h6>Attach a link</h6>

                <input
                    name="url"
                    className="dynamic-input"
                    type="text"
                    placeholder="Paste any link here..."
                    ref={ref}
                    value={url}
                    onChange={onChange}
                />

                {url &&
                    <>
                        <h6>Link name (optional)</h6>

                        <input
                            name="name"
                            className="dynamic-input"
                            type="text"
                            value={name}
                            onChange={onChange}
                        />
                    </>
                }

                <button className="attach-btn" onClick={addAttachment}>Attach</button>
            </div>
        </div>
    )
}