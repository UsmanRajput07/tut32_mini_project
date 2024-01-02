import React from "react";
import Swal from "sweetalert2";

export default function Login() {
  const loginuser = () => {
    const payload = {
      identifier: document.getElementById("user_name").value,
      password: document.getElementById("password").value,
    };
    fetch(`http://localhost:1337/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res)=>res.json()).then((data)=>{
      data["jwt"] === undefined
      ? Swal.fire({
          title: "Error",
          text: "user has been Already exsites",
          icon: "error",
        })
      : Swal.fire({
          title: "Good job!",
          text: "USER login!",
          icon: "success",
        }).then(()=>{
          window.localStorage.setItem("Jwt_token", data["jwt"])
          window.location.href = "/BusinessRegister"
        })
      
    }).catch(err=>err)
  };

  return (
    <>
      <form className="mt-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            User name
          </label>
          <input
            type="text"
            className="form-control"
            id="user_name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="button" className="btn btn-primary" onClick={loginuser}>
          Submit
        </button>
      </form>
    </>
  );
}
