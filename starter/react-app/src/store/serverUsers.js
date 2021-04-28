const GET_SERVER_USERS = 'SERVER_USERS/GET_SERVER_USERS';


const getTheServerUsers = (serverUsers) => ({
  type: GET_SERVER_USERS,
  payload: serverUsers
})

//thunk
export const getServerUsers = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/server/${serverId}/users`)
  if (response.ok) {
    const serverUsers = await response.json();
    return dispatch(getTheServerUsers(serverUsers));
  } else {
    console.log("repsonse not ok")
  }
  return null
}

// reducer
// const initialState = {};

export default function ServerUsersReducer(state = { serverUsers: {} }, action) {
  console.log(action)
  switch (action.type) {
    case GET_SERVER_USERS:
      console.log(action.payload)
      return action.payload.serverUsers;
    default:
      return state;
  }
}
