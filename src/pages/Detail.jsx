import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { URL } from "../components/helders/url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { Button, Modal } from "react-bootstrap";
import "../App.css";
import parse from "html-react-parser";

export default function Detail() {
  const [content, setContent] = useState("");
  const [seachParams, setSearchParams] = useSearchParams();
  const [detail, setDetail] = useState([]);
  const [name, setName] = useState("");
  const [star, setStar] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    if (item === "enquiry") {
      setContent(` <div className="row">
       <div className="col-7">
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
             <label htmlFor="exampleInputEmail1" className="form-label">
               phone No
             </label>
             <input
               type="Number"
               className="form-control"
               id="Phoneno"
               aria-describedby="emailHelp"
             />
           </div>
           <div className="mb-3">
             <label htmlFor="exampleInputPassword1" className="form-label">
               email
             </label>
             <input type="email" className="form-control" id="email" />
           </div>
           <button type="button" className="btn btn-primary">
             Submit
           </button>
         </form>
       </div>
       <div className="col-5"></div>
     </div>`);
    } else if (item === "uploadfile") {
      setContent(`<form>
         <label for="images" class="drop-container" id="dropcontainer">
            <span class="drop-title">Drop files here</span>
            <input type="file" id="images" accept="image/*" required>
           </label>
           <label>
           <textarea class="form-control w-100 mt-5"></textarea>
           </label>
           
        </form>`);
    } else {
    }
    setShow(true);
  };

  const ID = seachParams.get("hotal_id");

  useEffect(() => {
    fetch(
      `http://localhost:1337/api/businesses?filters[id][$eq]=${ID}&populate=*`
    )
      .then((res) => res.json())
      .then((data) => {
        setName(data.data[0].attributes.name);
        setDetail(data.data[0].attributes.pictures.data);
      })
      .catch((err) => err);
  }, []);

  const star2 = (e) => {
    console.log(e);
    let ele = e.target;
    ele.classList.remove("text-secondary");
    ele.classList.add("text-warning");
    console.log("previousSibling", ele.previousSibling);
    setStar(ele.getAttribute("data-star"));
  };

  // submit review
  const SubmitReview = () => {
    const payload = {
      data: {
        Star: star,
        desc: document.getElementById("floatingTextarea").value,
        businesses: [2],
      },
    };
    const token = window.localStorage.getItem("Jwt_token");
    fetch(`http://localhost:1337/api/reviews`, {
      method: "POST",
      headers: {
        "Content-type": "applictaion/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => err);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Get quary</Modal.Title>
        </Modal.Header>
        <Modal.Body>{parse(content)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{alert("upload")}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>
        {name}{" "}
        <Button
          variant="primary"
          onClick={() => {
            handleShow("enquiry");
          }}
        >
          quairy
        </Button>
      </h1>

      <div
        id="carouselExampleControls"
        className="carousel slide w-75 mt-5"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          {detail &&
            detail.map((cv, idx) => {
              return (
                <div className="carousel-item active">
                  <img src={URL + cv.attributes.url} alt="logo" />
                </div>
              );
            })}
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>

      <form className="mt-5">
        <span>
          <FontAwesomeIcon
            icon={faStar}
            className="text-secondary fs-1 "
            data-star="1"
            onMouseEnter={(e) => {
              star2(e);
            }}
          />
          <FontAwesomeIcon
            icon={faStar}
            className="text-secondary fs-1 "
            data-star="2"
            onMouseEnter={(e) => {
              star2(e);
            }}
          />
          <FontAwesomeIcon
            icon={faStar}
            className="text-secondary fs-1 "
            data-star="3"
            onMouseEnter={(e) => {
              star2(e);
            }}
          />
          <FontAwesomeIcon
            icon={faStar}
            className="text-secondary fs-1 "
            data-star="4"
            onMouseEnter={(e) => {
              star2(e);
            }}
          />
          <FontAwesomeIcon
            icon={faStar}
            className="text-secondary fs-1"
            data-star="5"
            onMouseEnter={(e) => {
              star2(e);
            }}
          />
        </span>
        <div className="form-floating mb-5 mt-5">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            defaultValue={""}
          />
          <label htmlFor="floatingTextarea">Comments</label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={SubmitReview}
        >
          Submit
        </button>
      </form>
      <Button variant="primary" onClick={() => handleShow("uploadfile")}>
        upload file
      </Button>
    </>
  );
}
