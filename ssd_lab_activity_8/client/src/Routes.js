import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";

import { UserContext } from "./App";
import TA from "./components/TA";
import Query from "./components/Query";
import Form from "./components/Form";
import StudentQuery from "./components/StudentQuery";

function RoutesComp() {
  const userContext = useContext(UserContext);
  const { loggedIn, role } = userContext;
  console.log(loggedIn);
  console.log(role);

  let routes;
  if (!loggedIn) {
    routes = (
      <Routes>
        <Route path="/student" element={<Login />} />
        <Route path="/student/addQuery" element={<Login />} />
        <Route path="/tas/queries" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    );
  } else {
    <Routes>
      <Route
        path="/tas/queries"
        component={role === "ta" ? <TA /> : <StudentQuery />}
      />
      <Route
        path="/student"
        component={role === "student" ? <StudentQuery /> : <TA />}
      />
      <Route
        path="/student/addQuery"
        component={role === "student" ? <StudentQuery /> : <TA />}
      />
      <Route
        path="/"
        component={role === "student" ? <StudentQuery /> : <TA />}
      />
    </Routes>;
  }

  return (
    <>
      <Routes>
        <Route path="/tas/queries" element={<TA />} />
        <Route path="/entry" element={<Query />} />
        <Route path="/student/addQuery" element={<Form />} />
        <Route path="/student" element={<StudentQuery />} />
        <Route path="/" element={<Login />} />
      </Routes>
      {/* <Routes>
        {loggedIn && (
          <>
            <Route
              path="/student"
              element={role === "student" ? <StudentQuery /> : <TA />}
            />
            <Route
              path="/tas/queries"
              element={role === "student" ? <StudentQuery /> : <TA />}
            />
            <Route
              path="/student/addQuery"
              element={role === "student" ? <Form /> : <TA />}
            />
          </>
        )}
        {!loggedIn && <Route path="/" element={<Login />} />}
      </Routes> */}
    </>
  );
}

export default RoutesComp;
