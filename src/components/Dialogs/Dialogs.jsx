import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import NewMessageForm from './NewMessageForm';




const Dialogs = (props) => {
    let dialogElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} img={d.imgSrc} />)
    let messageElements = props.messages.map(m => <Message text={m.message} id={m.id} />)

    let sendMessage = (value) => {
        props.sendMessage(value.newMessage)
    }
    // Enter keyDown
    // const handleKeyDown = (event) => {
    //     props.onHandleKeyDown(event)
    // }


    // if (props.isAuth == false) return <Redirect to={'/Login'} />;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <NewMessageForm onSubmit={sendMessage} />
            </div>
        </div>
    )
}



export default Dialogs