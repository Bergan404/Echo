const ALL_SERVERS = 'server/allServers';


const allServers = (servers) => ({
  type: ALL_SERVERS,
  payload: servers
})

//thunk
export const findAllServers = () => async (dispatch) => {
  const response = await fetch('/api/main/')
  if (response.ok) {
    const servers = await response.json();
    console.log(servers);
    return dispatch(allServers(servers));
  } else {
    console.log("repsonse not ok")
  }
  return null
}

// reducer
// const initialState = {};

export default function serverReducer(state = { server: {} }, action) {
  console.log(action)
  switch (action.type) {
    case ALL_SERVERS:
      console.log(action.payload)
      return action.payload.servers;
    default:
      return state;
  }
}
