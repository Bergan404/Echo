const GET_PRIVATE_MESSAGE_RECIPIENTS = 'privateMessages/GET_PRIVATE_MESSAGE_RECIPIENTS';


const getThePrivateMessageRecipients = (privateMessageRecipients) => ({
  type: GET_PRIVATE_MESSAGE_RECIPIENTS,
  payload: privateMessageRecipients
})


//thunk
export const getPrivateMessageRecipients = (userId) => async (dispatch) => {
  const response = await fetch(`/api/private_messages/${userId}`)
  if (response.ok) {
    const privateMessageRecipients = await response.json();
    dispatch(getThePrivateMessageRecipients(privateMessageRecipients));
    return privateMessageRecipients
  } else {
  }
  return null
}

// reducer
// const initialState = {};

export default function private_MessageRecipientsReducer(state = { recipients: {} }, action) {
  switch (action.type) {
    case GET_PRIVATE_MESSAGE_RECIPIENTS:
      return action.payload.recipients;
    default:
      return state;
  }
}
