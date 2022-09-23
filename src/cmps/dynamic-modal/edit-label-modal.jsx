import { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { LabelStyleCmp } from './label-style-cmp'

export const EditLabelModal = ({ label }) => {

    const { id, color, title } = label
    const [name, setName] = useState(title)
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    const onChange = () => {

    }

    return (
        <div className="edit-label-modal">
            <div className="label-container">
                <LabelStyleCmp className='label-edit' color={color} title={title} />
            </div>

            <div className="dynamic-content">
                <h6>Title</h6>
                <input className="dynamic-input" type="text" ref={ref} value={name} onChange={onChange} />

                <h6>Select a color</h6>
                <ul className="color-palette">
                    {colorPelette.map((color, idx) => {
                        return <LabelStyleCmp key={idx} color={color} />
                    })}
                </ul>

                <div className="remove-btn">
                    <span className='icon-close'><IoCloseOutline /></span>
                    <button>Remove color</button>
                </div>

                <div className="buttons">
                    <button className={`edit-save-btn ${!id && 'c-btn'}`}>{id ? 'Save' : 'Create'}</button>
                    {id && <button className='edit-delete-btn'>Delete</button>}
                </div>
            </div>
        </div>
    )
}

const colorPelette = ['#B7DDB0', '#F5EA92', '#FAD29C', '#EFB3AB', '#DFC0EB', '#7BC86C',
    '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5', '#5AAC44', '#E6C60D', '#E79217', '#CF513D',
    '#A86CC1', '#8BBDD9', '#8FDFEB', '#B3F1D0', '#F9C2E4', '#505F79', '#5BA4CF', '#29CCE5',
    '#6DECA9', '#FF8ED4', '#344563', '#026AA7', '#00AECC', '#4ED583', '#E568AF', '#091E42']