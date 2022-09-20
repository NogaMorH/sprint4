import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { updateTask } from "../../store/board/board.actions"
import { GrTextAlignFull } from 'react-icons/gr'

export const Description = ({ description }) => {

    const [updatedDescription, setDescription] = useState(description)
    const [focused, setFocused] = useState(false)
    const dispatch = useDispatch()
    const ref = useRef(null)
    const params = useParams()
    const { groupId, taskId } = params

    useEffect(() => {
        handleTextHeight(ref.current)
    }, [])

    const onFocus = () => setFocused(true)

    const onBlur = (ev) => {
        if (!ev.relatedTarget || ev.relatedTarget.className === 'save-btn') {
            dispatch(updateTask(groupId, taskId, 'description', updatedDescription))
            console.log(' Task description saved!')
        } else {
            setDescription(description)
            console.log('Task description canceled!')
        }
        setFocused(false)
    }

    const handleChange = ({ target }) => {
        setDescription(target.value)
    }

    const handleTextHeight = (ev) => {
        if (ev.target) {
            ev.target.style.height = 'inherit'
            ev.target.style.height = `${ev.target.scrollHeight}px`
        } else {
            ev.style.height = 'inherit'
            ev.style.height = `${ev.scrollHeight}px`
        }
    }

    const focusRef = () => {
        ref.current.focus()
    }

    return (
        <div className="description">
            <div className="description-header">
                <span className="description-header-icon"><GrTextAlignFull /></span>
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
                onKeyDown={handleTextHeight}
                ref={ref}
            />

            <div className="description-btn" hidden={!focused}>
                <button className="save-btn">Save</button>
                <button className="cancel-btn">Cancel</button>
            </div>
        </div>
    )
}