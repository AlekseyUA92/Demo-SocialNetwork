import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { AppStateType } from '../../redux/redux-store'
import { actions, DialogType, MessageType } from '../../redux/dialogs-reducer'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'
import Dialogs from './Dialogs'

type MapStateToPropsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogs: state.dialogsData.dialogs,
    messages: state.dialogsData.messages
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {...actions}),
  WithAuthRedirect
)(Dialogs)
