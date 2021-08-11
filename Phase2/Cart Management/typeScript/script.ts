class Cart{
    constructor(public num_items:number=0,public total_cost:number=0,public cart_items:any[]=Array<any>()){
    }

    addToCart(product_id:string):void{
        // Check if items already exist in storage
        // also updates items array from storage
        this.checkStorage()

        // Gets the price from the HTML tag
        let product_price:string = document.getElementById("price_"+product_id).innerHTML.split('$')[1]

        // check the cart number of items
        if(this.cart_items.length > 0){
            // if greater than 0 then we need to ---
            for(let i = 0; i < this.cart_items.length; i++){
                console.log("Item ID = " + product_id + " ----------- Current ID = " + this.cart_items[i]['product_id'])
                if(product_id == this.cart_items[i]['product_id']){
                    this.cart_items[i]['quantity']++
                    break
                }
                // if we reach the end of the list and still don't have a match, append to the list
                else if( (i == this.cart_items.length - 1) && (product_id != this.cart_items[i]['product_id'])){
                    console.log("Reached the end -- need to add to list $$$$")
                    console.log("Item ID = " + product_id + " &&&&&&&&& Current ID = " + this.cart_items[i]['product_id'])
                    this.cart_items.push(
                        {
                            product_id: product_id,
                            name : document.getElementById("title_"+product_id).innerHTML,
                            price : product_price,
                            image: document.getElementById("pic_"+product_id).getAttribute('src'),
                            quantity: 0
                                  
                        }
                    )
                }
            }
        }
        else{
            this.cart_items.push(
                {
                    product_id: product_id,
                    name : document.getElementById("title_"+product_id).innerHTML,
                    price : product_price,
                    image: document.getElementById("pic_"+product_id).getAttribute('src'),
                    quantity: 1
                }
            )
        }
        
        this.num_items++
        this.total_cost += parseFloat(product_price)
        
        sessionStorage.setItem("cart_items",JSON.stringify(this.cart_items))
        sessionStorage.setItem("total_cost",JSON.stringify(this.total_cost))
        sessionStorage.setItem("total_num_items",JSON.stringify(this.num_items))
        this.updateCartLink()
        console.log(sessionStorage)
    }

    itemUpQuantity(product_id:string){
        this.checkStorage()
        for(let i = 0; i < this.cart_items.length; i++){

            if(product_id == this.cart_items[i]['product_id']){
                this.cart_items[i]['quantity']++
                this.total_cost += parseInt(this.cart_items[i]['price'])
                this.num_items++

                let quantity_tag = document.getElementById('quantity_'+product_id)
                let curr_quantity = parseInt(quantity_tag.innerHTML)
                curr_quantity++
                quantity_tag.innerHTML = curr_quantity.toString()

                let total_tag = document.getElementById("table_cart_total")
                let total_cost = parseInt(total_tag.innerHTML)
                total_cost += parseInt(this.cart_items[i]['price'])
                total_tag.innerHTML = total_cost.toString()

                let total_item_tag = document.getElementById("quantity2price_"+product_id)
                let curr_q2p = parseInt(total_item_tag.innerHTML)
                curr_q2p += parseInt(this.cart_items[i]['price'])
                total_item_tag.innerHTML = curr_q2p.toString()

                sessionStorage.setItem("cart_items",JSON.stringify(this.cart_items))
                sessionStorage.setItem("total_cost",JSON.stringify(this.total_cost))
                sessionStorage.setItem("total_num_items",JSON.stringify(this.num_items))
                break
            }
        }
    }
    itemDownQuantity(product_id:string){
        this.checkStorage()

        for(let i = 0; i < this.cart_items.length; i++){
            if(product_id == this.cart_items[i]['product_id']){
                let item_price:string = this.cart_items[i]['price']

                this.cart_items[i]['quantity']--
                this.total_cost -= parseInt(this.cart_items[i]['price'])
                this.num_items--

                if(this.cart_items[i]['quantity'] == 0){
                    let table:HTMLTableElement = document.getElementById("cartTable") as HTMLTableElement
                    table.deleteRow(1+i)
                    this.cart_items.splice(i,1)
                }else{
                    let quantity_tag = document.getElementById('quantity_'+product_id)
                    let curr_quantity = parseInt(quantity_tag.innerHTML)
                    curr_quantity--
                    quantity_tag.innerHTML = curr_quantity.toString()

                    let total_item_tag = document.getElementById("quantity2price_"+product_id)
                    let curr_q2p = parseInt(total_item_tag.innerHTML)
                    curr_q2p -= parseInt(this.cart_items[i]['price'])
                    total_item_tag.innerHTML = curr_q2p.toString()
                }
                let total_tag = document.getElementById("table_cart_total")
                let total_cost = parseInt(total_tag.innerHTML)
                total_cost -= parseInt(item_price)
                total_tag.innerHTML = total_cost.toString()

                sessionStorage.setItem("cart_items",JSON.stringify(this.cart_items))
                sessionStorage.setItem("total_cost",JSON.stringify(this.total_cost))
                sessionStorage.setItem("total_num_items",JSON.stringify(this.num_items))
                break
            }
        }
    }

    updateCartLink(){
        let exists:boolean = this.checkStorage()
        if(exists){
            let total_num_items = JSON.parse(sessionStorage.getItem("total_num_items"))
            let cart_link_button = document.getElementById("navCartLink")
            cart_link_button.innerHTML = `Cart (${total_num_items})`
        }
    }

    checkStorage():boolean{
        function storageExists() : boolean{
            if(sessionStorage.getItem('cart_items') === null){
                console.log("doesnt exist")
                return false
            }
            else{
                console.log("exists in storage")
                return true
            }
        }

        let exists:boolean = storageExists()
        if(exists){
            this.cart_items = JSON.parse(sessionStorage.getItem('cart_items'))
            this.total_cost = JSON.parse(sessionStorage.getItem('total_cost'))
            this.num_items = JSON.parse(sessionStorage.getItem('total_num_items'))
        }
        return exists
    }
}

