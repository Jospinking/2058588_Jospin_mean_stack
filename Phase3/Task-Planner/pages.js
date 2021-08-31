let html_page = `
<html>
	<head>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
	</head>
	
	<body>
		<style>
			#taskForm {
				margin: auto;
				width: 400px;
				height: 375px;
				border: 5px solid black;
				border-radius: 30px;
				padding: 0px;
				text-align: center;
			}
			
			.taskInput {
				margin: 10px;
			}

			#taskDeleteForm {
				margin:50px auto;
				width:400px;
				height:175px;
				border:5px solid black;
				border-radius: 30px;
				text-align: center;
				padding: 10px;
			}

			#taskTableDiv {}

			#taskTable {
				border-collapse: separate !important;
				margin: 10px auto;
				text-align: center;
				border-radius: 30px;
				border : 5px solid black;
			}
			th {
				text-align: center;
				padding: 25px;
			}
			td {
				padding: 10px;
			}
		</style>

		<h1 style="margin:auto;text-align:center;">Task Planner</h1>

		<div id="taskForm">
			<form action="/store" method="get">
				<div class="taskInput">
					<label>Task ID: </label><input type="text" name="taskid">
				</div>
				<br/>
				<div class="taskInput">
					<label>Employee ID: </label><input type="text" name="empid">
				</div>
				<br/>
				<div class="taskInput">
					<label>Employee Name: </label><input type="text" name="empName">
				</div>
				<br/>
				<div class="taskInput">
					<label>Task: </label><input type="text" name="task">
				</div>
				<br/>

				<input class="btn btn-success" type="submit" value="Submit Task">
				<input class="btn btn-secondary" type="reset" value="Reset Form">
			</form>
		</div>

        <div id="taskDeleteForm">
			<form action="/delete" method="get">
				<div class="taskInput">
					<label>Task ID: </label><input type="text" name="taskid">
				</div>
				<br/>

				<input class="btn btn-success" type="submit" value="Delete Task">
				<input class="btn btn-secondary" type="reset" value="Reset Form">
				<span></span>
			</form>
		</div>
		
		<div id="taskTableDiv">
			<table id="taskTable">
				<thead>
					<th>Task ID</th>
					<th>Employee ID</th>
					<th>Employee Name</th>
					<th>Task</th>
				</thead>

				<tbody>
					<tr></tr>
				</tbody>
			</table>
		</div>

	</body>
</html>`

let html_store = `<h1>Store page</h1>`
let html_delete = `<h1>Delete page</h1>`

let html_error = "<h1>ERROR</h1>"

let html_table = `
<table id="taskTable">
    <thead>
    </thead>

    <tbody>
    <tr></tr>
    </tbody>
</table>
`

module.exports = { 
    "index":html_page,
    "store":html_store,
    "delete":html_delete,
    "error":html_error,
    "table":html_table
}