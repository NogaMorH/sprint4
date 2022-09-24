import { useSelector } from "react-redux"
import { IoCloseOutline } from 'react-icons/io5'
import { BiPencil } from 'react-icons/bi'
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { LabelStyleCmp } from "./label-style-cmp"
import { boardService } from "../../services/board.service"
import { updateBoardLabels, updateTask } from "../../store/board/board.actions"
import { EditLabelModal } from "./edit-label-modal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons'

export const LabelsModal = ({ groupId, taskId, closeModal }) => {

    const board = useSelector(state => state.boardModule.board)
    const { labels } = board
    let { labelIds } = boardService.getTask(board, groupId, taskId)
    const [field, setField] = useState('')
    const [foundLabels, setFoundLabels] = useState(labels)
    const [isEdit, setIsEdit] = useState()
    const [editLabel, setEditLabel] = useState('')
    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    const onEdit = (label) => {
        setEditLabel(label)
        setIsEdit(!isEdit)
    }

    const filter = ({ target }) => {
        const keyword = target.value

        if (keyword !== '') {
            const results = labels.filter(label => {
                return label.title.toLowerCase().startsWith(keyword.toLowerCase())
            })
            setFoundLabels(results)
        } else {
            setFoundLabels(labels)
        }
        setField(keyword)
    }

    const isChecked = (id) => {
        if (!labelIds) return false
        return labelIds.includes(id)
    }


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

    const updateLabels = (id, title) => {
        const label = labels.find(label => label.id === id)
        // console.log('title:', title);
        label.title = title
        const idx = labels.indexOf(label)
        labels.splice(idx, 1, label)
        dispatch(updateBoardLabels(labels))
        onEdit()
    }

    return (
        <div className='dynamic-modal labels-modal-container'>

            <div className="dynamic-header">
                {isEdit && <span className="icon-less" onClick={onEdit}><FontAwesomeIcon icon={faLessThan} size="2xs" /></span>}
                <h5>{isEdit ? 'Create label' : 'Labels'}</h5>
                <span onClick={closeModal}><IoCloseOutline /></span>
            </div>

            <div className="dynamic-content">
                {!isEdit &&
                    <div>
                        <input className="dynamic-input" type="text" placeholder="Search labels..." ref={ref} value={field} onChange={filter} />

                        <div className="labels-modal">
                            <h6>Labels</h6>

                            <ul className="labels-modal-list">
                                {foundLabels && foundLabels.length > 0
                                    ?
                                    foundLabels.map(label => {
                                        const { id, color, title } = label

                                        return (
                                            <li key={id}>
                                                <label onClick={() => toggleLabel(id)}>
                                                    <input type="checkbox" checked={isChecked(id)} readOnly />
                                                    <LabelStyleCmp className="label-modal" color={color} title={title} />
                                                </label>
                                                <button className="icon-pencil" onClick={() => onEdit(label)}><BiPencil /></button>
                                            </li>
                                        )
                                    })
                                    : <div></div>
                                }
                            </ul>

                            <button onClick={onEdit}>Create a new label</button>
                        </div>
                    </div>}
            </div>

            {isEdit && <EditLabelModal label={editLabel} updateLabels={updateLabels} />}
        </div>
    )
}