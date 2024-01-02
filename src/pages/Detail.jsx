import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Detail() {
  const [seachParams, setSearchParams] = useSearchParams();
  console.log(seachParams.get("hotal_name"))

  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide w-50 mt-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=1024x1024&w=is&k=20&c=lNQVwTuYzo9wQZfZzHioQMCJRTHWVzhX1UXmcqgnF5k="
              className="d-block w-100"
              alt="LOGO"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=1024x1024&w=is&k=20&c=lNQVwTuYzo9wQZfZzHioQMCJRTHWVzhX1UXmcqgnF5k="
              className="d-block w-100"
              alt="LOGO"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=1024x1024&w=is&k=20&c=lNQVwTuYzo9wQZfZzHioQMCJRTHWVzhX1UXmcqgnF5k="
              className="d-block w-100"
              alt="LOGO"
            />
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
      </div>
    </>
  );
}
