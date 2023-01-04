
import { FormLabel, Input, StepLabel } from "@mui/material";
import { Form } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
    
  });

  const [errormsg, setErrormsg] = useState(null);
  const navigate = useNavigate()
  const changehandler = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/login", formInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('----',res);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        if (res.data.msg == "tanas") {
          navigate("/");
        } else {
          setErrormsg(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form style={{margin:"40px auto", width:"50%" ,display:"flex",flexDirection:"column",alignItems:"center"}} onSubmit={login}>
      <h1 style={{marginBottom:"30px"}}> Sign in </h1>
        {errormsg ? <p className="text-danger">{errormsg}</p> : ""}
          <FormLabel>Email: </FormLabel>
          <Input
            type="text"
            name="email"
            className="form-control"
            onChange={changehandler}
          />
          <FormLabel style={{marginTop:"10px"}}>Password: </FormLabel>
          <Input
            type="password"
            name="password"
            className="form-control" 
            onChange={changehandler}
          />
        <input
          type="submit"
          className="btn btn-primary col-md-2"
          value="Login"
          style={{marginTop:"2rem"}}
        ></input>
        <Link style={{color:"#1866d6",marginTop:"20px"}} to= {"/registration"}>Don't Have An Account? Sign Up</Link>
      </form>
    </div>
  );
};

export default Login;
