const UNIT_SIZE = 30;
//初始化画布
let canvas = document.getElementById("playground");
canvas.height = 20 * UNIT_SIZE;
canvas.width = 10 * UNIT_SIZE;
let ctx = canvas.getContext("2d");

let sect = document.querySelector("section");
let para = document.createElement('p');
sect.appendChild(para);

function random(bottom, top) {
    return bottom + Math.floor(Math.random() * (top - bottom));//不含top;
}

let oping = false;
let fastFall = false;
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
    if (e.key == "Shift") {
        oping = false;
        fastFall = true;//强行进入检查
        while (!blockNow.settled) {
            blockNow.fall();
            console.log(blockNow.settled);
        }
        blockNow = new Block();
    }
    if (e.key == "z" || e.key == "Z")
        blockNow.spin("z");
    if (e.key == "x" || e.key == "X")
        blockNow.spin("x");
    para.textContent = "KeyboardInputLog:  " + e.key;
}
document.addEventListener("keyup", keyUp, false);
function keyUp(e) {
    lastOpTime = new Date();
    oping = false;
    fastFall = false;
}
//document.addEventListener("keypress", Op, false);

function Map() {
    this.record = [];
    for (let i = 0; i < 240; i++) {
        this.record[i] = -1;
    }
    for(let i=240; i<250;i++){
        this.record[i] = 1;
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
        full = true;
    }
}

let display = []
map = new Map();

const blockMetaData = [//坐标第二列是旋转中心
    ["O", [2, 4], [2, 5], [3, 4], [3, 5]],
    ["I", [0, 4], [1, 4], [2, 4], [3, 4]],
    ["J", [1, 4], [2, 4], [3, 4], [3, 3]],
    ["L", [1, 4], [2, 4], [3, 4], [3, 5]],
    ["Z", [1, 4], [2, 4], [2, 5], [3, 5]],
    ["S", [1, 5], [2, 5], [2, 4], [3, 4]],
    ["T", [2, 4], [3, 4], [3, 3], [3, 5]]
]

function Block() {
    let blockPos = random(0, 7);
    this.kind = blockMetaData[blockPos][0];
    this.spin = 1;//旋转了一次
    this.occup = [
        [blockMetaData[blockPos][1][0], blockMetaData[blockPos][1][1]],
        [blockMetaData[blockPos][2][0], blockMetaData[blockPos][2][1]],
        [blockMetaData[blockPos][3][0], blockMetaData[blockPos][3][1]],
        [blockMetaData[blockPos][4][0], blockMetaData[blockPos][4][1]]
    ];//行，列
    this.settled = false;
};
let blockNow = new Block();

Block.prototype.settleCheck = function () {
    checkTime = new Date();
    //console.log(checkTime - lastOpTime);
    if (fastFall || (checkTime - lastOpTime >= 300 && oping == false)) {
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled; i++) {
            //if (this.occup[i][0] >= 23) blockNow.settled = true;
            if (map.record[(this.occup[i][0] + 1) * 10 + this.occup[i][1]] >= 1) blockNow.settled = true;
        }
    }
    if (this.settled) {
        for (let i = 0; i < blockNow.occup.length; i++) {
            map.record[blockNow.occup[i][0] * 10 + blockNow.occup[i][1]] = 1;
        }
        map.erase();
        if (!fastFall) {
            blockNow = new Block();
            console.log(blockNow);
        }//防止陷入死循环
    }
}

Block.prototype.fall = function () {
    //console.log(this.occup[1]);
    let opLegal = true;
    for (let i = 0; i < 4 && !blockNow.settled && opLegal; i++) {
        //if (this.occup[i][0] >= 23) opLegal = false;
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

const spinTest3 = [
    [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],//0-R
    [[0,0],[1,0],[1,-1],[0,2],[1,2]],//R-2
    [[0,0],[1,0],[1,1],[0,-2],[1,-2]],//2-L
    [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]]//L-0
]

Block.prototype.spin = function (direction) {
    //let opLegal = true;
    switch (blockNow.kind) {
        case "O":
            break;
        case "L":
            if (direction == "z") {
            }
            else if (direction == "x") {
            }
            break;
        default:
            if (direction == "z") {
            }
            else if (direction == "x") {
            }
            break;
    }
}

function mapForm() {
    for (let i = 0; i < 200; i++) {
        display[i] = map.record[i+40];
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
            ctx.fillStyle = "#166e22";
            ctx.fill();
            ctx.closePath();
        }
    }
    window.requestAnimationFrame(draw);
}

setInterval("blockNow.fall()", 1000);
draw();