import { useMediaQuery } from "@mui/material"
import { FiCreditCard } from "react-icons/fi"
import { IoCloseOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { setDynamicModal } from "../../store/board/board.actions"
import { DynamicModal } from "../dynamic-modal/dynamic-modal"

export const Cover = ({ cover }) => {

    const board = useSelector(state => state.boardModule.board)
    const dynamicModal = useSelector(state => state.systemModule.dynamicModal)
    const { groupId, taskId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const matches = useMediaQuery('(max-width: 750px)')

    const toggleCoverModal = () => {
        if (dynamicModal.modalType === 'cover') {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }
        dispatch(setDynamicModal({ modalType: 'cover', fromCmp: 'cover' }))
    }

    const closeTaskDetails = () => {
        navigate(`/board/${board._id}`)
    }

    return (
        <div className="full cover">
            {cover &&
                (cover.img ?
                    <img className="cover-img" src={cover.img} alt="cover img" />
                    :
                    <div className="cover-color" style={{ background: `${cover.color}` }} />
                )
            }
            <button className="cover-btn" onClick={toggleCoverModal}>
                <FiCreditCard className="cover-btn-icon" />
                Cover
            </button>

            {dynamicModal.modalType === 'cover' && dynamicModal.fromCmp === 'cover' &&
                <>
                    <DynamicModal type='cover' groupId={groupId} taskId={taskId} closeModal={toggleCoverModal} />
                    {matches && <div className="black-screen" />}
                </>
            }

            <button className="close-task-details" onClick={closeTaskDetails}><IoCloseOutline /></button> {/* move to task-details cmp */}
        </div>
    )
}