import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { setDynamicModal } from "../../store/board/board.actions"
import { DynamicModal } from "../dynamic-modal/dynamic-modal"
import { useMediaQuery } from "@mui/material"
import { FiCreditCard } from "react-icons/fi"

export const Cover = ({ cover, dynamicModal }) => {

    const { groupId, taskId } = useParams()
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width: 750px)')

    const toggleCoverModal = () => {
        if (dynamicModal.modalType === 'cover') {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }

        dispatch(setDynamicModal({ modalType: 'cover', fromCmp: 'cover' }))
    }

    return (
        <div className="full cover">
            {Object.keys(cover).length !== 0 &&
                <>
                    {cover.img ?
                        <img className="cover-img" src={cover.img} alt="cover img" />
                        :
                        <div className="cover-color" style={{ background: `${cover.color}` }} />
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
                </>
            }
        </div>
    )
}