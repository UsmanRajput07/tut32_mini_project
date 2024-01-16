import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "./helders/url";

export default function Navbar() {
  const setlanguage = (e) => {
    let lang = e.target.innerHTML;
    if (lang === "English") {
      e.target.innerHTML = "Hindi";
      window.localStorage.setItem("lang", "hi")
    } else {
      e.target.innerHTML = "English";
      window.localStorage.setItem("lang", "en")

    }
  };
  const [logo, setLogo] = useState("");
  useEffect(() => {
    fetch(`${URL}/api/logo?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setLogo(data.data.attributes.logo.data.attributes.url);
      })
      .catch((err) => err);
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img src={`${URL}${logo}`} alt="Bootstrap" width="60" />
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse me-3"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-3 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-success"
                  onClick={(e) => setlanguage(e)}
                >
                  {window.localStorage.getItem("langtext")}
                </button>
              </li>
              {window.localStorage.getItem("Jwt_token") === null && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      login
                    </Link>
                  </li>
                </>
              )}
              {window.localStorage.getItem("Jwt_token") !== null && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/BusinessRegister">
                      Business Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        window.localStorage.clear();
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
