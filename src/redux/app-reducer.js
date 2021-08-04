import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
  initialized: false,
  globalError: null
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true
      };
    }
    default:
      return state;
  }
};

const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS
});

// ==== Thunk ====
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  //dispatch(somethingElse())
  //debugger;
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
