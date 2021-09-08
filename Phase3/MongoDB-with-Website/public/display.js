let display_page = `

<!DOCTYPE html>
<html lang="en">
<head>
<link rel="icon" href="https://www.ird.lk/wp-content/uploads/2018/11/computerworld_bespoke_training_icon.png">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <title>CMS: All Courses</title>
</head>
<body>
    
    <style>
        th {
            padding-left: 30px;
            padding-right: 30px;
        }
    </style>

    <h1><a href="index.html">Course Management</a></h1>

    <div class="menuarea">
        <div class="menuareaItem">
            <ul class="nav">
                <li class="nav-item navLocation"><a class="nav-location" href="/retrieve">Retrieve All Courses</a></li>
                <li class="nav-item navLocation"><a class="nav-location" href="/store">Add Course</a></li>
                <li class="nav-item navLocation"><a class="nav-location" href="/delete">Delete Course</a></li>
                <li class="nav-item navLocation"><a class="nav-location" href="/update">Update Course</a></li>
            </ul>
        </div>
    </div>

    <div class="bodyContent">
        <h3 style="margin:auto;text-align:center;">Current Stored Courses</h3>
        <table class="classTable table table-striped">
            <thead>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Amount</th>
            </thead>
            <tbody>
                <tr></tr>
            </tbody>
        </table>
    </div>
</body>
</html>
`

let sample_page = `

<!DOCTYPE html>
<html lang="en">
<head>
<link rel="icon" href="https://www.ird.lk/wp-content/uploads/2018/11/computerworld_bespoke_training_icon.png">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <title>CMS: Status</title>
</head>
<body>
    
    <style>
        th {
            padding-left: 30px;
            padding-right: 30px;
        }
    </style>

    <h1><a href="index.html">Course Management</a></h1>

    <div class="menuarea">
        <div class="menuareaItem">
            <ul class="nav">
                <li class="nav-item navLocation"><a class="nav-location" href="/retrieve">Retrieve All Courses</a></li>
                <li class="nav-item navLocation"><a class="nav-location" href="/store">Add Course</a></li>
                <li class="nav-item navLocation"><a class="nav-location" href="/delete">Delete Course</a></li>
                <li class="nav-item navLocation"><a class="nav-location" href="/update">Update Course</a></li>
            </ul>
        </div>
    </div>

    <div class="bodyContent">
        <span></span>
    </div>
</body>
</html>
`
module.exports = {display_page,sample_page}