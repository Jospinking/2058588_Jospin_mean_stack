const CourseModel = require('../model/course.model')
const path = require('path')

// define fns for routes here
let display_index = (req,res) => {
    res.sendFile(path.resolve(__dirname +"/../public/index.html"))
}
let showAddCoursePage = (req,res)=>{
    res.sendFile(path.resolve(__dirname +"/../public/store.html"))
}
let showUpdateCoursePage = (req,res)=>{
    res.sendFile(path.resolve(__dirname +"/../public/update.html"))
}
let showDeleteCoursePage = (req,res) => {
    res.sendFile(path.resolve(__dirname +"/../public/delete.html"))
}

let addCourse = (req,res) => {
    let course = new CourseModel({
        _id:req.body.cid,
        courseName:req.body.cname,
        description:req.body.desc,
        amount:req.body.amnt
    })
    course.save((error,data)=>{
        if(!error){
            console.log("[LOG]: Inserted!")
        }else{
            console.log("[ERROR]: Insertion failure.")
            console.log(error)
        }
    })
    res.sendFile(path.resolve(__dirname +"/../public/store.html"))
}

let updateCourse = (req,res) => {
    let pages = require('../public/display')
    CourseModel.updateOne({_id:req.body.cid},{$set:{amount:parseInt(req.body.amnt)}},(error,data)=>{
        if(!error){
            
            if(data.nModified > 0){
                let page_b = pages.sample_page.split("<span></span>")[0]
                let page_a = pages.sample_page.split("<span></span>")[1]
                page_b += `<h3 style="margin:auto;text-align:center;">Update the Cost of a Course</h3>
                [LOG]: Success! Updated course
                `
                let full_page = page_b + page_a
                res.send(full_page)
            }else{
                let page_b = pages.sample_page.split("<span></span>")[0]
                let page_a = pages.sample_page.split("<span></span>")[1]
                page_b += `<h3 style="margin:auto;text-align:center;">Delete a Course</h3>
                [LOG]: ID doesn't exist! Try again.
                `
                let full_page = page_b + page_a
                res.send(full_page)
            }
        }else{
            let page_b = pages.sample_page.split("<span></span>")[0]
            let page_a = pages.sample_page.split("<span></span>")[1]
            page_b += `<h3 style="margin:auto;text-align:center;">Update the Cost of a Course</h3>
            [ERROR]: Update failure
            ${error}
            `
            let full_page = page_b + page_a

            res.send(full_page)
        }
    })
}

let deleteCourse = (req,res) => {
    let pages = require('../public/display')
    CourseModel.deleteOne({_id:req.body.cid},(error,data)=>{
        if(!error){

            if(data.deletedCount > 0){
                let page_b = pages.sample_page.split("<span></span>")[0]
                let page_a = pages.sample_page.split("<span></span>")[1]
                page_b += `<h3 style="margin:auto;text-align:center;">Delete a Course</h3>
                [LOG]: Success! Deleted course
                `
                let full_page = page_b + page_a
                res.send(full_page)
            }else{
                let page_b = pages.sample_page.split("<span></span>")[0]
                let page_a = pages.sample_page.split("<span></span>")[1]
                page_b += `<h3 style="margin:auto;text-align:center;">Delete a Course</h3>
                [LOG]: ID doesn't exist! Try again.
                `
                let full_page = page_b + page_a
                res.send(full_page)
            }
            
        }else{
            let page_b = pages.sample_page.split("<span></span>")[0]
            let page_a = pages.sample_page.split("<span></span>")[1]
            page_b += `<h3 style="margin:auto;text-align:center;">Delete a Course</h3>
            [ERROR]: Delete failure
            ${error}
            `
            let full_page = page_b + page_a
            res.send(full_page)
        }
    })
}

let retrieveCourseList = (req,res) => {
    // get the delete page template string
    let pages = require('../public/display')
    let display_page = pages.display_page
    
    CourseModel.find({},(error,data)=>{
        if(!error){
            let display_page_b = display_page.split("<tr></tr>")[0]
            let display_age_a = display_page.split("<tr></tr>")[1]

            let course_rows = []
            for(let [idx,course] of data.entries()){
                let row = `<tr><td>${course['_id']}</td><td>${course['courseName']}</td><td>${course['description']}</td><td>${course['amount']}</td></tr>`
                display_page_b += row
            }
            let full_page = display_page_b + display_age_a
            res.send(full_page)
        }else{
            res.send(error)
        }
    })
}

module.exports = {
    display_index,
    showAddCoursePage,
    addCourse,
    retrieveCourseList,
    showUpdateCoursePage,
    updateCourse,
    showDeleteCoursePage,
    deleteCourse
}