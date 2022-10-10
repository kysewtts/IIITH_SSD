import React from "react";
import axiosInstance from "../axiosInstance";
// import { useNavigate } from "react-router-dom";

function TAQuery(props) {
  // const navigate = useNavigate();
  let {
    course_name,
    question_num,
    ta_comment,
    std_comment,
    std_roll,
    IsActive,
    _id,
  } = props.query;

  let taComment = ta_comment;
  let is_active = IsActive;

  let handleChange = (e) => {
    taComment = e.target.value;
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance({
      url: "/query/taQuery",
      method: "POST",
      data: {
        queryId: _id,
        taComment,
      },
    })
      .then((response) => {
        // navigate("/tas/queries");
        is_active = false;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        style={{
          height: "510px",
          width: "1000px",
          border: "3px solid black",
          background: "linear-gradient(to bottom, #66ccff 0%, #ffccff 100%)",
          margin: "auto",
        }}
      >
        <form>
          <div className="container mx-3">
            <label htmlFor="stud_rollno">
              <b>Student's Roll No: {std_roll}</b>
            </label>
            <br />
            <label htmlFor="course">
              <b>Course Name: {course_name}</b>
            </label>
            <br />
            <label htmlFor="question_no">
              <b>Question no: {question_num}</b>
            </label>
            <br />
            <br />
            <label htmlFor="stud_comment">
              <b>Student's Comment: </b>
            </label>
            <br />
            <textarea
              id="stud_comment"
              name="stud_comment"
              rows="4"
              cols="60"
              defaultValue={std_comment}
              readOnly
            />
            <br />
            <label htmlFor="ta_comment">
              <b>Your Response :</b>{" "}
            </label>
            <br />
            <textarea
              id="ta_comment"
              name="ta_comment"
              rows="4"
              cols="60"
              readOnly={is_active ? false : true}
              onChange={handleChange}
              defaultValue={taComment}
            />
            <br />
            <div className="form-group ">
              <div className="col-sm-offset-2">
                {is_active && (
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
                )}
              </div>
            </div>
          </div>
          <br />
        </form>
      </div>
      <br />
    </>
  );
}

export default TAQuery;
