let fc=6;
let sc=10;
let hasBJ=false;
let cash=true;
let sum=fc+sc;

if (sum<21){
    console.log("Draw another?");
}
else if (sum===21){
    console.log("Celebrate!!");
    hasBJ=true;
}
else if (sum>21){
    console.log("Out of game.");
    cash=false;
}
