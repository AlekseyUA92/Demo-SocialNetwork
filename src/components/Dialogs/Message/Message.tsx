import React from 'react'
import s from './../Dialogs.module.css'

type PropsType = {
    id: number
    text: string
}

const Message: React.FC<PropsType> = ({id, text}) => {

    let nameForClass = s.message
    if (id % 2 === 0) {
        nameForClass = s.messageSecondPerson
    }

    return (
        <div className={nameForClass}>{text}</div>
    )
}

export default Message