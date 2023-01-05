import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { FormLabel, Input, StepLabel } from "@mui/material";

const CreateUser = () => {
  const [errors, setErrors] = useState([]);
  const [avatar, setAvatar] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isUser:true
    // avatar :avatar,
  });
  const navigate =useNavigate()
  const changehandler = (e) => {
    console.log(e.target.name);
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    console.log(formInfo)
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", formInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/polls");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form style={{margin:"40px auto", width:"40%" ,display:"flex",flexDirection:"column",alignItems:"center"}} onSubmit={register}>
      <h1 style={{marginBottom:"30px"}}>Sign Up</h1>
          <FormLabel>First Name:</FormLabel>
          <Input
            type="text"
            name="firstName"
            className="form-control"
            onChange={changehandler}
          />
          {errors.firstName ? (
            <p className="text-danger">{errors.firstName.message}</p>
          ) : (
            ""
          )}

          <FormLabel>Last Name:</FormLabel>
          <Input
            type="text"
            name="lastName"
            className="form-control"
            onChange={changehandler}
          />
          {errors.lastName ? (
            <p className="text-danger">{errors.lastName.message}</p>
          ) : (
            ""
          )}
        <FormLabel>Email:</FormLabel>
          <Input
            type="text"
            name="email"
            className="form-control"
            onChange={changehandler}
          />
          {errors.email ? (
            <p className="text-danger">{errors.email.message}</p>
          ) : (
            ""
          )}
        <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            name="password"
            className="form-control"
            onChange={changehandler}
          />
          {errors.password ? (
            <p className="text-danger">{errors.password.message}</p>
          ) : (
            ""
          )}
        <FormLabel>Confirm Password:</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            className="form-control"
            onChange={changehandler}
          />
          {errors.confirmPassword ? (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          ) : (
            ""
          )}
  
        <input
          type="submit"
          className="btn btn-primary col-md-2"
          value="Sign up"
          style={{marginTop:"10px"}}
        ></input>
        <Link to={"/login"} style={{textDecoration:"underLine", marginTop:"10px"}}>Already Signed Up, Login !</Link>
      </form>
    </>
  );
};

export default CreateUser;