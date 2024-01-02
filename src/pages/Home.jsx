import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../components/helders/url";

export default function Home() {
  const [businesscategories, setBusinesscategories] = useState([]);

  useEffect(() => {
    fetch(`${URL}/api/business-categories?populate=*`)
      .then((res) => res.json())
      .then((data) => setBusinesscategories(data.data))
      .catch((err) => err);
  }, []);

  return (
    <>
      {businesscategories.map((cv, idx) => {
        return ( 
          <div key={idx}
            className="card me-2 mt-5 d-inline-flex p-2"
            style={{ width: "12rem" }}
          >
            <img
              src={ URL+cv.attributes.logo.data.attributes.url}
              className="card-img-top"
              alt="logo"
            />
            <div className="card-body text-center">
              <Link to={"/search?cat_name="+ cv.attributes.name} className="card-title">{cv.attributes.name}</Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
