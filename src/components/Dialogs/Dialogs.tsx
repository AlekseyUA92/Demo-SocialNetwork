import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import NewMessageForm from './NewMessageForm';
import {DialogType} from '../../redux/dialogs-reducer'
import {MessageType} from '../../redux/dialogs-reducer'

type PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addMessage: (messageText: string) => void
}

export type NewMassageFormValuesType = {
    newMessageText: string
}


const Dialogs: React.FC<PropsType> = ({dialogs, messages, addMessage}) => {
    let dialogElements = dialogs.map(d => <DialogItem name={d.name} id={d.id} img={d.imgSrc} />)
    let messageElements = messages.map(m => <Message text={m.message} id={m.id} />)

    let handleMessage = (value: {newMessageText: string}) => {
        addMessage(value.newMessageText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <NewMessageForm onSubmit={handleMessage} />
            </div>
        </div>
    )
}



export default Dialogs