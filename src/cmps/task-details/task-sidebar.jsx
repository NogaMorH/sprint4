import React from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setDynamicModal } from "../../store/board/board.actions"
import { DynamicModal } from "../dynamic-modal/dynamic-modal"
import { useMediaQuery } from "@mui/material"

import { HiOutlineUser } from "react-icons/hi"
import { AiOutlineTag } from "react-icons/ai"
import { TbCheckbox } from "react-icons/tb"
import { MdOutlineWatchLater } from "react-icons/md"
import { ImAttachment } from "react-icons/im"
import { FiCreditCard } from "react-icons/fi"
import { VscArchive } from "react-icons/vsc"

export const TaskSideBar = ({ dynamicModal }) => {

    const types = ['members', 'labels', 'checklist', 'dates', 'attachment', 'cover']
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width: 750px)')
    const { groupId, taskId } = useParams()

    const openModal = (modalType) => {
        if (dynamicModal.modalType === modalType) {
            return closeModal()
        }
        dispatch(setDynamicModal({ modalType, fromCmp: 'sidebar' }))
    }

    const closeModal = () => {
        dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
    }

    return (
        <div className="task-sidebar">
            <h6>Add to card</h6>

            <div className="task-sidebar-btns">

                {types.map((type, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            <div className="sidebar-btn" onClick={() => openModal(type)}>

                                <span className="icon">
                                    {type === 'members' && <HiOutlineUser />}
                                    {type === 'labels' && <AiOutlineTag />}
                                    {type === 'checklist' && <TbCheckbox />}
                                    {type === 'dates' && <MdOutlineWatchLater />}
                                    {type === 'attachment' && <ImAttachment />}
                                    {type === 'cover' && <FiCreditCard />}
                                </span>

                                <span className="sidebar-cmp">{type}</span>

                                {dynamicModal.modalType === type && dynamicModal.fromCmp === 'sidebar' &&
                                    <>
                                        <DynamicModal
                                            type={type}
                                            groupId={groupId}
                                            taskId={taskId}
                                            closeModal={closeModal}
                                            className="pos-sidebar"
                                        />
                                        {matches && <div className="black-screen" />}
                                    </>
                                }
                            </div>
                        </React.Fragment>
                    )
                })}

                {/* Archive button not working for now(and with this button the amount is odd) */}
                {/* <button>
                    <span className="icon"><VscArchive /></span>
                    <span className="sidebar-cmp">Archive</span>
                </button> */}
            </div>
        </div>
    )
}