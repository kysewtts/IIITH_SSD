import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import TAQuery from "./TAQuery";
import { useNavigate } from "react-router-dom";

export default function TA() {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    axiosInstance({
      url: "/query/taQuery",
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setQueries([...res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  let queriesArr = queries.map((query, i) => {
    return <TAQuery key={i} query={query} />;
  });

  return (
    <div>
      <h2>Student's Concern (for TA)</h2>
      <button
        style={{ backgroundColor: "rgb(149, 216, 245)" }}
        onClick={logout}
      >
        Logout
      </button>
      {/* <div
        style={{
          height: "510px",
          width: "1000px",
          border: "3px solid black",
          background: "linear-gradient(to bottom, #66ccff 0%, #ffccff 100%)",
          margin: "auto",
        }}
      > */}
      {queriesArr}
      {/* </div> */}
    </div>
  );
}
