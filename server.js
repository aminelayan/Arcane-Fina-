const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const port = 8000;
const socketIO = require('socket.io');
const app = express();
require("./server/config/mongoose.config");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const server=app.listen(8000, () => console.log("The server is all fired up on port 8000"));
const io = require('socket.io')(server, { cors: true });
io.on("connection",socket=>{
    console.log("Nice to meet you. (shake hand)")
   
    socket.on("client",data=>{
        io.emit("server",data)
        console.log(data)
    })
})


app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({extended:true}));
require("./server/routes/user.routes")(app);
require("./server/routes/polls.routes")(app);

// app.listen(port, () => console.log("listining on port", port));
