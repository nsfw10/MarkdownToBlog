const UNIT_SIZE = 30;
//初始化画布
let canvas = document.getElementById("playground");
canvas.height = 20 * UNIT_SIZE;
canvas.width = 10 * UNIT_SIZE;
let ctx = canvas.getContext("2d");

let sect = document.querySelector("section");
let para = document.createElement('p');
sect.appendChild(para);
//随机整数生成
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
    if (e.key == "a" || e.key == "A" || e.key == "Num4" || e.key == "ArrowLeft")
        blockNow.prlmove("l");
    if (e.key == "d" || e.key == "D" || e.key == "Num6" || e.key == "ArrowRight")
        blockNow.prlmove("r");
    if (e.key == "s" || e.key == "S")
        blockNow.fall();
    if (e.key == "Shift") {
        oping = false;
        fastFall = true;//强行进入检查
        while (!blockNow.settled) {
            blockNow.fall();
        }
        blockNow = new Block();
    }
    if (e.key == "z" || e.key == "Z")
        blockNow.spinL();
    if (e.key == "x" || e.key == "X")
        blockNow.spinR();
    para.textContent = "KeyboardInputLog:  " + e.key;
}
document.addEventListener("keyup", keyUp, false);
function keyUp(e) {
    lastOpTime = new Date();
    oping = false;
    fastFall = false;
}
//document.addEventListener("keypress", Op, false);

//地图对象
function Map() {
    this.record = new Array;
    //i行j列
    for (let i = 0; i < 25; i++) {
        this.record[i] = new Array;
        for (let j = 0; j < 12; j++) {
            if (i == 24) this.record[i][j] = 0;
            else if (j == 0 || j == 11)
                this.record[i][j] = 0;//边框
            else this.record[i][j] = -1;//背景
        }
    }
}
map = new Map();
//地图消除
Map.prototype.erase = function () {
    let full = true;
    for (let i = 23; i >= 0; i--) {
        for (let j = 1; j <= 10; j++)
            if (map.record[i][j] == -1) full = false;
        if (full) {//开始消除
            for (let j = 1; j <= 10; j++) {
                map.record[i][j] = -1;
                for (let ix = i; ix > 0; ix--) {
                    let temp = map.record[ix][j];
                    map.record[ix][j] = map.record[(ix - 1)][j];
                    map.record[(ix - 1)][j] = temp;
                }
            }
            i++;
        }
        full = true;
    }
}

let display = [];

