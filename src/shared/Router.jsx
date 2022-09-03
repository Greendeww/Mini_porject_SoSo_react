import React from "react";
import {Route, Routes} from "react-router-dom";
import AddForm from "../pages/AddForm";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Sign from "../pages/Sign";
import HomeConModal from "../components/modal/HomeConModal";
// 2. Router 라는 함수를 만들고 아래와 같이 작성합니다.
const Router = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ditail" element={<HomeConModal/>} />
        <Route path="/addform" element={<AddForm />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signin" element={<Sign />} />
      </Routes>
      
    </>

  );
};

export default Router;