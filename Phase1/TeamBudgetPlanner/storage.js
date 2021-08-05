var myArray = [] ;

function storeData(){
    //using session storage
    sessionStorage.setItem("obj1", myArray)
}

function getData(){
    var data = sessionStorage("obj1");
    console.log(data);
}

function onFormSubmit(){
    var info = readFormData();
    insertNewRecord(info);
    myArray.push(info);;
    resetData();
}

function readFormData(){
    var x = {};
    x.clientName = document.getElementById("cname").Value;
    x.projectName = document.getElementById("pname").Value;
    x.budget = document.getElementById("bname").Value;
    console.log(x);
    return x;

}

function insertNewRecord(info){
    var table = document.getElementById("show");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(body.length);

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = info.clientName;

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = info.projectName;

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = info.budget;

}

function resetData(){
    document.getElementById("cname").Value = "";
    document.getElementById("pname").Value = "";
    document.getElementById("bname").Value = "";
}