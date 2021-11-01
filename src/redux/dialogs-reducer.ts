import { InferActionsType } from './redux-store'

export type DialogType = {
  id: number
  name: string
  imgSrc: string
}

export type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    {
      id: 1,
      name: 'Alexey',
      imgSrc: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png'
    },
    {
      id: 2,
      name: 'Alina',
      imgSrc: 'https://cdn-icons-png.flaticon.com/512/194/194938.png'
    },
    {
      id: 3,
      name: 'Dima',
      imgSrc: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/a9475211889067.562541caf0859.png' 
    },
    {
      id: 4,
      name: 'Sasha',
      imgSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-AyJmBjoXsCq5N2ifSGNmULprS6Sf-Z9dng&usqp=CAU'
    },
    {
      id: 5,
      name: 'Andrey',
      imgSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeKppZIP778EgdIsmSe8qVujsYk-YaKmuwvw&usqp=CAU'
    },
    {
      id: 6,
      name: 'Sveta',
      imgSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbt_6RMAYEh1MXQ8HICrK5qkDLzoz8qD5gw&usqp=CAU'
    }
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is yor day?!' },
    { id: 3, message: 'I am fine.!' },
    { id: 4, message: 'What?' },
    { id: 5, message: 'Nice!' },
    { id: 6, message: 'Ok.' }
  ] as Array<MessageType>
}


const dialogsReducer = (state = initialState, action: ActionsTypes): InitalStateType => {
  switch (action.type) {
    case 'social-network/dialogs/ADD-MESSAGE':
      let body = action.newMessageText
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: state.messages.length + 1, message: body }
        ]
      }

    default:
      return state
  }
}

export const actions = {
  addMessage: (newMessageText: string) => ({
    type: 'social-network/dialogs/ADD-MESSAGE',
    newMessageText
  } as const)
}

export default dialogsReducer

// ---------- TYPES ---------- 
export type InitalStateType = typeof initialState

type ActionsTypes = InferActionsType<typeof actions>
