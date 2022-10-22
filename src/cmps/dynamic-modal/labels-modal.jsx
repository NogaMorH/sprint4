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
import { DeleteLabelModal } from "./delete-label-modal"
import { utilService } from "../../services/util.service"

export const LabelsModal = ({ groupId, taskId, closeModal, className }) => {

    const board = useSelector(state => state.boardModule.board)
    const { labels } = board
    let { labelIds } = boardService.getTask(board, groupId, taskId)
    const [foundLabels, setFoundLabels] = useState(labels)
    const [searchField, setSearchField] = useState('')
    const [currLabel, setCurrLabel] = useState('')
    const [openModal, setOpenModal] = useState('main')
    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

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
        setSearchField(keyword)
    }

    const toggleModal = (type, label) => {
        if (type === 'edit') {

            if (!label?.color) {
                label = { color: '#7BC86C', title: '' }
            }
        }
        setCurrLabel(label)
        setOpenModal(type)
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

    const updateLabels = (label, action) => {
        const idx = labels.indexOf(label)

        if (action === 'delete') {
            labels.splice(idx, 1)
            setFoundLabels(labels)
        }
        else if (!label.id) {
            label.id = utilService.makeId()
            labels.push(label)
        } else {
            labels.splice(idx, 1, label)
        }
        dispatch(updateBoardLabels(labels))
        setOpenModal('main')
    }

    return (
        <div
            className={`dynamic-modal labels-modal-container ${className ? className : ''}`}
            onClick={(ev) => ev.stopPropagation()}
        >
            <div className="dynamic-header">
                {openModal !== 'main' &&
                    <FontAwesomeIcon className="icon-less" icon={faLessThan} size="2xs" onClick={() => setOpenModal('main')} />
                }
                <h5>{
                    openModal === 'main' && 'Labels' ||
                    openModal === 'edit' && 'Create label' ||
                    openModal === 'edit' && currLabel && 'Edit label' ||
                    openModal === 'delete' && 'Delete label'}
                </h5>
                <IoCloseOutline className="icon-close" onClick={closeModal} />
            </div>

            {openModal === 'main' &&
                <div className="dynamic-content">
                    <div>
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
                                                    <input type="checkbox" checked={labelIds.includes(id)} readOnly />

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
                                    <div></div>
                                }
                            </ul>

                            <button onClick={() => toggleModal('edit')}>Create a new label</button>
                        </div>
                    </div>
                </div>
            }

            {openModal === 'edit' &&
                <EditLabelModal label={currLabel} updateLabels={updateLabels} toggleModal={toggleModal} />
            }
            {openModal === 'delete' &&
                <DeleteLabelModal label={currLabel} updateLabels={updateLabels} />
            }
        </div>
    )
}