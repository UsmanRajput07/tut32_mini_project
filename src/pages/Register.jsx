import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [email, setEmail] = useState("email");

  const userResgister = () => {
    fetch(`http://localhost:1337/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.data === null
          ? Swal.fire({
              title: "Error",
              text: "user has been Already exsites",
              icon: "error",
            })
          : Swal.fire({
              title: "Good job!",
              text: "login SuccessFully",
              icon: "success",
            }).then(()=>{
              window.location.href = "/BusinessRegister"
            })
      })
      .catch((err) => err);
  };

  return (
    <>
      <div className="container">
        <form className="mt-5">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name or email
            </label>
            <input
              type="text"
              className="form-control"
              id="User_Name"
              aria-describedby="emailHelp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="user_email"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={userResgister}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
