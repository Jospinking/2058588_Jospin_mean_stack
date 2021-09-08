const express = require("express")
const router = express.Router()
const CourseController = require("../controller/course.controller")

router.get("/",CourseController.display_index)

router.get("/store",CourseController.showAddCoursePage)
router.post("/store",CourseController.addCourse)

router.get("/retrieve",CourseController.retrieveCourseList)

router.get('/update',CourseController.showUpdateCoursePage)
router.post('/update',CourseController.updateCourse)

router.get('/delete',CourseController.showDeleteCoursePage)
router.post('/delete',CourseController.deleteCourse)

module.exports = router