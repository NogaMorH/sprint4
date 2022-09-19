import { utilService } from "../../services/util.service"

export const DueDate = ({ dueDate }) => {

    const getFormatDate = (dueDate) => {
        const monthAndDay = utilService.formatMonthDay(dueDate)
        const time = utilService.formatAMPM(dueDate)
        return monthAndDay + ' at ' + time
    }

    return (
        <div className="date-container">
            <h6>Due date</h6>
            <div className="date">
                <input type="checkbox" />
                <button>{getFormatDate(dueDate)}</button>
            </div>
            {/* <input type="text" value={getFormatDate(dueDate)} /> */}
        </div>
    )
}