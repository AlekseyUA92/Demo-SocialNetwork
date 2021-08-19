import React from 'react';
import { addMessageActionCreator } from './../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsData.dialogs,
    messages: state.dialogsData.messages,
    newMessageText: state.dialogsData.newMessageText
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessage) => {
      let action = addMessageActionCreator(newMessage);
      dispatch(action);
    }
    // onHandleKeyDown: (event) => {
    //     if (event.key === 'Enter') {
    //         let action = addMessageActionCreator()
    //         dispatch(action)
    //     }
    // },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithAuthRedirect
)(Dialogs);
