// Description: backend.js manages the task inputs and deletes
// tasks are added to the array in the JSON file
const fs = require('fs')
const pages = require('./pages')
function create_storage_file(){}

function store(data_loc,query){
	console.log("[LOG]: Storing the following query: ")
	// convert to obj
	task = {
		"taskid": query.taskid,
		"empid" : query.empid,
		"empName" : query.empName,
		"task" : query.task
	}
	console.log(task)

	let task_data = JSON.parse(fs.readFileSync(data_loc,"utf-8"))
	
	// store records in obj using array push method
	task_data['tasks'].push(task)

	// convert to string & store using fs module
	fs.writeFileSync(data_loc,JSON.stringify(task_data,null,4))
}

function deleteTask(data_loc,query){
	let tid = parseInt(query.taskid)
	console.log("[LOG]: DELETING the following query: ")
	console.log("--> " + tid + " of type: " + typeof(tid))
	
	// read from file & convert to json
	let task_data = JSON.parse(fs.readFileSync(data_loc,"utf-8"))

	// check val using iterator or loop
	let tid_exists = (task_id,arr) => {
		for(let [idx,item] of arr.entries()){
			if(item['taskid'] === task_id){
				return idx
			}
		}
		return -1;
	}
	let tid_idx = tid_exists(tid.toString(),task_data['tasks'])
	console.log("idx ==) " + tid_idx)

	if(tid_idx != -1){
		console.log("[LOG]: Found the task")
		// delete using arr methods
		task_data['tasks'].splice(tid_idx,1)
		
		// store in file using fs module
		fs.writeFileSync(data_loc,JSON.stringify(task_data,null,4))
		return true;
	}
	else{
		console.log("[LOG]: Didn't find the task")
		return false;
	}
}

function display(data_loc,html_content){
	let task_data = JSON.parse(fs.readFileSync(data_loc,"utf-8"))

	let json2rows = (task_arr) => {
		let table_rows = []
		for(let [idx,item] of task_arr.entries()){
			let col1 = `<td>${item['taskid']}</td>`
			let col2 = `<td>${item['empid']}</td>`
			let col3 = `<td>${item['empName']}</td>`
			let col4 = `<td>${item['task']}</td>`
			let row = `<tr>${col1}${col2}${col3}${col4}</tr>`
			table_rows.push(row)
		}
		return table_rows
	}

	let table_rows = json2rows(task_data['tasks'])

	let table_start = html_content.split('<tr></tr>')[0]
	let table_end = html_content.split('<tr></tr>')[1]
	for(let row of table_rows){
		table_start += row
	}
	let finished_table = table_start + table_end

	return finished_table
}

function display_deletion_error(data_loc){
    // this will show when a taskID is not found
    let msg = `<p style="color:red;">ERROR: The taskID wasn't found!</p>`
    let delete_form_before = pages.index.split("<span></span>")[0]
    let delete_form_after = pages.index.split("<span></span>")[1]
    let new_delete_form = delete_form_before + msg + delete_form_after
	new_delete_form = display(data_loc,new_delete_form)
    return new_delete_form
}

module.exports = {
    create_storage_file,
    store,
    deleteTask,
    display,
    display_deletion_error
}