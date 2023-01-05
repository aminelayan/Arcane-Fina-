import React from "react";
// import { ArchiveFill } from "react-bootstrap-icons";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/arcane-logo.png"
import tanas from "../assets/Tanas.jpg"
// import './App.css'
import "./MainPage.css";
import { Button } from "@mui/material";

const MainPage = () => {
  return (
    <>
      <div id="tanas">
          <div style={{marginTop:"3.5%"}}>
          <img  style={{marginLeft:"100px",marginBottom:"20px",width:"350px"}} src={logo}/>
            <h3  className="image-text">
              <h1 style={{fontFamily:"Rockwell",color:"white"}}>Create Your Poll ! <br/>Vote securely from your Bro.</h1>
              <h4 style={{fontFamily:"Rockwell"}}>in seconds</h4>
            <Button variant="contained" style={{backgroundColor:"grey",width:"200px",height:"50px"}} href="/polls"> Polls </Button>
            </h3>
            <h5 style={{fontFamily:"Monaco", color:"white"}} className="image-text2">
            Arcane makes voting more convenient and<br/> accessible,
             while providing a higher level of security and<br/> auditability.
            </h5>
          </div>
          </div> 
    </>
  );
};

export default MainPage;
