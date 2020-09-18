$(document).ready(()=>{
    console.log("linked")
    let subTotal=document.querySelector("#sub-total")
    let deliveryCharge=document.querySelector("#delivery-charge")
    let gst=document.querySelector("#gst")
    let total=document.querySelector("#total")
    let menuList=document.querySelector('.menu')
    let menu=["burger","pasta","drink"]

    let today = new Date()
    deliveryTime= new Date(today.getTime() + 60*60000)
    console.log(deliveryTime)
    
    let date = deliveryTime.getFullYear()+'-'+(deliveryTime.getMonth()+1)+'-'+deliveryTime.getDate()
    let time = deliveryTime.getHours() + ":" + deliveryTime.getMinutes() + ":" + deliveryTime.getSeconds()
    let dateTime = date+' '+time;
    let arrivalTime=document.querySelector("#delivery-time")
    arrivalTime.innerHTML=dateTime


    $.ajax({
        url: 'https://api.spoonacular.com/food/menuItems/search?apiKey=cd1cae240d7a4e1db26196fc73ddab53&query='+menu[0]+"&Hooters"+'&number=50',
        success: function(result){
            console.log(result.menuItems)
            for(let i=0;i<result.menuItems.length;i++){
                makeProductCard(result.menuItems[i])
            }
        }})

    let body=document.querySelector("body")
    body.addEventListener("click",(e)=>{
        console.log(e.target.id)
        if(e.target.id==="burgers"){
            $.ajax({
                url: 'https://api.spoonacular.com/food/menuItems/search?apiKey=cd1cae240d7a4e1db26196fc73ddab53&query='+menu[0]+'&number=50',
                success: function(result){
                    while (menuList.lastElementChild) {
                        menuList.removeChild(menuList.lastElementChild);
                      }
                
                    for(let i=0;i<result.menuItems.length;i++){
                        makeProductCard(result.menuItems[i])
                    }
                }})
        }
        if(e.target.id==="pasta"){
            $.ajax({
                
                url: 'https://api.spoonacular.com/food/menuItems/search?apiKey=cd1cae240d7a4e1db26196fc73ddab53&query='+menu[1]+'&number=50',
                success: function(result){
                    while (menuList.lastElementChild) {
                        menuList.removeChild(menuList.lastElementChild);
                      }
                    console.log(result.menuItems)
                    for(let i=0;i<result.menuItems.length;i++){
                        makeProductCard(result.menuItems[i])
                    }
                }})
        }
        if(e.target.id==="drink"){
            $.ajax({
                url: 'https://api.spoonacular.com/food/menuItems/search?apiKey=cd1cae240d7a4e1db26196fc73ddab53&query='+menu[2]+'&number=200',
                success: function(result){
                    while (menuList.lastElementChild) {
                        menuList.removeChild(menuList.lastElementChild);
                      }
                    console.log(result.menuItems)
                    for(let i=0;i<result.menuItems.length;i++){
                        makeProductCardDrink(result.menuItems[i])
                    }
                }})
        }
        if(e.target.id==="postal-code-button"){
            e.preventDefault()
            let postalInput=document.querySelector("#postal-code-input").value
            let postalCodeForm=document.querySelector("#postal-code-form")
            let addressForm =document.querySelector("#address-form")
            let addressText=document.querySelector("#address")
            // console.log(addressForm)
            $.ajax({
                url: 'https://developers.onemap.sg/commonapi/search?searchVal='+postalInput+'&returnGeom=N&getAddrDetails=Y&pageNum=1',
                success: function(result){
                    //Set result to a variable for writing
                    console.log(result.results[0])
                    if(result.results[0]===undefined){
                        alert("Cannot find postal code, kindly try another postal code")
                    }
                    else{
                        addressText.innerHTML=result.results[0].ADDRESS
                        postalCodeForm.style.display="none"
                        addressForm.style.display="block"
                    } 
                }})
                // addressForm.style.display="block"
               
        }
        
        if(e.target.id==="address-button"){
            e.preventDefault()
            let addressInput=document.querySelector("#address-input").value
            let addressForm=document.querySelector("#address-form")
            let addressText=document.querySelector("#address")
            let postalCodeForm=document.querySelector("#postal-code-form")
            let main=document.querySelector(".main")
            let checkoutAddress= document.querySelector(".checkout-address table td")
            console.log(addressText)
            console.log(addressInput)
            checkoutAddress.innerHTML=addressText.innerHTML + "<br>" + "#" + addressInput      
            
            addressForm.style.display="none"
            // postalCodeForm.style.display="none"
            main.style.display="block"
            
        }

        if(e.target.classList[2]==="add-item-button" && e.target.innerHTML!=="Remove"){
            // <div class="checkout-order-items">
            //         <div>
            //           No items have been added
            //         </div>
            //       </div>
            let productCard=e.target.parentNode.parentNode.parentNode
            let productCardCheckOut=productCard.cloneNode(true)
            let productPrice=e.target.parentNode.parentNode.childNodes[1].childNodes[1].innerHTML.slice(1)
            let checkoutButton=document.querySelector("#checkout-button")
            subTotal.innerHTML="$"+(parseFloat(subTotal.innerHTML.slice(1))+parseFloat(productPrice))
            deliveryCharge.innerHTML="$4.00"
            gst.innerHTML="$"+(parseFloat(subTotal.innerHTML.slice(1))*0.07).toFixed(2)
            total.innerHTML="$"+(parseFloat(subTotal.innerHTML.slice(1))+parseFloat(gst.innerHTML.slice(1))+parseFloat(deliveryCharge.innerHTML.slice(1)))
            productCardCheckOut.classList="product-card border container"
            let button=productCardCheckOut.childNodes[3].childNodes[3].childNodes[1]
            button.innerHTML="Remove"
            let checkoutOrderItems=document.querySelector(".checkout-order-items")
            checkoutOrderItems.appendChild(productCardCheckOut)
            checkoutButton.style.backgroundColor="blue"
            checkoutButton.style.color="white"
            return
        }     
        if(e.target.classList[2]==="add-item-button" && e.target.innerHTML==="Remove"){
            // <div class="checkout-order-items">
            //         <div>
            //           No items have been added
            //         </div>
            //       </div>
            let parent=e.target.parentNode.parentNode.parentNode.parentNode
            let productCard=e.target.parentNode.parentNode.parentNode
            let productPrice=e.target.parentNode.parentNode.childNodes[1].childNodes[1].innerHTML.slice(1)
            let checkoutButton=document.querySelector("#checkout-button")
            subTotal.innerHTML="$"+(parseFloat(subTotal.innerHTML.slice(1))-parseFloat(productPrice))
            gst.innerHTML="$"+(parseFloat(subTotal.innerHTML.slice(1))*0.07).toFixed(2)
            total.innerHTML="$"+(parseFloat(subTotal.innerHTML.slice(1))+parseFloat(gst.innerHTML.slice(1))+parseFloat(deliveryCharge.innerHTML.slice(1)))
            productCard.remove()
            console.log(parent.childNodes[1])
            if(parent.childNodes[1]===undefined){
                deliveryCharge.innerHTML="$0.00"
                total.innerHTML="$"+(parseFloat(subTotal.innerHTML.slice(1))+parseFloat(gst.innerHTML.slice(1))+parseFloat(deliveryCharge.innerHTML.slice(1)))
            }
            if(parseFloat(total.innerHTML.slice(1))===0){
                checkoutButton.style.backgroundColor="gray"
            }
            return
        } 
        if(e.target.id==="checkout-button" && parseFloat(total.innerHTML.slice(1))!==0){
            alert("Your order has been submitted. Kindly prepare change upon arrival.")
            window.location.href = "main.html";
            return
        }           
    })    
})

