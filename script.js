

"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"

 async function fetchdata(){
try{
let res= await  fetch("https://api.ipify.org?format=json");
let data=await res.json();
console.log(data.ip);
localStorage.setItem('ip',data.ip);
ipadd.innerHTML=`Your Current IP Address is <span id="ipad">${data.ip}</span>`
}catch(err){
    console.log('something wrong');
}
 }
getstart.addEventListener('click',()=>{    
    window.location.href='detail.html';
    //gotogeo(ip);
})
fetchdata();
   