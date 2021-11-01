import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { createField, Textarea } from '../Common/FormsControls/FormsControls';
import { NewMassageFormValuesType } from './Dialogs';

const maxLength50 = maxLengthCreator(50)

export type NewMessageFormValuesKeysType = Extract<keyof NewMassageFormValuesType, string>
type PropsType = {}

const NewMessageForm: React.FC<InjectedFormProps<NewMassageFormValuesType, PropsType> & PropsType >  = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} >
            <div>
            {createField<NewMessageFormValuesKeysType>('Enter your name', 'newMessageText', [required, maxLength50], Textarea)}
            </div>
            <div>
                <button type='submit'>Add Post</button>
            </div>
        </form>
    )
}
const NewMessageReduxForm = reduxForm<NewMassageFormValuesType, PropsType>({
    form: 'dialogsNewMessage'
})(NewMessageForm)

export default NewMessageReduxForm