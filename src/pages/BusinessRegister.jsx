import React, { useEffect, useState } from "react";
import { URL } from "../components/helders/url";

export default function BusinessRegister() {
  const [businesscategory, setBusinesscategory] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  //  register business

  const BusinessRgt = () => {
    const businss_name = document.getElementById("user_name").value;
    const businesscategory = document.getElementById("business_category").value;
    const city_Id = document.getElementById("city_id").value;
    const token = window.localStorage.getItem("Jwt_token");

    const payload = {
      data: {
        name: businss_name,
        cities: [city_Id],
        business_categories: [businesscategory],
      },
    };
    fetch(`${URL}/api/businesses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };
  useEffect(() => {
    fetch(`${URL}/api/business-categories`)
      .then((res) => res.json())
      .then((data) => {
        setBusinesscategory(data.data);
        console.log("businesscategory====>", data.data);
      })
      .catch((err) => err);

    fetch(`${URL}/api/countries`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.data);
        console.log("counties===> ", data.data);
      })
      .catch((err) => err);
  }, []);

  //     Get all states by country select
  const getstate = (e) => {
    const CountryID = e.target.value;
    fetch(`${URL}/api/states?filters[country][id][$eq] = ${CountryID}`)
      .then((res) => res.json())
      .then((data) => {
        setStates(data.data);
        console.log("states====>", data.data);
      })
      .catch((err) => err);
  };
  const getCity = (e) => {
    console.log("cities====>", e.target.value);
    const StateId = e.target.value;
    fetch(`${URL}/api/cities?filters[state][id][$eq] =${StateId}`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data.data);
        console.log("cities====>", data.data);
      })
      .catch((err) => err);
  };

  return (
    <>
      <form className="mt-5">
        <select
          class="form-select mt-5"
          aria-label="Default select example"
          onClick={(e) => getstate(e)}
        >
          {countries.map((cv, idx) => {
            return (
              <option key={idx} value={cv.id}>
                {cv.attributes.name}
              </option>
            );
          })}
        </select>
        {states.length !== 0 && (
          <select
            class="form-select mt-5"
            aria-label="Default select example"
            onClick={(e) => getCity(e)}
          >
            {states.map((cv, idx) => {
              return (
                <option key={idx} value={cv.id}>
                  {cv.attributes.name}
                </option>
              );
            })}
          </select>
        )}
        {cities.length !== 0 && (
          <select
            class="form-select mt-5"
            aria-label="Default select example "
            id="city_id"
          >
            {cities.map((cv, idx) => {
              return (
                <option key={idx} value={cv.id}>
                  {cv.attributes.name}
                </option>
              );
            })}
          </select>
        )}
        <select
          class="form-select mt-5"
          aria-label="Default select example"
          id="business_category"
        >
          {businesscategory.map((cv, idx) => {
            return (
              <option key={idx} value={cv.id}>
                {cv.attributes.name}
              </option>
            );
          })}
        </select>
        <div className="mb-3 mt-5">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Business Name
          </label>
          <input
            type="text"
            className="form-control"
            id="user_name"
            aria-describedby="emailHelp"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={BusinessRgt}>
          Submit
        </button>
      </form>
    </>
  );
}
