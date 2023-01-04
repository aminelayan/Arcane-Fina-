
import { style } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'
import NavBar from './NavBar'
import Pie2 from './Pie2'

const DashboardUser = () => {
  const [polls,setPolls] =useState([])
  useEffect(()=>{
    axios.get("http://localhost:8000/api/polls")
    .then ((res) =>setPolls(res.data))
    .catch((err) => console.log(err));
  },[])
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loaded,setLoaded] = useState(false)
    useEffect(() => {
        axios
          .get("http://localhost:8000/api/users/loggedin", {
            withCredentials: true,
          })
          .then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setLoggedInUser(res.data.user);
            setLoaded(true)
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },[]);
      const removeFromDom = pollId => {
        setPolls(polls.filter(poll => poll._id != pollId));
    }
  return (
    <div>
      <NavBar loggedInUser={loggedInUser}/>
      <div style={{display:"flex", flexWrap:"wrap"}}>

      {polls.map((poll, index) => {
        if (JSON.parse(localStorage.getItem('user'))._id==poll.user) {
          return (
            <div style={{width:"23%",margin:"1%"}} key={index}>
            <div style={{border:"1px solid #dfdfdf",overflow:"hidden",padding:"10px",display:"flex",flexDirection: "column",alignItems:"center",justifyContent: 'center',textAlign:"center"}}>
          <Link to = {'/poll/'+poll._id}><h3>{poll.question}</h3></Link>

          <div style={{width:"60%"}}>
          <Pie2 id={poll._id} w="200px" />
          </div>
          <p style={{fontSize:"small",marginTop:"20px"}}>Created by {poll.userName} </p>
          <div>

          {loaded && poll.user == (JSON.parse(localStorage.getItem('user'))._id)?
          <div><DeleteButton  id={poll._id} successCallback={()=>removeFromDom(poll._id)} /></div>:<p></p>}
          {/* </div> */}
          </div>
          </div>
          </div>

          )
        }

        return null;
      })}</div>

    </div>
  )
}
export default DashboardUser
