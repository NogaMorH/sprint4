import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { boardService } from "../../../services/board.service"
import { utilService } from "../../../services/util.service"
import { updateBoardLabels, updateTask } from "../../../store/board/board.actions"
import { EditLabelModal } from "./edit-label-modal"
import { DeleteLabelModal } from "../delete-label-modal"

import { faLessThan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoCloseOutline } from 'react-icons/io5'
import { MainLabelModal } from "./main-label-modal"

export const LabelsModalContainer = ({ groupId, taskId, closeModal, className }) => {

    const board = useSelector(state => state.boardModule.board)
    let { labels } = board
    let { labelIds } = boardService.getTask(board, groupId, taskId)

    const [foundLabels, setFoundLabels] = useState(labels)
    const [searchField, setSearchField] = useState('')
    const [currLabel, setCurrLabel] = useState('')
    const [openModal, setOpenModal] = useState('main')
    const dispatch = useDispatch()

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

    const updateLabels = (label) => {
        const idx = labels.indexOf(label)

        if (!label.id) {
            label.id = utilService.makeId()
            labels.push(label)
            setFoundLabels(labels)
        } else {
            labels.splice(idx, 1, label)
        }

        dispatch(updateBoardLabels(labels))
        setOpenModal('main')
    }

    const removeLabel = (id) => {
        labels = labels.filter(label => label.id !== id)
        labelIds = labelIds.filter(labelId => labelId !== id)

        setFoundLabels(labels)
        dispatch(updateBoardLabels(labels))
        dispatch(updateTask(groupId, taskId, 'labelIds', labelIds))
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

                <h5>
                    {
                        openModal === 'main' && 'Labels' ||
                        openModal === 'edit' && 'Create label' ||
                        openModal === 'edit' && currLabel && 'Edit label' ||
                        openModal === 'delete' && 'Delete label'
                    }
                </h5>

                <IoCloseOutline className="icon-close" onClick={closeModal} />
            </div>

            {openModal === 'main' &&
                <MainLabelModal
                    foundLabels={foundLabels}
                    searchField={searchField}
                    labelIds={labelIds}
                    groupId={groupId}
                    taskId={taskId}
                    filter={filter}
                    toggleModal={toggleModal}
                />
            }

            {openModal === 'edit' &&
                <EditLabelModal label={currLabel} updateLabels={updateLabels} toggleModal={toggleModal} />
            }

            {openModal === 'delete' &&
                <DeleteLabelModal id={currLabel.id} removeLabel={removeLabel} />
            }
        </div>
    )
}