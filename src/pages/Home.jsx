import React from "react";
import HomeContents from "../components/homecon/HomeContents";
import Header from "../components/layout/Header";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
const Home = () => {
    return (
        <> 
            <Header />
            <Postcards>  
                <HomeContents /> 
                {/* map 함수 돌리실 곳 */}
            </Postcards>
            <Outlet/>
            
        </>
    );
};

export default Home;

const Postcards = styled.div`
  column-count: 4;
  column-gap: 2em;
  padding: 30px;
`