const blockMetaData = [//坐标第二列是旋转中心
    ["O", [2, 4], [2, 5], [3, 4], [3, 5]],
    ["I", [3, 4], [3, 5], [3, 6], [3, 7]],
    ["J", [3, 4], [3, 5], [3, 6], [2, 4]],
    ["L", [3, 4], [3, 5], [3, 6], [2, 6]],
    ["Z", [3, 6], [3, 5], [2, 5], [2, 4]],
    ["S", [3, 4], [3, 5], [2, 5], [2, 6]],
    ["T", [3, 4], [3, 5], [3, 6], [2, 5]]
];
//方块对象
function Block() {
    let blockPos = random(0, 7);
    this.kind = blockMetaData[blockPos][0];
    this.pos = 0;//姿态映射：0-0 1-R 2-2 3-L
    this.occup = [
        [blockMetaData[blockPos][1][0], blockMetaData[blockPos][1][1]],
        [blockMetaData[blockPos][2][0], blockMetaData[blockPos][2][1]],
        [blockMetaData[blockPos][3][0], blockMetaData[blockPos][3][1]],
        [blockMetaData[blockPos][4][0], blockMetaData[blockPos][4][1]]
    ];//行，列
    this.core;
    if (this.kind == "O") this.core = [0, 0];
    else if (this.kind == "I") this.core = [3.5, 5.5];
    else this.core = [blockMetaData[blockPos][2][0], blockMetaData[blockPos][2][1]];

    this.settled = false;

    let spined = [];
    for (let i = 0; i < this.occup.length; i++) {
        spined[i] = [this.occup[i][0] - this.core[0], this.occup[i][1] - this.core[1]];//读取相对坐标
    }
    console.log(this.kind);
    console.log(this.core);
};
let blockNow = new Block();
//方块是否到位
Block.prototype.settleCheck = function () {
    checkTime = new Date();
    if (fastFall || (checkTime - lastOpTime >= 300 && oping == false)) {
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled; i++) {
            //if (this.occup[i][0] >= 23) blockNow.settled = true;
            if (map.record[this.occup[i][0] + 1][this.occup[i][1]] >= 0) blockNow.settled = true;
        }
    }
    if (this.settled) {
        for (let i = 0; i < blockNow.occup.length; i++) {
            map.record[blockNow.occup[i][0]][blockNow.occup[i][1]] = 1;
        }
        map.erase();
        if (!fastFall) {
            blockNow = new Block();
        }//防止陷入死循环
    }
}
//方块下落
Block.prototype.fall = function () {
    //console.log(this.occup[1]);
    // console.log(this.occup);
    let opLegal = true;
    for (let i = 0; i < 4 && !blockNow.settled && opLegal; i++) {
        if (map.record[this.occup[i][0] + 1][this.occup[i][1]] >= 0) opLegal = false;
    }
    for (let i = 0; i < 4 && !blockNow.settled && opLegal; i++) {
        this.occup[i][0]++;
    }
    if (!blockNow.settled && opLegal) {
        this.core[0]++;
    }
    this.settleCheck();
}
//方块平移
Block.prototype.prlmove = function (direction) {
    let opLegal = true;
    if (direction == "l") {
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled; i++) {
            // if ((blockNow.occup[i][1] - 1) < 0) opLegal = false;
            if (map.record[blockNow.occup[i][0]][blockNow.occup[i][1] - 1] >= 0) opLegal = false;
        }
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled && opLegal; i++)
            blockNow.occup[i][1]--;
        if (!blockNow.settled && opLegal) {
            this.core[1]--;
        }
    }
    else if (direction == "r") {
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled; i++) {
            //if ((blockNow.occup[i][1] + 1) > 9) opLegal = false;
            if (map.record[blockNow.occup[i][0]][(blockNow.occup[i][1] + 1)] >= 0) opLegal = false;
        }
        for (let i = 0; i < blockNow.occup.length && !blockNow.settled && opLegal; i++)
            blockNow.occup[i][1]++;
        if (!blockNow.settled && opLegal) {
            this.core[1]++;
        }
    }
}

//SRS表
const spinTest3 = [
    [[0, 0], [0, -1], [1, -1], [-2, 0], [-2, -1]],//0-R
    [[0, 0], [0, 1], [-1, 1], [2, 0], [2, 1]],//R-2
    [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]],//2-L
    [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]]//L-0
];
const spinTest4 = [
    [[0, 0], [0, -2], [0, 1], [-1, -2], [2, 1]],
    [[0, 0], [0, -1], [0, 2], [2, -1], [-1, 2]],
    [[0, 0], [0, 2], [0, -1], [1, 2], [-2, -1]],
    [[0, 0], [0, 1], [0, -2], [-2, 1], [1, -2]],
];
const spinTest = [spinTest3,spinTest4];

//不变中心旋转
Block.prototype.spin3 = function (temp, repeat = 1) {
    for (repeat; repeat > 0; repeat--) {
        for (let i = 0; i < this.occup.length; i++) {
            if (temp[i][0] + temp[i][1] == 2 || temp[i][0] + temp[i][1] == -2) {//左上&右下角旋
                temp[i][1] = -temp[i][1];
            }
            else if (temp[i][0] + temp[i][1] == 0) {//右上&左下角旋
                temp[i][0] = -temp[i][0];
            }
            else {//边的打表旋转
                if (temp[i][0] == -1 && temp[i][1] == 0) {
                    temp[i][0] = 0; temp[i][1] = 1;
                }
                else if (temp[i][0] == 0 && temp[i][1] == 1) {
                    temp[i][0] = 1; temp[i][1] = 0;
                }
                else if (temp[i][0] == 1 && temp[i][1] == 0) {
                    temp[i][0] = 0; temp[i][1] = -1;
                }
                else if (temp[i][0] == 0 && temp[i][1] == -1) {
                    temp[i][0] = -1; temp[i][1] = 0;
                }
            }
        }
    }
}

