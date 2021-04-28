import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { serverCreate } from '../../store/server_create'

const ServerForm = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const created = useSelector(state => state.session.user.id);
  const server_id = useSelector(state => state.create)
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [ispublic, setisPublic] = useState(false);

  const onServerCreation = async (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea

        // const res = await fetch('/api/images', {
        //     method: "POST",
        //     body: formData,
        // });
        // if (res.ok) {
        //     await res.json();
        //     history.push("/images");
        // }

    const data = await dispatch(serverCreate(created, name, image, ispublic));
    if (data) {
      history.push(`/server/${data.id}`);
    }
  }

  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file)
  }

  const updatePublic = (e) => {
    setisPublic(!ispublic);
  }

  return (
    <form onSubmit={onServerCreation} className='server_form'>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className='server_div'>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
          className='server_input'
        />
      </div>
      <div className='server_div'>
        <label htmlFor="image">Image</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={updateImage}
          className='server_input'
        />
      </div>
      <div className='server_div'>
        <label htmlFor="ispublic">Public</label>
        <input
          name="ispublic"
          type="checkbox"
          value={ispublic}
          onChange={updatePublic}
          className='server_input'
        />
      </div>
      <div className="create">
        <button className="server-button" type="submit">Create Server</button>
      </div>
    </form>
  )
}

export default ServerForm;
