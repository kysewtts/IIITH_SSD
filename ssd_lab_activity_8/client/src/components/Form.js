import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../axiosInstance";

export default function Form() {
  const navigate = useNavigate();
  const ta_names = {
    SSD: [{ Shaon: "9" }, { Peyush: "14" }, { Ashish: "2" }, { Mayank: "42" }],
    DSAPS: [{ Divit: "1" }, { Kishan: "8" }, { Padam: "11" }, { Sarthak: "6" }],
  };
  const [query, setQuery] = useState({
    exam_name: "",
    course_name: "SSD",
    question_num: 0,
    ta_roll: "9",
    std_comment: "",
  });

  let ta_name_options = [];

  console.log(query);
  let handleInputChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  let handleCourseChange = (e) => {
    setQuery({
      ...query,
      course_name: e.target.value,
      ta_roll: e.target.value === "SSD" ? "9" : "1",
    });
  };

  let handleSelectTAName = (e) => {
    setQuery({
      ...query,
      ta_roll: e.target.value,
    });
  };

  ta_name_options = Object.entries(ta_names[query.course_name]).map(
    ([k, v], i) => {
      const key = Object.keys(v)[0];
      const value = v[key];
      return (
        <option key={i} value={value}>
          {key}
        </option>
      );
    }
  );

  let handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance({
      url: "/query/studentQuery",
      method: "POST",
      data: {
        exam_name: query.exam_name,
        course_name: query.course_name,
        question_num: query.question_num,
        ta_roll: query.ta_roll,
        std_comment: query.std_comment,
      },
    })
      .then((res) => {
        console.log(res);
        navigate("/student");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosInstance({
      url: "/query/getQuestionNumber",
      method: "GET",
      data: {
        course_name: query.course_name,
        name: "Ujjwal",
      },
    })
      .then((res) => {
        setQuery({
          ...query,
          question_num: res.data.question_num,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Query Form</h2>
      <div
        style={{
          height: "450px",
          width: "1000px",
          border: "2px solid black",
          background: "linear-gradient(to bottom, #66ccff 0%, #ffccff 100%)",
          margin: "auto",
        }}
      >
        <form className="form-horizontal mx-5" action="/action_page.php">
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="text">
              <b>Exam Name:</b>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="exam_name"
                name="exam_name"
                required
                placeholder="Which exam is it"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="role">
              <b>Select Course:-</b>
            </label>
            <select
              className="bg-info"
              style={{ margin: "15px" }}
              name="course_name"
              id="course_name"
              defaultValue={query.course_name}
              onChange={handleCourseChange}
            >
              <option value="SSD">SSD</option>
              <option value="DSAPS">DSAPS</option>
            </select>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="number">
              <b>Question No:</b>
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="question_num"
                name="question_num"
                required
                placeholder="Enter Question number"
                onChange={handleInputChange}
                value={query.question_num}
                readOnly
              />
            </div>
          </div>
          <label htmlFor="role">
            <b>TA name:-</b>
          </label>
          <select
            className="bg-info"
            style={{ margin: "15px" }}
            id="ta_roll"
            name="ta_roll"
            onChange={handleSelectTAName}
            value={query.ta_roll}
          >
            {ta_name_options}
          </select>
          <br />
          <div className="form-group">
            <label htmlFor="comment">
              <b>Comments: </b>
            </label>
            <textarea
              className="form-control"
              rows="3"
              id="std_comment"
              name="std_comment"
              placeholder="Any message from your side"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <br />
          <div className="form-group ">
            <div className="col-sm-offset-2">
              <span className="">
                <button
                  type="submit"
                  className="btn btn-default mx-20 "
                  style={{
                    background: "rgb(242, 174, 207)",
                    height: "40px",
                    width: "140px",
                  }}
                  onClick={handleSubmit}
                >
                  <b>Post</b>
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
