const UNIT_SIZE = 30;
//初始化画布
let canvas = document.getElementById("playground");
canvas.height = 20 * UNIT_SIZE;
canvas.width = 10 * UNIT_SIZE;
let ctx = canvas.getContext("2d");
//初始化地图
let display = [], map = [];
for (let i = 0; i < 240; i++) {
    map[i]= -1;
}
for (let i = 0; i < 200; i++) {
    display[i] = -1;
}


let sect = document.querySelector("section");
let para = document.createElement('p');
sect.appendChild(para);

//document.addEventListener("keydown",keyDown,false);
//document.addEventListener("keyup",keyUp,false);
// document.addEventListener("keypress",keyPress,false);
// function keyPress(e){
//     if(e.key == "a"||e.key =="A"){
//         posX-=30;
//     }
//     if(e.key == "d"||e.key == "D"){
//         posX+=30;
//     }
//     if(e.key == "w"||e.key =="W"){
//         posY-=30;
//     }
//     if(e.key == "s"||e.key == "S"){
//         posY+=30;
//     }
//     para.textContent = "KeyboardInput:  "+e.key;
// }

function Block() {
    this.kind = "Z"
    this.pos = 1;//旋转了一次
    this.occup = [[1, 4], [2, 4], [2, 5], [3, 5]]//行，列
};

Block.prototype.fall = function () {
    let settled = false;
    for (let i = 0; i < 4 && !settled; i++) {
        if(this.occup[i][0] == 23) settled=true;
    }
    for (let i = 0; i < 4 && !settled; i++) {
        this.occup[i][0]++;
    }
}

let blockNow = new Block();

function mapForm() {
    for (let i = 0; i < 200; i++) {
        display[i] = -1;
    }
    for (let i = 0; i < blockNow.occup.length; i++) {
        display[(blockNow.occup[i][0]-4) * 10 + blockNow.occup[i][1]] = 0;
        //console.log((blockNow.occup[i][0]-4) * 10 + blockNow.occup[i][1]);
    }
    console.log(display);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);//刷新画布
    blockNow.fall();
    mapForm();
    for (let i = 0 ; i < display.length; i++) {
        //console.log("hello");
        if (display[i] == 0) {
            ctx.beginPath();
            ctx.rect(UNIT_SIZE * (i % 10), UNIT_SIZE * Math.floor(i / 10), UNIT_SIZE, UNIT_SIZE);
            ctx.fillStyle = "#228b22";
            ctx.fill();
            ctx.closePath();
        }
    }
}

mapForm();
setInterval(draw, 500);