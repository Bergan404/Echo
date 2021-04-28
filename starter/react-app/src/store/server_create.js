const CREATE_SERVER = 'server_create/CREATE_SERVER';

const createSever = (server) => ({
    type: CREATE_SERVER,
    payload: server
})


export const serverCreate = (admin_id, name, image, isPublic) => async (dispatch) => {
    const response = await fetch("/api/server/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            admin_id,
            name,
            image,
            'public': isPublic,
        }),
    });
    const data = await response.json();
    dispatch(createSever(data));
    return data
}

export default function createReducer(state = { create: {} }, action) {
    switch (action.type) {
      case CREATE_SERVER:
        return action.payload;
      default:
        return state;
    }
  }
