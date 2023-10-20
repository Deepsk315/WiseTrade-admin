import React, {useState} from "react";
import Avatar from "../assets/images/avatar.png";


export default function Profile() {
  const [avatarSrc, setAvatar] = useState("");
  const [name] = useState("John");

  const handleSelectImage = () => {
    const file = document.getElementById("upload-avatar");
    let src = URL.createObjectURL(file.files[0]);
    setAvatar(src);
  };

  return (
    <div className="x-profile-contrainer">
      <div className="row profile-header">
        <div className="col-12 col-sm-auto">
          <label htmlFor="upload-avatar">
            <div className="file-dragger">
              {avatarSrc != "" ? (
                <img src={avatarSrc} alt="avatar" />
              ) : (
                <img src={Avatar} alt="avatar" />
              )}
            </div>
          </label>
          <input
            id="upload-avatar"
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            autoComplete="off"
            tabIndex={-1}
            style={{display: "none"}}
            onChange={handleSelectImage}
          />
        </div>
        <div className="col-12 col-sm-auto">
          <div className="avatar-title column d-flex flex-column justify-content-around h-100">
            <p>{name}</p>
            <label htmlFor="upload-avatar">Upload Avatar</label>
          </div>
        </div>
      </div>
      <div className="setting-box row">
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="John Smith"
            ></input>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="@John"
            ></input>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="john@gmail.com"
            ></input>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <label>Github</label>
            <input
              type="text"
              className="form-control"
              placeholder="https://github.com/interakt-india"
            ></input>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label>About Me</label>
            <textarea
              rows="5"
              className="form-control"
              placeholder="I am fullstack and blockchain developer"
            />
          </div>
        </div>
        <div className="col-12 col-sm-6 p-0">
          <div className="col-12">
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="******"
              ></input>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="******"
              ></input>
            </div>
          </div>
        </div>
        <div
          className="col-12 col-sm-6 d-flex justify-content-center align-items-end"
          style={{marginBottom: "10px"}}
        >
          <button className="btn-template m-2">Edit Profile</button>
          <button className="btn-template m-2">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
