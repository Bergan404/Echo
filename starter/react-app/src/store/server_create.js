const CREATE_SERVER = 'server_create/CREATE_SERVER';
const DELETE_SERVER = 'server_delete/DELETE_SERVER';

const createSever = (server) => ({
    type: CREATE_SERVER,
    payload: server
})

const deleteServer = () => ({
    type: DELETE_SERVER
})


export const delExistingServer = (serverId) => async (dispatch) => {
    await fetch('/api/server/', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(serverId)
    })
    dispatch(deleteServer())
}



export const serverCreate = (admin_id, name, image, isPublic) => async (dispatch) => {
    const formData = new FormData();
    formData.append('admin_id', admin_id);
    formData.append('name', name);
    if (image) {
        formData.append('image', image);
    }
    formData.append('isPublic', isPublic);

    const response = await fetch("/api/server/create", {
        method: "POST",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        body: formData
    });
    const data = await response.json();
    dispatch(createSever(data));
    return data
}

export default function createReducer(state = { create: {} }, action) {
    switch (action.type) {

        case CREATE_SERVER:
            return action.payload;
        case DELETE_SERVER:
            state = {}
            return state
        default:
            return state;

    }
}
