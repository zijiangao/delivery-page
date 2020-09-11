$(document).ready(()=>{
    console.log("linked")
    let body=document.querySelector("body")
    body.addEventListener("click",(e)=>{
        console.log(e.target.id)
        if(e.target.id==="order-now"){

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
                    addressText.innerHTML=result.results[0].ADDRESS
                    console.log(result.results[0])
                }})
                postalCodeForm.style.display="none"
                addressForm.style.display="block"
               
        }
        
    })
    
    
})
function getAddressFromPostalCode(postalCode, parentElement){
    $.ajax({
    url: 'https://developers.onemap.sg/commonapi/search?searchVal='+postalCode+'&returnGeom=N&getAddrDetails=Y&pageNum=1',
    success: function(result){
        //Set result to a variable for writing
        
    }})
}
