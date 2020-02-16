const UNIT_SIZE = 30;
//初始化画布
let canvas = document.getElementById("playground");
canvas.height = 20 * UNIT_SIZE;
canvas.width = 10 * UNIT_SIZE;
let ctx = canvas.getContext("2d");
//初始化地图与显示
let display = [], map = [];
for (let i = 0; i < 240; i++) {
    map[i] = -1;
}
for (let i = 0; i < 200; i++) {
    display[i] = -1;
}

let sect = document.querySelector("section");
let para = document.createElement('p');
sect.appendChild(para);

//键盘监听
//document.addEventListener("keydown",keyDown,false);
//document.addEventListener("keyup",keyUp,false);
document.addEventListener("keypress", Op, false);
let lastOpTime = new Date();
function Op(e) {
    lastOpTime = new Date();
    if (e.key == "a" || e.key == "A")
        blockNow.prlmove("l");
    if (e.key == "d" || e.key == "D")
        blockNow.prlmove("r");
    // if(e.key == "w"||e.key =="W"){
    //     posY-=30;
    // }
    if (e.key == "s" || e.key == "S")
        blockNow.fall();
    para.textContent = "KeyboardInputLog:  " + e.key;
}

function Block() {
    this.kind = "Z"
    this.spin = 1;//旋转了一次
    this.occup = [[1, 4], [2, 4], [2, 5], [3, 5]]//行，列
    this.settled = false;
};
let blockNow = new Block();

Block.form = function(){
    this.kind = "Z"
    this.spin = 1;//旋转了一次
    this.occup = [[1, 4], [2, 4], [2, 5], [3, 5]]//行，列
    this.settled = false;
}

Block.prototype.settleCheck = function () {
    checkTime = new Date();
    console.log(checkTime - lastOpTime);
    if (checkTime - lastOpTime >= 300) {
        for (let i = 0; i < 4 && !blockNow.settled; i++) {
            if (this.occup[i][0] >= 23) blockNow.settled = true;
        }
    }
    if(this.settled)
        blockNow = new Block();
}

Block.prototype.fall = function () {
    //console.log(this.occup);
    let opLegal = true;
    for (let i = 0; i < 4 && !blockNow.settled && opLegal; i++) {
        if (this.occup[i][0] >= 23) opLegal = false;
    }
    for (let i = 0; i < 4 && !blockNow.settled && opLegal; i++) {
        this.occup[i][0]++;
    }
    this.settleCheck();
}

Block.prototype.prlmove = function (direction) {
    let opLegal = true;
    if (direction == "l") {
        for (let i = 0; i < 4 && !blockNow.settled; i++)
            if ((blockNow.occup[i][1] - 1) < 0) opLegal = false;
        for (let i = 0; i < 4 && !blockNow.settled && opLegal; i++)
            blockNow.occup[i][1]--;
    }
    else if (direction == "r") {
        for (let i = 0; i < 4 && !blockNow.settled; i++)
            if ((blockNow.occup[i][1] + 1) > 9) opLegal = false;
        for (let i = 0; i < 4 && !blockNow.settled && opLegal; i++)
            blockNow.occup[i][1]++;
    }
}

function mapForm() {
    for (let i = 0; i < 200; i++) {
        display[i] = -1;
    }
    for (let i = 0; i < blockNow.occup.length; i++) {
        display[(blockNow.occup[i][0] - 4) * 10 + blockNow.occup[i][1]] = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);//刷新画布
    mapForm();
    for (let i = 0; i < display.length; i++) {
        //console.log("hello");
        if (display[i] == 0) {
            ctx.beginPath();
            ctx.rect(UNIT_SIZE * (i % 10), UNIT_SIZE * Math.floor(i / 10), UNIT_SIZE, UNIT_SIZE);
            ctx.fillStyle = "#228b22";
            ctx.fill();
            ctx.closePath();
        }
    }
    window.requestAnimationFrame(draw);
}

setInterval("blockNow.fall()", 1000);
draw();