Block.prototype.spin4 = function (spined, repeat = 1) {
    console.log(spined[0][0], spined[0][1], "||",spined[1][0], spined[1][1], "||",spined[2][0], spined[2][1], "||",spined[3][0], spined[3][1]);
    for (repeat; repeat > 0; repeat--) {
        let temp = [spined[1][0], spined[1][1]];
        spined[1][0] = spined[2][0];
        spined[1][1] = spined[2][1];
        spined[2][0] = -temp[0];
        spined[2][1] = -temp[1];
        const trace0 = [-1.5, 0.5, 1.5, -0.5];
        const trace3 = [0.5, -1.5, -0.5, 1.5];
        for (let i = 0; i < 4; i++) {
            if (spined[0][0] == trace0[i]) {
                spined[0][0] = trace0[(i + 1) % 4];
                break;
            }
        }
        for (let i = 0; i < 4; i++) {
            if (spined[0][1] == trace0[i]) {
                spined[0][1] = trace0[(i + 1) % 4];
                break;
            }
        }
        for (let i = 0; i < 4; i++) {
            if (spined[3][0] == trace3[i]) {
                spined[3][0] = trace3[(i + 1) % 4];
                break;
            }
        }
        for (let i = 0; i < 4; i++) {
            if (spined[3][1] == trace3[i]) {
                spined[3][1] = trace3[(i + 1) % 4];
                break;
            }
        }
    }
    console.log(spined[0][0], spined[0][1], "||",spined[1][0], spined[1][1], "||",spined[2][0], spined[2][1], "||",spined[3][0], spined[3][1]);
}

//踢墙旋转
Block.prototype.spinR = function () {
    let testTimes = 0;
    let opLegal = true;
    let spined = [];
    let type;
    for (let i = 0; i < this.occup.length; i++) {
        spined[i] = [this.occup[i][0] - this.core[0], this.occup[i][1] - this.core[1]];//读取相对坐标
    }
    switch (this.kind) {
        case "O":
            break;
        case "I":
            this.spin4(spined);
            type = 1;
            break;
        default://3*3类方块
            this.spin3(spined);
            type = 0;
            break;
    }
    while (testTimes < 5) {
        for (let i = 0; i < 4; i++) {
            if (map.record[this.core[0] + spined[i][0] + spinTest[type][this.pos][testTimes][0]][this.core[1] + spined[i][1] + spinTest[type][this.pos][testTimes][1]] >= 0)
                opLegal = false;
            //console.log(spined[0], spined[1], spined[2], spined[3]);
        }
        if (opLegal) {
            this.core[0] += spinTest[type][this.pos][testTimes][0];
            this.core[1] += spinTest[type][this.pos][testTimes][1];
            for (let i = 0; i < 4; i++) {
                this.occup[i][0] = this.core[0] + spined[i][0];
                this.occup[i][1] = this.core[1] + spined[i][1];
            }
            this.pos = (this.pos + 1) % 4;
            break;
        }
        testTimes++;
        opLegal = true;
    }
}

Block.prototype.spinL = function () {
    let testTimes = 0;
    let opLegal = true;
    let spined = [];
    let type;
    for (let i = 0; i < this.occup.length; i++) {
        spined[i] = [this.occup[i][0] - this.core[0], this.occup[i][1] - this.core[1]];//读取相对坐标
    }
    switch (this.kind) {
        case "O":
            break;
        case "I":
            this.spin4(spined, 3);
            type = 1;
            break;
        default://3*3类方块
            this.spin3(spined, 3);
            type = 0;
            break;
    }
    while (testTimes < 5) {
        for (let i = 0; i < 4; i++) {
            if (map.record[this.core[0] + spined[i][0] - spinTest[type][this.pos][testTimes][0]][this.core[1] + spined[i][1] - spinTest[type][this.pos][testTimes][1]] >= 0)
                opLegal = false;
        }
        if (opLegal) {
            this.core[0] -= spinTest[type][this.pos][testTimes][0];
            this.core[1] -= spinTest[type][this.pos][testTimes][1];
            for (let i = 0; i < 4; i++) {
                this.occup[i][0] = this.core[0] + spined[i][0];
                this.occup[i][1] = this.core[1] + spined[i][1];
            }
            this.pos = (this.pos + 1) % 4;
            break;
        }
        testTimes++;
        opLegal = true;
    }
}

function mapForm() {
    for (let i = 0; i < 200; i++) {
        display[i] = map.record[Math.floor((i + 40) / 10)][i % 10 + 1];
    }
    for (let i = 0; i < blockNow.occup.length; i++) {
        if (blockNow.occup[i][0] >= 4)
            display[(blockNow.occup[i][0] - 4) * 10 + blockNow.occup[i][1] - 1] = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);//刷新画布
    mapForm();
    for (let i = 0; i < display.length; i++) {
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