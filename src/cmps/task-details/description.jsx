import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateTask } from "../../store/board/board.actions"
import { GrTextAlignFull } from 'react-icons/gr'

export const Description = ({ description }) => {

    const [updatedDescription, setDescription] = useState(description)
    const [focused, setFocused] = useState(false)
    const { groupId, taskId } = useParams()
    const ref = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        handleTextHeight(ref.current)
    }, [])

    const onFocus = () => setFocused(true)

    const onBlur = (ev) => {
        if (!ev.relatedTarget || ev.relatedTarget.className === 'save-btn') {
            dispatch(updateTask(groupId, taskId, 'description', updatedDescription))
        } else {
            setDescription(description)
        }
        setFocused(false)
    }

    const focusRef = () => {
        ref.current.focus()
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

    return (
        <div className="description">

            <div className="description-header">
                <GrTextAlignFull className="description-header-icon" />
                <h4>Description</h4>

                {description && !focused &&
                    <button className="edit-btn" onClick={focusRef}>Edit</button>
                }
            </div>

            <textarea
                className={description ? "" : "blank"}
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