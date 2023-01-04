
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { sizeWidth } from '@mui/system';

const Pie = (props) => {
    const {id} =useParams();
    const [question, setQuestion] = useState({})
    const [loaded,setLoaded] = useState(false)
    const [loaded2,setLoaded2] = useState(false)

    useEffect(()=>{
        axios.get("http://localhost:8000/api/polls/"+props.id)
        .then (res =>{
            setQuestion(res.data)
            setLoaded(true)
        })
        .catch(err=>console.error(err))
    },[])



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
            {loaded?<Chart type="pie" data={chartData} style={{ position: 'relative', width: props.w }} />:<p>wait</p>}

        </div>
    )
}


export default Pie;