import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { utilService } from "../../services/util.service"
import { setDynamicModal, updateTask } from "../../store/board/board.actions"
import { DynamicModal } from "../dynamic-modal/dynamic-modal"

export const Date = ({ dueDate, dynamicModal }) => {

    const { ms, isDone } = dueDate
    const { groupId, taskId } = useParams()
    const dispatch = useDispatch()

    const toggleModal = () => {
        if (dynamicModal.modalType === 'dates') {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }

        dispatch(setDynamicModal({ modalType: 'dates', fromCmp: 'date' }))
    }

    const toggleIsDone = () => {
        dispatch(updateTask(groupId, taskId, 'dueDate', { ms, isDone: !isDone }))
    }

    const getDifference = () => {
        return ms - new window.Date().getTime()
    }

    return (
        <div className="date-container" >
            <h6>Due date</h6>

            <div className="date">
                <input type="checkbox" name="isDone" onChange={toggleIsDone} checked={isDone} />

                <button onClick={toggleModal}>
                    <span>{utilService.getFormatDate(ms)}</span>

                    {isDone ?
                        <span className="date-label" style={{ backgroundColor: '#61BD4F' }}>
                            complete
                        </span>
                        :
                        <div>
                            {Math.sign(getDifference()) === -1 &&
                                <span className="date-label" style={{ backgroundColor: '#EB5A46' }}>
                                    overdue
                                </span>
                            }

                            {getDifference() < 86400000 && getDifference() > 0 &&
                                <span className="date-label" style={{ backgroundColor: '#F2D600', color: '#172B4D' }}>
                                    due soon
                                </span>
                            }
                        </div>
                    }
                </button>
            </div>

            {dynamicModal.modalType === 'dates' && dynamicModal.fromCmp === 'date' &&
                <DynamicModal type='dates' groupId={groupId} taskId={taskId} closeModal={toggleModal} />
            }
        </div>
    )
}