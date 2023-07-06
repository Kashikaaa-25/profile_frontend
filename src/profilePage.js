import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./profilePage.css";
import axios from "axios";



const Profile = () => {
  const [profileData, setProfileData] = useState({
    userId: "0",
    userName: "kashika",
    email: "kashika@gmail.com",
    pass: "12325",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(profileData.userId){
      axios.put(`http://localhost:8080/api/v1/profile/${profileData.userId}`, profileData)
      .then((response) => {
        console.log(response.data);
        console.log("Updated!");
      })
      .catch((error) => {
        console.error(error);
      });
    }
    else{
      axios.post("http://localhost:8080/api/v1/profile",profileData) 
    .then((response) => {
      console.log(response.data);
      console.log("Submitted!");
      setProfileData((prevState) => ({
        ...prevState,
        id: response.data.userId, 
      }));
    })
    .catch((error) => {
      console.error(error);
    });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container d-flex justify-content-center align-items-center p-3 mb-2">
          <div>
            <h3 className="py-4 text-warning">Personal Information</h3>
            <div className="form-group">
              <div className="col m-2 fs-5">
                <label>UserName</label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  value={profileData.userName}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col m-2 fs-5">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col m-2 fs-5">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="pass"
                  value={profileData.pass}
                  onChange={handleChange}
                />
                <div>
                  <i
                    className="password-toggle-btn fs-5"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </i>
                </div>
              </div>
              <div className="col m-2 text-center">
                <button
                  className="btn btn-warning"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
