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
    dispatch(getTheChannels(channels));
    return channels
  } else {
    console.log("repsonse not ok")
  }
  return null
}

// reducer
// const initialState = {};

export default function channelsReducer(state = { channels: {} }, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return action.payload.channels;
    default:
      return state;
  }
}
