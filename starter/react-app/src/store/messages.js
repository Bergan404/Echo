const GET_MESSAGES = 'messages/GET_MESSAGES';


const getTheMessages = (messages) => ({
  type: GET_MESSAGES,
  payload: messages
})

//thunk
export const getMessages = (serverId, channelId) => async (dispatch) => {
  const response = await fetch(`/api/server/${serverId}/${channelId}/messages`)
  if (response.ok) {
    const messages = await response.json();
    return dispatch(getTheMessages(messages));
  } else {
    console.log("repsonse not ok")
  }
  return null
}

// reducer
// const initialState = {};

export default function messagesReducer(state = { messages: {} }, action) {
  console.log(action)
  switch (action.type) {
    case GET_MESSAGES:
      console.log(action.payload)
      return action.payload.messages;
    default:
      return state;
  }
}
