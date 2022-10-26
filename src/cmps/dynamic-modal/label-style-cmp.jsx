import styled from 'styled-components'

const LabelContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 32px;
    cursor: pointer;
`

const BgColor = styled.div`
    position: absolute;
    height: 32px;
    border-radius: 3px;
    background-color: ${props => props.color};
    opacity: 0.3;
    width: 100%;

    &:hover {
        opacity: 0.5;
    }
`

const Color = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-left: 8px;
    background-color: yellow;
    background-color: ${props => props.color};
`

const Title = styled.span`
    margin-left: 8px;
    color: #000;
`

export const LabelStyleCmp = ({ toggleLabel, inlineStyle, className, ballSize, text, color, title }) => {

    return (
        <LabelContainer
            style={inlineStyle ? { backgroundColor: `${color}` } : { cursor: 'pointer' }}
            onClick={toggleLabel} className={className} color={color}
        >
            <BgColor className={className} color={color} />
            <Color className={ballSize} color={color} />
            <Title className={text}>{title}</Title>
        </LabelContainer >
    )
}