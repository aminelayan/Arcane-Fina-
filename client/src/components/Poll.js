import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal, Radio, message } from 'antd';
import NavBar from './NavBar'
import io from 'socket.io-client';
import Waad from './Footer';

const Poll = () => {
    const [poll,setPoll]=useState({})
    const [x,setX]=useState(0)
    const [socket] = useState(() => io(':8000'));
    const navigate=useNavigate()
    const {id} = useParams()
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [visible, setVisible] = useState(false);
    // const [visible1, setVisible1] = useState(false);


 
      const handleOk = () => {
          setVisible(false);
          message.success('Thanks for voting!')
          navigate('/result/'+id)
        };

        const handlecancel = () => {
            setVisible(true);
            message.error('')
            navigate('/')
          };

    useEffect(()=>{
        axios.get("http://localhost:8000/api/polls/"+id)
        .then (res => {console.log("izz");setPoll(res.data)})
        .catch(err => console.log(err))
    })
    
    useEffect(() => {
        axios
          .get("http://localhost:8000/api/users/loggedin", {
            withCredentials: true,
          })
          .then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setLoggedInUser(res.data.user);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },[]);

const updateVote= (tanas) =>{
  axios.put("http://localhost:8000/api/polls/"+id,{votes1:tanas+1})
  setVisible(true)
    socket.emit("client",poll.votes1)
    
}

const updateVote2 = (tanas) =>{
    axios.put("http://localhost:8000/api/polls/"+id,{votes2:tanas+1})
    setVisible(true)
    socket.emit("client",poll.votes2)
    
    }


const updateVote3 = (tanas) =>{
  axios.put("http://localhost:8000/api/polls/"+id,{votes3:tanas+1})
  socket.emit("client",poll.votes3)
  setVisible(true);
}

const updateVote4 = (tanas) =>{
  axios.put("http://localhost:8000/api/polls/"+id,{votes4:tanas+1})
  socket.emit("client",poll.votes4)
  setVisible(true);
    }

  return (
    <div style={{ flexWrap:"wrap"}}>
        <NavBar/>
        <h1 style={{textAlign:"center",margin:"35px",textShadow:"2px 2px 5px gray"}}>{poll.question}</h1>
        <div style={{display:"flex",alignItems:"center", justifyContent:"center",flexDirection:"column"}}>
        
         <Button icon="pie-chart" onClick={e=>updateVote(poll.votes1)}>{poll.choice1}</Button>
        

        <Button icon="pie-chart" onClick={e=>updateVote2(poll.votes2)}>{poll.choice2}</Button>
   
        
        {poll.choice3?
        <Button icon="pie-chart" onClick={e=>updateVote3(poll.votes3)}>{poll.choice3}</Button>
        :""
        }

        {poll.choice4?
        <Button icon="pie-chart" onClick={e=>updateVote4(poll.votes4)}>{poll.choice4}</Button>
        :""}

        </div>

        <div style={{display:"flex",marginTop:"50px",justifyContent:"center"}}><Button href={'/'} style={{marginLeft:"35px",backgroundColor:"#1876D1"}}  variant="contained" > Home </Button>
        <Button href={'/result/'+id} style={{marginLeft:"15px",backgroundColor:"#1876D1"}} variant="contained" >Show Reuslt</Button>
        </div>

      <Modal
        centered
        title="Are you sure?"
        visible={visible}
        onOk={handleOk}
        onCancel={handlecancel}
        >
        
        </Modal> 
    </div>
  )
}

export default Poll