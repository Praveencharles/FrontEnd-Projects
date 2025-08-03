let imgBox = document.getElementById("imgbox")
let qr = document.getElementById("qrimg")
let input = document.getElementById("qrtext")

function generateQR(){
    if(input.value.length >0){
    qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+input.value;

    imgBox.classList.add("showimg")
    }
    else{
        input.classList.add("error")
        setTimeout(()=>{
            input.classList.remove("error")
        },300)
    }
}