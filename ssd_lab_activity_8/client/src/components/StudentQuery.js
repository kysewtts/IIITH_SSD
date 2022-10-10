import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../axiosInstance";
import Query from "./Query";

function StudentQuery() {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  let addNewQuery = (e) => {
    e.preventDefault();
    navigate("/student/addQuery");
  };

  let logout = (e) => {
    e.preventDefault();
    axiosInstance({
      url: "/user/logout",
      method: "DELETE",
    })
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosInstance({
      url: "/query/studentQuery",
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setQueries([...res.data.result]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(queries);
  let queriesArr = queries.map((query, i) => {
    return <Query key={i} query={query} />;
  });

  return (
    <div>
      <div className=" navbar navbar-light bg-light justify-content-between mx-5">
        <h2>FeedBacks</h2>
        <button
          style={{ backgroundColor: "rgb(149, 216, 245)" }}
          onClick={addNewQuery}
        >
          Add New Query
        </button>
        <button
          style={{ backgroundColor: "rgb(149, 216, 245)" }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
      {queriesArr}
    </div>
  );
}

export default StudentQuery;
