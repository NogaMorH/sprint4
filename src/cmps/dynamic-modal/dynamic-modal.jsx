import { CoverModal } from "./cover-modal"
import { AttachmentModal } from "./attachment-modal"
import { ChecklistModal } from "./checklist-modal"
import { DatesModal } from "./dates-modal"
import { LabelsModal } from "./labels-modal"
import { MembersModal } from "./members-modal"

export const DynamicModal = ({ type, groupId, taskId, closeModal, className }) => {

    const component = () => {
        switch (type) {
            case 'members':
                return MembersModal
            case 'labels':
                return LabelsModal
            case 'checklist':
                return ChecklistModal
            case 'dates':
                return DatesModal
            case 'attachment':
                return AttachmentModal
            case 'cover':
                return CoverModal
        }
    }

    return component()({
        groupId,
        taskId,
        closeModal,
        className
    })
}