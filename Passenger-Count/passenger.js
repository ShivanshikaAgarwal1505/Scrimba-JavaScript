// document.getElementById("count").innerText="3";
let saveEl=document.getElementById("savepara")
let countEl=document.getElementById("count-el");
let count=0;
function increment(){
    count+=1;
    countEl.innerHTML=count;
}
function save(){
    //console.log(countEl.innerText);
    saveEl.innerHTML += countEl.innerHTML + " - ";
    countEl.innerHTML=0;
    count=0;
}