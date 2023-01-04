import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const UnAuth = () => {
  return (
    <div style={{display:"flex" ,flexDirection:"column",alignItems:"center"}}>
        <h1>Please Login First</h1>
        <Button href='/login'>Sign In </Button>
        <Button href='/'>Home</Button>
    </div>
  )
}

export default UnAuth