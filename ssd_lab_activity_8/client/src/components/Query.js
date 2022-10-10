import React from "react";
export default function Query(props) {
  const {
    exam_name,
    course_name,
    question_num,
    ta_roll,
    ta_comment,
    std_comment,
  } = props.query;
  return (
    <>
      <div>
        <div
          className="h-100 d-flex align-items-center justify-content-center mx-5"
          style={{
            border: "2px solid black",
            background: "linear-gradient(to bottom, #66ccff 0%, #ffccff 100%)",
          }}
        >
          <div className="row">
            <div
              className=" navbar "
              style={{ justifyContent: "space-evenly" }}
            >
              <h6>Exam Name : {exam_name} </h6>
              <h6>course Name : {course_name} </h6>
            </div>
            <div className=" navbar" style={{ justifyContent: "space-evenly" }}>
              <h6>Question No: {question_num} </h6>
              <h6>TA Roll: {ta_roll} </h6>
            </div>

            <br />
            <br />
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Your Comment
              </label>
              <textarea
                className="form-control col-sm-10"
                id="exampleFormControlTextarea1"
                rows="4"
                cols="9"
                value={std_comment}
              ></textarea>
            </div>
            <br />
            <br />
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                TA's Response
              </label>
              <textarea
                className="form-control col-sm-10"
                id="exampleFormControlTextarea1"
                rows="4"
                cols="9"
                value={ta_comment}
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