function makeProductCard(productObject) {
    let productCard=document.createElement("div")
    productCard.className="product-card border col-5"                  
    productCard.innerHTML=(`
        <div class="product-body row"> 
            <img  class="img-fluid img-thumbnail " src=${productObject.image}>
            <h5>${productObject.title}</h5>
        </div>
        <div class="product-footer row">
            <div class="product-cost col-6">
            <h4>$10</h4>
            </div>
            <div class="product-control col-6">
            <button type="button" class="btn btn-danger add-item-button">Add</button>
            </div>
        </div>
    `) 
    let img= document.createElement("img")
    img.src=productObject.image
    img.onload=function(){
        console.log(productObject.title)
        console.log(img.width/img.height)
        if(img.width/img.height>1.4&&img.width/img.height<1.6){
            document.querySelector('.menu').appendChild(productCard)
        }
    } 
}

function makeProductCardDrink(productObject) {
    let productCard=document.createElement("div")
    productCard.className="product-card border col-5"                  
    productCard.innerHTML=(`
        <div class="product-body row"> 
            <img  class="img-fluid img-thumbnail " src=${productObject.image}>
            <h5>${productObject.title}</h5>
        </div>
        <div class="product-footer row">
            <div class="product-cost col-6">
            <h4>$10</h4>
            </div>
            <div class="product-control col-6">
            <button type="button" class="btn btn-danger add-item-button">Add</button>
            </div>
        </div>
    `) 
    let img= document.createElement("img")
    img.src=productObject.image
    img.onload=function(){
        console.log(productObject.title)
        console.log(img.width/img.height)
        if(img.width/img.height>0.9&&img.width/img.height<1.0){
            document.querySelector('.menu').appendChild(productCard)
        }
    } 
}