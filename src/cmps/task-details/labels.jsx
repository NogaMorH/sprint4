import { useParams } from "react-router-dom"
import { boardService } from "../../services/board.service"
import { LabelStyleCmp } from "../dynamic-modal/label-style-cmp"
import { BsPlusLg } from 'react-icons/bs'
import { DynamicModal } from "../dynamic-modal/dynamic-modal"
import { useDispatch } from "react-redux"
import { setDynamicModal } from "../../store/board/board.actions"
import { useSelector } from "react-redux"

export const Labels = ({ board }) => {

    const dynamicModal = useSelector(state => state.systemModule.dynamicModal)
    const params = useParams()
    const { groupId, taskId } = params
    const labels = boardService.getTaskLabels(board, groupId, taskId)
    const dispatch = useDispatch()

    const toggleModal = () => {
        if (dynamicModal.modalType === 'labels') {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }
        dispatch(setDynamicModal({ modalType: 'labels', fromCmp: 'labels' }))
    }

    return (
        <div className="labels">
            <h6>Labels</h6>
            <ul className="labels-list">
                {labels.map(label => {
                    const { id, color, title } = label
                    return <li key={id} onClick={toggleModal}><LabelStyleCmp className='label' color={color} title={title} /></li>
                })}
                <button className="icon-add" onClick={toggleModal}><BsPlusLg /></button>
            </ul>

            {dynamicModal.modalType === 'labels' && dynamicModal.fromCmp === 'labels' &&
                <DynamicModal type='labels' groupId={groupId} taskId={taskId} closeModal={toggleModal} />
            }
        </div>
    )
}