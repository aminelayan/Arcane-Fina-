import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import  { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Modal, message } from 'antd';
const NavBar = (props) => {

    const [visible,setVisible] = useState(false)

    const handleOk = () => {
      setVisible(false);
      message.warning('Please Sign In!')
      navigate('/login')
    };

    const handlecancel = () => {
        setVisible(true);
        message.error('Please Login To Create Poll Or View Profile')
        navigate('/')
      };

      const showModal = () => {
        navigate('/dashboard')
      }
    const navigate = useNavigate()

      
      const logout = (e) => {
        axios
          .get("http://localhost:8000/api/users/logout", { withCredentials: true })
          .then((res) => {
            console.log(res);
            localStorage.clear()
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
    
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"white"}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="black"
            fontSize="1.5rem"
            fontFamily="Franklin Gothic Medium"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to = {'/'} style= {{textDecoration:"none",fontWeight:"bold",color:"black" , border:"2px #c9ad98 solid",padding:"2px"}} >ARCANE</Link>
            
            {(localStorage.getItem('user')) != null ?
            <span style={{color:"black", marginLeft:"40px",fontFamily:"Arial",fontSize:"1.1rem"}}>Welcome, {(JSON.parse(localStorage.getItem('user')).firstName)} </span>:""}
          </Typography>
          { (localStorage.getItem('user'))!= null?
          <div style={{backgroundColor:"white",width:"300px"}}>
          <Link to="/valid" style={{color:"black", marginRight:"50px"}}>
            + Create Poll
            </Link>
            <Button onClick={showModal} style={{color:"black"}}>My Profile</Button>
            <Modal
        centered
        title="Sign In!"
        visible={visible}
        onOk={handleOk}
        onCancel={handlecancel}
        >
        
        </Modal> 
            </div>:""}
            { (localStorage.getItem('user'))!= null?
                    
                    
                    <Button  variant="outlined" href="/" onClick={logout}>Log Out</Button>

                            :                     
                            <Typography>
                                <Button variant="outlined" href="/login">Login</Button>
                                <Modal
                                  centered
                                  title="Do You Have Account?"
                                  visible={visible}
                                  onOk={handleOk}
                                  onCancel={handlecancel}
                                  >
                                  </Modal> 
                                <Button variant="outlined" href="/registration" style={{marginLeft:"20px"}}>Sign Up</Button>
                            </Typography>
                    }
         
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default NavBar
