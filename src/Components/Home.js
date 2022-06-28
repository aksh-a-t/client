import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { NavLink, Link } from "react-router-dom";

const Home = () => {
  const [height, setHeight] = useState("");
  useEffect(() => {
    setHeight(`${window.innerHeight}px`);
  }, []); 
  return (
    <div style={{ height: height }} id="homepage-cont">
      <div className="homepage-back-overlay constantMargin">
        <div id="main-Heading"></div>
        <div id="subHeading">
        Its Greate Time For A Good Taste Of Food
        </div>
        <div style={{ marginTop: "5px" }}>
          <NavLink
            style={{ color: "white", textDecoration: "none" }}
            to="/register"
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "darkgreen", color: "white" }}
            >
              Register
            </Button>
          </NavLink>
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              marginLeft: "10px  ",
            }}
            to="/login"
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "darkgreen", color: "white" }}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
