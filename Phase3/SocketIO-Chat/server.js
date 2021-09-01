const express = require("express") //load the module
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const PORT = 8100

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")


})
//this functiom get call if any client send request to server using port number
io.on("connection",(socket)=>{
    console.log("client connected..........")

    socket.on("chat", (msg)=>{   //receive the data from client program "chat is a predefined property and msg is variable name  "
        // We need to unpack the message & display the message
        console.log(`[${msg['name']}]:  ${msg['msg']}`)
    })
})
http.listen(PORT,()=>console.log(`[LOG]: Listening @ http://localhost:${PORT}/`))