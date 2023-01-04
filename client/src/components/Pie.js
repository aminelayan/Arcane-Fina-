
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { sizeWidth } from '@mui/system';
import NavBar from './NavBar';
import { Button } from 'antd';
import io from 'socket.io-client';
import Waad from './Footer';

const Pie = (props) => {
    const [x,setX]=useState(0)
    const [socket] = useState(() => io(':8000'));
    const {id} =useParams();
    const [question, setQuestion] = useState({})
    const [loaded,setLoaded] = useState(false)
    const [loaded2,setLoaded2] = useState(false)

    useEffect(()=>{
        axios.get("http://localhost:8000/api/polls/"+id)
        .then (res =>{
            setQuestion(res.data)
            setLoaded(true)
            socket.on('server',data => {
                x==0?setX(1):setX(0)
                console.log(data)
        })
    })
        .catch(err=>console.error(err))
    },[x])




const parseChartdata = () => {
    const labels = [] ;
    const data = [];
    if(question.choice4 && question.choice3 ){
        labels.push(question.choice1,question.choice2,question.choice3,question.choice4);
        data.push(question.votes1,question.votes2,question.votes3,question.votes4);
    }else if(question.choice3){
        labels.push(question.choice1,question.choice2,question.choice3);
        data.push(question.votes1,question.votes2,question.votes3);
    }else  if(question.choice4){
        labels.push(question.choice1,question.choice2,question.choice4);
        data.push(question.votes1,question.votes2,question.votes4);
    }
    else{
        labels.push(question.choice1,question.choice2);
        data.push(question.votes1,question.votes2);
    }
      

    const chartData ={
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726",
                    "red"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D",
                    "red"
                ]
            }
        ]
    }
    return chartData;
}

    const chartData = parseChartdata();

    
    return (
        <div>
            <NavBar/>
            
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"2rem"}}>
            <h2 style={{marginTop:"1rem"}}>Results for : {question.question}</h2>
            {loaded?<Chart  type="pie" data={chartData} style={{ position: 'center', width: props.w || "400px",marginTop:"2rem" }} />:<p>wait</p>}
            
            <Button href='/' style={{marginTop:"2rem"}}>Home</Button>
            </div>

        </div>
    )
}


export default Pie;