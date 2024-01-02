import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { URL } from "../components/helders/url";

export default function SearchFilter() {
  const [businesscategories, setBusinessCategories] = useState([]);
  const [seachParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    fetch(
      `${URL}/api/businesses?populate=*&filters[business_categories][name][$containsi]=${seachParams.get(
        "cat_name"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setBusinessCategories(data.data);
      })
      .catch((err) => err);
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-9">
          {businesscategories.map((cv, idx) => {
            return (
              <>
                <Link to={`/detail?hotal_name=${cv.attributes.name}`}>
                  <div className="card mt-3 p-3" key={idx}>
                    <div className="row">
                      <div className="col-4">
                        <img
                          src={
                            URL + cv.attributes.pictures.data[0].attributes.url
                          }
                          className="img-fluid"
                          alt="logo"
                        />
                      </div>
                      <div className="col-8">
                        <div className="card-body">
                          <h5 className="card-title">{cv.attributes.name}</h5>
                          <span className="badge bg-success p-2">3.5</span>
                          <span>
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-warning"
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-warning"
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-warning"
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-warning"
                            />
                          </span>
                          <p className="card-text">{cv.attributes.desc}</p>
                        </div>
                        <Link to={"tel:"} className="btn btn-success">
                          {cv.attributes.phone}
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
