/*
Author: Gohur Ali
Version: 04172021
*/
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

let CourseSchema = mongoose.Schema({
    _id:Number,
    courseName:String,
    description:String,
    amount:Number
})

let CourseModel = mongoose.model("",CourseSchema,"Course")

module.exports = CourseModel