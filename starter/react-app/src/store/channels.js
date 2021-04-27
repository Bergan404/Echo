const GET_CHANNELS = 'channels/GET_CHANNELS';


const getTheChannels = (channels) => ({
  type: GET_CHANNELS,
  payload: channels
})

//thunk
export const getChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/server/${serverId}/channels`)
  if (response.ok) {
    const channels = await response.json();
    console.log(channels);
    return dispatch(getTheChannels(channels));
  } else {
    console.log("repsonse not ok")
  }
  return null
}

// reducer
// const initialState = {};

export default function channelsReducer(state = { channels: {} }, action) {
  console.log(action)
  switch (action.type) {
    case GET_CHANNELS:
      console.log(action.payload)
      return action.payload.channels;
    default:
      return state;
  }
}
