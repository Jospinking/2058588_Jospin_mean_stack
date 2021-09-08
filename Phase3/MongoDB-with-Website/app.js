const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Course = require("./routes/course.router")

const config = {
    PORT: 8100,
    URL: "mongodb://localhost:27017/",
    db_name: "CMS"
}

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const db_config = {
    useNewUrlParser: true,
    useUnifiedTopology:true
}
mongoose.connect(config['URL']+config['db_name'],db_config);
mongoose.connection

app.use("/",Course)
app.use(express.static(__dirname + '/public'));

app.listen(config['PORT'],()=>console.log(`[LOG]: Listening @ http://localhost:${config['PORT']}`))