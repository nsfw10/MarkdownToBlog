const UNIT_SIZE = 30;
//初始化画布
let canvas = document.getElementById("playground");
canvas.height = 20 * UNIT_SIZE;
canvas.width = 10 * UNIT_SIZE;
let ctx = canvas.getContext("2d");

let sect = document.querySelector("section");
let para = document.createElement('p');
sect.appendChild(para);

let oping = false;
let lastOpTime = new Date();
//键盘监听
document.addEventListener("keydown", keyDown, false);
function keyDown(e) {
    oping = true;
    if (e.key == "a" || e.key == "A")
        blockNow.prlmove("l");
    if (e.key == "d" || e.key == "D")
        blockNow.prlmove("r");
    if (e.key == "s" || e.key == "S")
        blockNow.fall();
    para.textContent = "KeyboardInputLog:  " + e.key;
}
document.addEventListener("keyup", keyUp, false);
function keyUp(e) {
    lastOpTime = new Date();
    oping = false;
}
//document.addEventListener("keypress", Op, false);

function Map() {
    this.record = [];
    for (let i = 0; i < 240; i++) {
        this.record[i] = -1;
    }
}

Map.prototype.erase = function () {
    let full = true;
    for (let i = 23; i >= 0; i--) {
        for (let j = 0; j < 10; j++)
            if (map.record[i * 10 + j] == -1) full = false;
        if (full) {//开始消除
            for (let j = 0; j < 10; j++) {
                map.record[i * 10 + j] = -1;
                for (let ix = i; ix > 0; ix--) {
                    let temp = map.record[ix * 10 + j];
                    map.record[ix * 10 + j] = map.record[(ix - 1) * 10 + j];
                    map.record[(ix - 1) * 10 + j] = temp;
                }
            }
            i++;
        }
    }
}

let display = []
map = new Map();

function Block() {
    this.kind = "O"
    this.spin = 1;//旋转了一次
    this.occup = [[1, 4], [2, 4], [2, 5], [1, 5]]//行，列
    this.settled = false;
};
let blockNow = new Block();

Block.prototype.settleCheck = function () {
    checkTime = new Date();
    //console.log(checkTime - lastOpTime);
    if (checkTime - lastOpTime >= 300 && oping == false) {
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled; i++) {
            if (this.occup[i][0] >= 23) blockNow.settled = true;
            if (map.record[(this.occup[i][0] + 1) * 10 + this.occup[i][1]] >= 1) blockNow.settled = true;
        }
    }
    if (this.settled) {
        for (let i = 0; i < blockNow.occup.length; i++) {
            map.record[blockNow.occup[i][0] * 10 + blockNow.occup[i][1]] = 1;
        }
        map.erase();
        blockNow = new Block();
    }
}

Block.prototype.fall = function () {
    //console.log(this.occup);
    let opLegal = true;
    for (let i = 0; i < 4 && !blockNow.settled && opLegal; i++) {
        if (this.occup[i][0] >= 23) opLegal = false;
        if (map.record[(this.occup[i][0] + 1) * 10 + this.occup[i][1]] >= 1) opLegal = false;
    }
    for (let i = 0; i < 4 && !blockNow.settled && opLegal; i++) {
        this.occup[i][0]++;
    }
    this.settleCheck();
}

Block.prototype.prlmove = function (direction) {
    let opLegal = true;
    if (direction == "l") {
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled; i++) {
            if ((blockNow.occup[i][1] - 1) < 0) opLegal = false;
            if (map.record[blockNow.occup[i][0] * 10 + (blockNow.occup[i][1] - 1)] > 0) opLegal = false;
        }
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled && opLegal; i++)
            blockNow.occup[i][1]--;
    }
    else if (direction == "r") {
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled; i++) {
            if ((blockNow.occup[i][1] + 1) > 9) opLegal = false;
            if (map.record[blockNow.occup[i][0] * 10 + (blockNow.occup[i][1] + 1)] > 0) opLegal = false;
        }
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled && opLegal; i++)
            blockNow.occup[i][1]++;
    }
}

function mapForm() {
    for (let i = 40; i < map.record.length; i++) {
        display[i - 40] = map.record[i];
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
        else if (display[i] == 1) {
            ctx.beginPath();
            ctx.rect(UNIT_SIZE * (i % 10), UNIT_SIZE * Math.floor(i / 10), UNIT_SIZE, UNIT_SIZE);
            ctx.fillStyle = "#442f07";
            ctx.fill();
            ctx.closePath();
        }
    }
    window.requestAnimationFrame(draw);
}

setInterval("blockNow.fall()", 1000);
draw();