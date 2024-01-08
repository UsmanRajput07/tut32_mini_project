import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { URL } from "../components/helders/url";
import img from "../components/components/img/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"

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
                <Link to={`/detail?hotal_id=${cv.id}`}>
                  <div className="card mt-3 p-3" key={idx}>
                    <div className="row">
                      <div className="col-4">
                        <img
                          src={
                            (cv.attributes.pictures.data!==null)? URL + cv.attributes.pictures.data[0].attributes.url: img
                            
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
                        <Link to={"tel:"} className="btn btn-success" onClick={(e)=>e.stopPropagation()}>
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
