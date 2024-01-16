import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { URL } from "../components/helders/url";
import img from "../components/components/img/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";

export default function SearchFilter() {
  const [businesscategories, setBusinessCategories] = useState([]);
  const [seachParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({});

  const getBussiness = (page = 1, pagesize = 10) => {
    fetch(
      //  adding pagesize = 3
      `${URL}/api/businesses?populate=*&filters[business_category][name][$containsi]=${seachParams.get(
        "cat_name"
      )}&pagination[page]=${page}&pagination[pageSize]=${pagesize}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setBusinessCategories(data.data);
        setPagination(data.meta.pagination);
        console.log(pagination)
      })
      .catch((err) => err);

  };
  useEffect(() => {

    window.addEventListener("scroll", () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      console.log(
        "scrollTop===>",
        scrollTop,
        "clientHeight===>",
        clientHeight,
        "scrollHeight==>",
        scrollHeight
      );
      if (clientHeight + scrollTop >= scrollHeight - 200) {
        getBussiness(11);
      }
    });

    getBussiness();
  }, []);
  const getBusinessbyStar = (e) => {
    let starvalue = e.target.getAttribute("data-star");
    fetch(
      `http://localhost:1337/api/businesses?populate=*&locale=en&filters[business_category][name][$containsi]=hotals&filters[star][$eq]=${starvalue}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBusinessCategories(data.data);
        console.log(data.data);
      })
      .catch((err) => err);
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 p-2">
          <div className="dropdown m-2 float-start">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Rating
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button data-star="5" onClick={(e) => getBusinessbyStar(e)}>
                  5 Star
                </button>
              </li>
              <li>
                <button data-star="4" onClick={(e) => getBusinessbyStar(e)}>
                  4 Star
                </button>
              </li>
              <li>
                <button data-star="3" onClick={(e) => getBusinessbyStar(e)}>
                  3 Star
                </button>
              </li>
              <li>
                <button data-star="2" onClick={(e) => getBusinessbyStar(e)}>
                  2 Star
                </button>
              </li>
              <li>
                <button data-star="1" onClick={(e) => getBusinessbyStar(e)}>
                  1 Star
                </button>
              </li>
            </ul>
          </div>
          <div className="dropdown m-2 float-start">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Pricing
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  Hight to Low
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Low to High
                </a>
              </li>
            </ul>
          </div>
          <button
            type="button"
            class="btn btn-dark float-end m-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            filters
          </button>
        </div>
      </div>
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
                            cv.attributes.img.data !== null
                              ? URL + cv.attributes.img.data[0].attributes.url
                              : img
                          }
                          className="img-fluid"
                          alt="logo"
                        />
                      </div>
                      <div className="col-8">
                        <div className="card-body">
                          <h5 className="card-title">{cv.attributes.name}</h5>
                          <button className="badge bg-success p-2">3.5</button>
                          <button>
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
                          </button>
                          <p className="card-text">{cv.attributes.desc}</p>
                        </div>
                        <Link
                          to={"tel:"}
                          className="btn btn-success"
                          onClick={(e) => e.stopPropagation()}
                        >
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
