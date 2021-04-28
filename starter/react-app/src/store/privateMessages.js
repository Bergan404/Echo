const GET_PRIVATE_MESSAGES = 'privateMessages/GET_PRIVATE_MESSAGES';


const getThePrivateMessages = (privateMessages) => ({
  type: GET_PRIVATE_MESSAGES,
  payload: privateMessages
})

//thunk
export const getPrivateMessages = (userId) => async (dispatch) => {
  const response = await fetch(`/api/private_messages/${userId}`)
  if (response.ok) {
    const privateMessages = await response.json();
    return dispatch(getThePrivateMessages(privateMessages));
  } else {
  }
  return null
}

// reducer
// const initialState = {};

export default function private_MessagesReducer(state = { privateMessages: {} }, action) {
  switch (action.type) {
    case GET_PRIVATE_MESSAGES:
      return action.payload.privateMessages;
    default:
      return state;
  }
}
