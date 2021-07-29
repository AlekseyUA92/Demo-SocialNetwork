import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Textarea } from './../Common/FormsControls/FormsControls';

const maxLength50 = maxLengthCreator(50)

const NewMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field
                    placeholder={'Enter your message'}
                    name={'newMessage'}
                    validate={[required, maxLength50]}
                    component={Textarea} />
            </div>
            <div>
                <button type='submit'>Add Post</button>
            </div>
        </form>
    )
}
const NewMessageReduxForm = reduxForm({
    form: 'dialogsNewMessage'
})(NewMessageForm)

export default NewMessageReduxForm