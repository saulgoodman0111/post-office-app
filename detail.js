async function gotogeo(){
    try{ let ip=localStorage.getItem('ip');
     let geo=await fetch(`https://ipinfo.io/${ip}/geo?token=9692db051c452b`);
 let ans=await geo.json();
 console.log(ans);
 printdata(ans);
 }
 catch(err){
     console.log("can't fetch data from ip")
 }}
 gotogeo();
 function printdata(detail){
     var latLong = detail.loc.split(",");
     let lat = latLong[0].trim();
     let long = latLong[1].trim();
     let locationdetail=document.getElementById('locdetail');
     locationdetail.innerHTML=
     `<p>IP Address:<span id="address">${detail.ip}</span></p>
      <div id="ipaddress">
      <div><p>Lat:<span>${lat}</span></p>
                     <p>Long:<span>${long}</span> </p></div>
         <div><p>City: <span>${detail.city}</span></p>
             <p>Region: <span>${detail.region}</span> </p></div>
         <div>
             <p>Organisation:<span>${detail.org}</span></p>
                     <p>Hostname:<span>${detail.postal}</span> </p></div>
         </div>`
 
     let timezone=document.getElementById('timezone');
     timezone.innerText=detail.timezone;
     setInterval(fun,1000);
     function fun(){
         let dtime = new Date().toLocaleString("en-US", { timeZone: `${detail.timezone}` });      
         let dateandtime=document.getElementById('dateandtime');
         dateandtime.innerText=dtime;        
     }
     let pincode=document.getElementById('pincode');
 //window.location.href='detail.html'
      pincode.innerText=detail.postal;
 printpostaldetail(detail.postal);
 }
 
 async function printpostaldetail(pincode){
     let postaldata= await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
     let res= await postaldata.json();
     localStorage.setItem('postoffices',JSON.stringify(res[0].PostOffice));    
     getpostoffice();
     
 }
 
 function getpostoffice(){
     let data=JSON.parse(localStorage.getItem('postoffices'));
     let postofficebox=document.getElementById('postoffices');
     let msg=document.getElementById('msg');
     msg.innerText=data.length;
     postofficebox.innerHTML='';
     for(let i=0;i<data.length;i++){
     postofficebox.innerHTML+=`<div id="details">
     <p>Name <span>: ${data[i].Name}</span></p>
     <p>Branch Type <span>: ${data[i].BranchType}</span></p>
     <p>Delivery Status <span>: ${data[i].DeliveryStatus}</span></p>
     <p>District <span>: ${data[i].District}</span></p>
     <p>Division <span>: ${data[i].Division}</span></p>
 </div> `}  
 }
 
 
 let searchquery=document.getElementById('filter');
 searchquery.addEventListener('keyup',()=>{
     let q=document.getElementById('filter').value;
   //  let arr=filterbyname(query);
      let query=q.toLowerCase();
      console.log(query);  
   let data=JSON.parse(localStorage.getItem('postoffices'));
     let postofficebox=document.getElementById('postoffices');
    postofficebox.innerHTML='';
     for(let i=0;i<data.length;i++){
         let d=data[i].Name;
         let n=d.toLowerCase();
        if(n.includes(query)){
     postofficebox.innerHTML+=`<div id="details">
     <p>Name <span>: ${data[i].Name}</span></p>
     <p>Branch Type <span>: ${data[i].BranchType}</span></p>
     <p>Delivery Status <span>: ${data[i].DeliveryStatus}</span></p>
     <p>District <span>: ${data[i].District}</span></p>
     <p>Division <span>: ${data[i].Division}</span></p>
 </div> `}  }
 
 for(let i=0;i<data.length;i++){
     let d=data[i].BranchType;
         let n=d.toLowerCase();
        if(n.includes(query)){
  postofficebox.innerHTML+=`<div id="details">
  <p>Name <span>: ${data[i].Name}</span></p>
  <p>Branch Type <span>: ${data[i].BranchType}</span></p>
  <p>Delivery Status <span>: ${data[i].DeliveryStatus}</span></p>
  <p>District <span>: ${data[i].District}</span></p>
  <p>Division <span>: ${data[i].Division}</span></p>
 </div> `}  }
 if(query.trim()===''){
   getpostoffice();
 }
 })