function displayCart():void{
    console.log("In the display function -- !")
    // Once on the cart page -- show the part on a table

    // Get the cart information from storage
    let exists:boolean = curr_cart.checkStorage()
    console.log("Here is your array size = " + curr_cart.cart_items.length)
    console.log("Here is the current array = " + JSON.stringify(curr_cart.cart_items))

    // Get the table
    let table:HTMLElement = document.getElementById("cartTable")
    let tbody = document.getElementsByTagName("tbody")[0]
    for(let i = 0; i < curr_cart.cart_items.length; i++){
        let product_id = curr_cart.cart_items[i]['product_id']

        let new_row = tbody.insertRow(i)

        let img_cell = new_row.insertCell(0)
        let name_cell = new_row.insertCell(1)
        let price_cell = new_row.insertCell(2)
        let quantity_cell = new_row.insertCell(3)
        let quantity2price = new_row.insertCell(4)

        let upQuantityButton = `<input type="button" class="btn btn-primary" id="upQuantity_${product_id}" value="+" style="width:40px;height:40px;" onclick="upQuantity_${product_id}()">`
        let downQuantityButton = `<input type="button" class="btn btn-primary" id="downQuantity_${product_id}" value="-" style="width:40px;height:40px;" onclick="downQuantity_${product_id}()">`

        img_cell.innerHTML = `<img class='cartProductImage' src='${curr_cart.cart_items[i]['image']}'>`
        name_cell.innerHTML = curr_cart.cart_items[i]['name']
        price_cell.innerHTML = "$"+curr_cart.cart_items[i]['price']
        quantity_cell.innerHTML = `<div id='quantity_${product_id}'>`+curr_cart.cart_items[i]['quantity'] +"</div>   "+ upQuantityButton + " " + downQuantityButton
        quantity2price.innerHTML = `$<div style='display: inline' id='quantity2price_${product_id}'>`+(parseInt(curr_cart.cart_items[i]['price']) * parseInt(curr_cart.cart_items[i]['quantity'])) + "</div>"
    }
    
    // add the final row that shows the total
    let new_row = tbody.insertRow(-1)

    let name_cell = new_row.insertCell(0)
    let quantity_cell = new_row.insertCell(1)
    let price_cell = new_row.insertCell(2)
    let total_price = new_row.insertCell(3)

    name_cell.innerHTML = "<b>Total</b>"
    name_cell.setAttribute('colspan','2')

    quantity_cell.innerHTML = ""
    total_price.innerHTML = "$<div style='display: inline' id='table_cart_total'>"+sessionStorage['total_cost']+"</div>"

}


// OnClick Functions
function product_101(){
    curr_cart.addToCart("101")
}
function product_102(){
    curr_cart.addToCart("102")   
}
function product_103(){
    curr_cart.addToCart("103")
}
function product_104(){
    curr_cart.addToCart("104")
}

function navigate(){
    curr_cart.updateCartLink()
}

function upQuantity_101(){
    curr_cart.itemUpQuantity("101")
}
function upQuantity_102(){
    curr_cart.itemUpQuantity("102")
}
function upQuantity_103(){
    curr_cart.itemUpQuantity("103")
}
function upQuantity_104(){
    curr_cart.itemUpQuantity("104")
}

function downQuantity_101(){
    curr_cart.itemDownQuantity("101")
}
function downQuantity_102(){
    curr_cart.itemDownQuantity("102")
}
function downQuantity_103(){
    curr_cart.itemDownQuantity("103")
}
function downQuantity_104(){
    curr_cart.itemDownQuantity("104")
}

let curr_cart:Cart = new Cart()

document.addEventListener("DOMContentLoaded", function(){
    navigate()
});