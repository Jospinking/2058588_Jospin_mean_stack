const fs = require("fs");
const reader = require('readline-sync')

class Logger{

    log_path = ""
    queries = null

    constructor(log_path,queries){
        this.log_path = log_path;
        this.queries = queries

        // Check if the log file exists
        if(fs.existsSync(this.log_path)){
            console.log("[LOG]: Log File Exists! Logging data in: " + this.log_path)
        }
        else{
            // Create the log file
            console.log("[LOG]: Created log file here: " + this.log_path)
            this.create_log_file()   
        }
    }

    create_log_file(){
        let curr_dateTime = this.getCurrentDateTime()
        fs.writeFileSync(this.log_path,"")
        fs.writeFileSync(this.log_path,`[${curr_dateTime[0]} - ${curr_dateTime[1]}]: === Creating Log File ===\n`)
    }

    getCurrentDateTime(){
        let date = new Date()
        let curr_date = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()
        let curr_time = date.toLocaleTimeString()
        return [curr_date,curr_time]
    }

    promptUser(){
        debugger
        let record = {}
        // ask the user for each of the queries in the list
        for(let [k,v] of Object.entries(this.queries)){
            let user_input = reader.question(v)
            debugger
            record[k] = user_input
            debugger
        }
        let curr_dateTime = this.getCurrentDateTime()
        // Add the current date and time
        record['current_date'] = curr_dateTime[0]
        record['current_time'] = curr_dateTime[1]

        fs.writeFileSync(this.log_path,`[${curr_dateTime[0]} - ${curr_dateTime[1]}]: ****** User Inputted the Following *******\n`,{flag:'a'})
        fs.writeFileSync(this.log_path,JSON.stringify(record,null,4) + "\n",{flag:'a'})
        return record
    }

    recordsExist(json_loc){
        if(fs.existsSync(json_loc)){}
        else{
            let curr_dateTime = this.getCurrentDateTime()
            // JSON records doesn't exists
            let records_structure = {"people":[]}
            fs.writeFileSync(json_loc,JSON.stringify(records_structure)+'\n',{flag:'a'})
            fs.writeFileSync(this.log_path,`[${curr_dateTime[0]} - ${curr_dateTime[1]}]: === Created JSON Records file ===\n`,{flag:'a'})
        }
    }

    log_record_JSON(json_loc,record){
        // Check if JSON records file exists
        this.recordsExist(json_loc)

        // Read in the record JSON file
        let data = fs.readFileSync(json_loc,"utf-8")
        let records_data = JSON.parse(data)
        debugger;

        // Append to the existing inner array of records under the "people" key
        records_data["people"].push(record)
        debugger

        fs.writeFileSync(json_loc,JSON.stringify(records_data,null,4)+"\n")
        fs.writeFileSync(this.log_path,"****** Appended Entry to JSON *******\n",{flag:'a'})
        console.log("================================")
    }

    display_entry(records){
        fs.writeFileSync(this.log_path,JSON.stringify(records) + "\n",{flag:'a'})
    }

    display_records(data_loc){
        data = fs.readFileSync(data_loc,"utf-8")
        fs.writeFileSync(this.log_path,"======== Current Stored Records ========\n",{flag:'a'})
        fs.writeFileSync(this.log_path,data + "\n",{flag:'a'})
    }

    delete_log(){
        fs.unlinkSync(this.log_path)
    }
}

// Module Exports go here:
module.exports = {Logger}