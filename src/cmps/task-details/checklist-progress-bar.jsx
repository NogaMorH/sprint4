import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-size: 11px;
        color: #5e6c84;
        padding-bottom: 5px;
    }

    progress[value] {
        -webkit-appearance: none;
        appearence: none;
        width: 512px;

        ::-webkit-progress-bar {
            height: 8px;
            border-radius: 4px;
            border: none;
            background-color: #091e4214;
        }

        ::-webkit-progress-value {
            height: 8px;
            background-color: ${props => props.color};
            transition-duration: 0.5s;
            border-radius: 20px;
        }
    }
`

export const ChecklistProgressBar = ({ checklist }) => {

    const value = checklist.todos.filter(todo => todo.isDone).length
    const max = checklist.todos.length
    let color = '#5ba4cf'
    if (value === max) color = '#61bd4f'

    return (
        <Container color={color}>
            <span>{Math.floor((value / max) * 100)}%</span>
            <progress value={value} max={max} />
        </Container>
    )
}