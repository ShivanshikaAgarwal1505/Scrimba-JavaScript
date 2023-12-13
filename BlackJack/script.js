let fc=6;
let sc=10;
let hasBJ=false;
let cash=true;
let sum=fc+sc;
let msg="";

if (sum<21){
    msg="Draw another?";
}
else if (sum===21){
    msg="Celebrate!!";
    hasBJ=true;
}
else if (sum>21){ 
    msg="Out of game.";
    cash=false;
}
