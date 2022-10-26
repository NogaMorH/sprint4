import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { updateTask } from "../../../store/board/board.actions"
import { LabelStyleCmp } from "./label-style-cmp"
import { BiPencil } from "react-icons/bi"

export const MainLabelModal = ({ foundLabels, searchField, labelIds, groupId, taskId, filter, toggleModal }) => {

    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    const toggleLabel = (id) => {
        if (!labelIds) {
            labelIds = [id]
        }
        else if (labelIds.includes(id)) {
            const idx = labelIds.indexOf(id)
            labelIds.splice(idx, 1)
        } else {
            labelIds.push(id)
        }

        dispatch(updateTask(groupId, taskId, 'labelIds', labelIds))
    }

    return (
        <div className="dynamic-content">
            <input
                className="dynamic-input"
                type="text"
                placeholder="Search labels..."
                ref={ref}
                value={searchField}
                onChange={filter}
            />

            <div className="labels-modal">
                <h6>Labels</h6>

                <ul className="labels-modal-list">
                    {foundLabels?.length > 0
                        ?
                        foundLabels.map(label => {
                            const { id, color, title } = label

                            return (
                                <li key={id}>
                                    <label onClick={() => toggleLabel(id)}>
                                        <input type="checkbox" checked={labelIds.includes(id) || false} readOnly />

                                        <div onClick={(ev) => ev.stopPropagation()}>
                                            <LabelStyleCmp className="label-modal" color={color} title={title} />
                                        </div>
                                    </label>

                                    <button className="icon-pencil" onClick={() => toggleModal('edit', label)}>
                                        <BiPencil />
                                    </button>
                                </li>
                            )
                        })
                        :
                        <div />
                    }
                </ul>

                <button onClick={() => toggleModal('edit')}>Create a new label</button>
            </div>
        </div>
    )
}