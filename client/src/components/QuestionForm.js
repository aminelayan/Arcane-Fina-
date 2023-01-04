import React, { useEffect, useState } from 'react'
import { Paper,
    FormControl,
    OutlinedInput,
    Button,
    StepLabel,
    TextareaAutosize,
    InputLabel,
 } from "@material-ui/core"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'
import "./App.css"

 const styles = {
    paper: {
        width: "80%", padding: "1rem",margin:"auto" , marginTop:"2rem",backgroundColor:"lightgrey"
    },
    input: {
        marginBottom: "1rem"
    },
    button: {
        width: "100%"
    }
}


const QuestionForm = (props) => {
    
    const navigate = useNavigate()
    const [question,setQuestion]=useState("")
    const [choice1,setChoice1]=useState("")
    const [choice2,setChoice2]=useState("")
    const [choice3,setChoice3]=useState("")   
    const [choice4,setChoice4]=useState("")
    const  user=(JSON.parse(localStorage.getItem('user'))._id)
    const userName=(JSON.parse(localStorage.getItem('user')).firstName)

  const [questions,setQuestions]=useState([])
  const [errors,setErrors] = useState([])


  const createQuestion = poll =>{
      axios.post('http://localhost:8000/api/polls',poll)
      .then(res =>{
        console.log("res",res)
          setQuestions([...questions,res.data]);
          console.log(questions)
          navigate('/')
      })
      .catch(err=>{
          const errorResponse = err.response.data.errors; 
          const errorArr = []; 
          for (const key of Object.keys(errorResponse)) { 
              errorArr.push(errorResponse[key].message)
          }
          setErrors(errorArr);
      })         
  }


    const onSubmitHandler = e=>{
        e.preventDefault();
        console.log('user',user)
        console.log("ques",questions)
        console.log('username',userName)
        createQuestion({question,choice1,choice2,choice3,choice4,user,userName})
    }
return (
<div>
    <NavBar userId={user} userName={userName}/>
            <form style={{textAlign:"center",display:"flex",flexDirection:"column",width:"50%",margin:" 60px auto"}} onSubmit={onSubmitHandler}>
                <FormControl variant='outlined' style={styles.input}>
                    <OutlinedInput style={{textAlignLast:"center"}} id="required" placeholder="Question (Required)" onChange={e=>setQuestion(e.target.value)}/>
                </FormControl>
                <FormControl style={styles.input}>
                    <OutlinedInput style={{textAlignLast:"center"}} id="required1" placeholder="Choice 1 (Required)" type="text" onChange={(e)=> setChoice1(e.target.value)}/>
                </FormControl>
                <FormControl style={styles.input}>
                    <OutlinedInput style={{textAlignLast:"center"}} id="required2" placeholder="Choice 2 (Required)" type="text" onChange={(e)=> setChoice2(e.target.value)}/>
                </FormControl>
                <FormControl style={styles.input}>
                    <OutlinedInput style={{textAlignLast:"center"}} placeholder="Choice 3" type="text" onChange={(e)=> setChoice3(e.target.value)}/>
                </FormControl>
                <FormControl style={styles.input}>
                    <OutlinedInput style={{textAlignLast:"center"}} placeholder="Choice 4" type="text" onChange={(e)=> setChoice4(e.target.value)}/>
                </FormControl>
                <div> 
                <Button type="submit" variant="contained" color="primary">Add A Poll</Button>
                <Button  href='/' style={{backgroundColor:"#3F50B5", color:"white",marginLeft:"1rem"}}>Cancel</Button>
                {errors.map((msg, index) => <p key={index}>{msg}</p>)}</div>
            </form>
    </div>
)
}

export default QuestionForm