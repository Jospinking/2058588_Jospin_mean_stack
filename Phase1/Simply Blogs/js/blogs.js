// Global vars to keep track of page content
var row_count = 0 
var col_count = 0
current_cells = []
blogs = []

function getBlogData(){
    var blog_title = document.getElementById("title").value
    var blog_desc = document.getElementById("article").value
    var blog_image = document.getElementById("img").value


    // Stores the Data in localStorage
    storeData(blog_title,blog_desc,blog_image)
    postBlog(blog_title,blog_desc,blog_image)
    clearBlogForm()
}

function postBlog(title,article,img){
    // nested function which is responsible to inserting a new row of 3 cols
    function create_row(){
        var table = document.getElementById('blogPostTable')
        var tbody = document.getElementsByTagName('tbody')[0]
        var new_row = tbody.insertRow(-1)
        var cell1 = new_row.insertCell(0)
        var cell2 = new_row.insertCell(1)
        var cell3 = new_row.insertCell(2)
        return [cell1,cell2,cell3]
    }
    console.log("Made it to postBlog!")
    if( (row_count == 0 && col_count == 0) || col_count == 3){
        current_cells = create_row()
        col_count = 0
    }
    var curr_cell = current_cells[col_count]

    var inner_html = get_inner_HTML(title,article,img)
    curr_cell.innerHTML = inner_html
    col_count++
}


function get_inner_HTML(title,article,img){
    if(!img){
        return `
        <div class='smallBlog'>
            <h4>${title}</h4>
            <div class="smallBlogDesc">
                <p>${article}</p>
            </div>
        </div>`
    }
    else{
        return `
            <div class='smallBlog'>
                <h4>${title}</h4>
                <div class="smallBlogDesc">
                    <p>${article}</p>
                </div>
                <div class="thumbnail">
                    <a href="${img}">
                        <image class="smallBlogImg" src="${img}"></image>
                    </a>
                </div>
            </div>`
    }
}

function clearBlogForm(){
    document.getElementById("title").value = ""
    document.getElementById("article").value = ""
    document.getElementById("img").value = ""
}

// Storage Functions
function storeData(title,article,img){
    function checkStorageExists(){
        return localStorage.getItem('blogs') != null
    }

    var storage_exists = checkStorageExists()

    if(storage_exists){
        // since the storage exists, we need to get it and update it
        var list_of_blogs = JSON.parse(localStorage.getItem('blogs'))
        blog_data = {}
        blog_data.title = title
        blog_data.desc = article
        blog_data.img = img
        list_of_blogs.push(blog_data)
        localStorage.setItem("blogs",JSON.stringify(list_of_blogs))   
    }
    else{
        blog_data = {}
        blog_data.title = title
        blog_data.desc = article
        blog_data.img = img
        blogs.push(blog_data)
        json_blog_data = JSON.stringify(blogs)
        localStorage.setItem("blogs",json_blog_data)
    }
}

function clearLocalStorage(){
    localStorage.clear()
}


function create_grid_row(){
    var gridStart = document.getElementById("blogPostsGrid")
    var new_row = document.createElement('div')
    new_row.id = row_count
    new_row.className = 'row'
    gridStart.appendChild(new_row)
}

function create_grid_col(){
    var gridStart = document.getElementById("blogPostsGrid")
    console.log(gridStart)
    console.log("curr_row num = " + row_count)
    var curr_row = document.getElementById(row_count.toString())
    console.log(curr_row)
    var new_col = document.createElement('div')
    new_col.className = 'col'
    curr_row.appendChild(new_col)
    console.log("created col...")
    return new_col
}


function show_data(){

    var mode = localStorage.getItem("mode")
    if(mode == 'table'){
        retreiveData
    }
    else if(model == 'grid'){
        var grid_loc = document.getElementById("gridBlogLocation")
        var grid = document.createElement('div')
        grid.id = 'blogPostsGrid'
        grid_retrieve_data();
    }
}

function table_mode_enable(){
    grid_mode = false
    table_mode = true
    localStorage.setItem('mode','table')
    return table_mode
}
function grid_mode_enable(){
    table_mode = false
    grid_model = true
    localStorage.setItem('mode','grid')
    return grid_mode
}