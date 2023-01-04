import React from 'react'
import axios from 'axios';
import { Button } from '@mui/material';

export default props => {

    const {id, successCallback } = props;

    const deletePoll = e => {
        axios.delete('http://localhost:8000/api/polls/' + id)
            .then(res=>{
                console.log("inside delete");
                console.log(res);
                console.log(id);
                successCallback();
            })
    }


    return (
        <Button onClick={deletePoll}>
            Delete
        </Button>
    )
}