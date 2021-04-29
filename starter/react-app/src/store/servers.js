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
    return dispatch(allServers(servers));
  } else {
  }
  return null
}

// reducer
// const initialState = {};


export default function serversReducer(state = {}, action) {

  switch (action.type) {
    case ALL_SERVERS:
      return action.payload.servers;
    default:
      return state;
  }
}
