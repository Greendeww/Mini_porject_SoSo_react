import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddForm from "../pages/AddForm";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Sign from "../pages/Sign";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path ="/" element = {<Home/>}/>
          <Route path ="/post" element = {<AddForm/>}/>
          <Route path ="/detail:id" element = {<Detail/>}/>
          <Route path ="/addform" element = {<AddForm/>}/>
          <Route path ="/login" element = {<Login/>}/>
          <Route path ="/signin" element = {<Sign/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default Router;