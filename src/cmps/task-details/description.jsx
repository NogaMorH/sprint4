import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { updateTask } from "../../store/board/board.actions"

export const Description = ({ description }) => {

    const [updatedDescription, setDescription] = useState(description)
    const [focused, setFocused] = useState(false)
    const ref = useRef(null)
    const dispatch = useDispatch()
    const params = useParams()
    const { groupId, taskId } = params

    const onFocus = () => setFocused(true)

    const onBlur = (ev) => {
        if (!ev.relatedTarget || ev.relatedTarget.className === 'save-btn') {
            dispatch(updateTask(groupId, taskId, 'description', updatedDescription))
            console.log(' Task description saved!');
        } else {
            setDescription(description)
            console.log('Task description canceled!');
        }
        setFocused(false)
    }

    const handleChange = ({ target }) => {
        setDescription(target.value)
    }

    const handleKeyDown = ({ target }) => {
        target.style.height = 'inherit'
        target.style.height = `${target.scrollHeight}px`
    }

    const focusRef = () => {
        ref.current.focus()
    }

    return (
        <div className="description">
            <div className="description-header">
                <h4>Description</h4>
                {description && !focused &&
                    <button className="edit-btn" onClick={focusRef}>Edit</button>
                }
            </div>

            <textarea className={description ? "" : "blank"}
                placeholder="Add a more detailed description..."
                onFocus={onFocus}
                onBlur={onBlur}
                value={updatedDescription}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={ref}
            />

            <div className="description-btn" hidden={!focused}>
                <button className="save-btn">Save</button>
                <button className="cancel-btn">Cancel</button>
            </div>
        </div>
    )
}