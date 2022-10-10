import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../axiosInstance";

function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    roll: 0,
    password: "",
    role: "student",
  });

  const handleInputChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { roll, password, role } = info;
    axiosInstance({
      url: "/user/login",
      method: "POST",
      data: {
        roll,
        password,
        role,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.userSession.role === "student") {
          navigate("/student");
        } else {
          navigate("/tas/queries");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { roll, password, role } = info;
    axiosInstance({
      url: "/user/signup",
      method: "POST",
      data: {
        roll,
        password,
        role,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        style={{
          border: "3px solid black",
          borderRadius: "20px",
          background: "linear-gradient(to bottom, #66ccff 0%, #ffccff 100%)",
        }}
        className="m-5"
      >
        <div className="h-100 d-flex align-items-center justify-content-center">
          <form action="redir.html">
            <div className="container">
              <h1>Re-val Portal</h1>
              <br />
              <label htmlFor="rollno" className="mx-3">
                <b>Roll No-</b>
              </label>
              <input
                type="text"
                placeholder="Enter Roll No"
                name="roll"
                required
                onChange={handleInputChange}
              />
              <br />
              <br />
              <label htmlFor="psw" className="mx-3">
                <b>Password-</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                required
                onChange={handleInputChange}
              />
              <br />
              <br />
              <label htmlFor="role" className="mx-3">
                <b>Select role:</b>
              </label>
              <select
                name="role"
                id="role"
                defaultValue={info.role}
                onChange={handleInputChange}
              >
                <option value="student">Student</option>
                <option value="ta">TA</option>
              </select>
              <br />
              <br />
              <div className="clearfix ">
                <button
                  type="submit"
                  className="Sign in mx-3 bg-info"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
                <button
                  type="submit"
                  className="Sign up bg-info"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
              </div>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}

// class Login extends React.Component {
//   state = {
//     roll: "",
//     password: "",
//     role: "student",
//   };

//   handleInputChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   handleSelectChange = (e) => {
//     this.setState({
//       role: e.target.value,
//     });
//   };

//   handleSignup = (e) => {
//     const data = {
//       roll: this.state.roll,
//       password: this.state.password,
//       role: this.state.role,
//     };
//     e.preventDefault();
//     axios
//       .post("http://localhost:4000/user/signup", data)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   handleLogin = (e) => {
//     const data = {
//       roll: this.state.roll,
//       password: this.state.password,
//       role: this.state.role,
//     };
//     e.preventDefault();
//     axiosInstance({
//       url: "/user/login",
//       method: "POST",
//       data,
//     })
//       .then((res) => {
//         // console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   render() {

//   }
// }

export default Login;
