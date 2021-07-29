import React from 'react'
import s from './../Dialogs.module.css'



const Message = (props) => {

    let nameForClass = s.message
    if (props.id % 2 == 0) {
        nameForClass = s.messageSecondPerson
    }

    return (
        <div className={nameForClass}>{props.text}</div>
    )
}

export default Message