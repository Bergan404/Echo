const GET_SERVER = 'server/GET_SERVER';


const getaServer = (server) => ({
  type: GET_SERVER,
  payload: server
})

//thunk
export const getServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/server/${serverId}`)
  if (response.ok) {
    const server = await response.json();
    return dispatch(getaServer(server));
  } else {
    console.log("repsonse not ok")
  }
  return null
}

// reducer
// const initialState = {};

export default function serverReducer(state = { server: {} }, action) {
  switch (action.type) {
    case GET_SERVER:
      return action.payload.server;
    default:
      return state;
  }
}
