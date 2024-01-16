import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../components/helders/url";

export default function Home() {
  const [businesscategories, setBusinesscategories] = useState([]);
  const [mainslider, setMainSlider] = useState([]);

  useEffect(() => {
    let lang = window.localStorage.getItem("lang")
    fetch(`${URL}/api/business-categories?populate=*&locale=${lang}`)
      .then((res) => res.json())
      .then((data) => setBusinesscategories(data.data))
      .catch((err) => err);
    fetch(`${URL}/api/slider?populate[slide][populate]=*`)
      .then((res) => res.json())
      .then((data) => {
        setMainSlider(data.data.attributes.slide);
        console.log(data.data.attributes.slide);
      })
      .catch((err) => err);
  }, []);

  return (
    <>
      <div className="row mb-2 mt-5">
        <div className="col p-png">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {mainslider.map((cv, idx) => {
                return (
                  <Link to={`/serach?cat_name=${cv.business_categories.data[0].attributes.name}`}>
                    <div className="carousel-item active">
                      <img
                        src={URL + cv.slide.data.attributes.url}
                        className="d-block w-100"
                        alt="logo"
                      />
                    </div>
                  </Link>
                );
              })}
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
          </div>
        </div>
        <div className="col"></div>
      </div>
      {businesscategories &&
        businesscategories.map((cv, idx) => {
          return (
            <div
              key={idx}
              className="card me-2 mt-5 d-inline-flex p-2"
              style={{ width: "12rem" }}
            >
              <img
                src={URL + cv.attributes.logo.data.attributes.url}
                className="card-img-top"
                alt="logo"
              />
              <div className="card-body text-center">
                <Link
                  to={"/search?cat_name=" + cv.attributes.name}
                  className="card-title"
                >
                  {cv.attributes.name}
                </Link>
              </div>
            </div>
          );
        })}
    </>
  );
}
