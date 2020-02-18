//配置showdown
showdown.setOption("headerLevelStart", 2);
showdown.setOption("tables", true);
showdown.setOption("ghCompatibleHeaderId", true);//保证TOC跳转正确性
showdown.setOption("customizedHeaderId", true);

let MDtitle = document.querySelector("title").innerText + ".md";
// console.log(MDtitle);

function readMD() {
    let xhr = new XMLHttpRequest();//建立对象
    xhr.open("get", MDtitle , true);//打开文档
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            text = xhr.responseText;
            analyseText(text);
            // writeHTML(text,"article");
            // let converter = new showdown.Converter();
            // html = converter.makeHtml(text);
            // document.getElementById("article").innerHTML = html;
            // return text;
        } else if (xhr.status == 404) {
            console.log(xhr.status);
        }
    };
}

function analyseText(inputText) {
    let tempSave = inputText;

    let firstTitleIndex;
    let TOCIndex;
    if (tempSave.match("\n") != null) {
        firstTitleIndex = tempSave.match("\n").index;
        firstTitle = tempSave.slice(0, firstTitleIndex);
        console.log(firstTitle);
        writeHTML(firstTitle, "paper");
    }
    if (tempSave.match("<!-- TOC -->") != null) {
        TOCIndex = tempSave.match("<!-- /TOC -->").index + 12;
    }
    else {
        TOCIndex = firstTitleIndex;
    }
    let mainText = tempSave.slice(TOCIndex + 2);
    writeHTML(mainText, "paper", "article");
}

function writeHTML(textInput, idOfParent, idOfDivCreated = "") {
    let converter = new showdown.Converter();
    let textParent = document.getElementById(idOfParent);
    let textOutput = converter.makeHtml(textInput);
    if (idOfDivCreated.length > 0) {
        let textBox = document.createElement("div");
        textBox.id = idOfDivCreated;
        textParent.appendChild(textBox);
        textBox.innerHTML = textOutput;
    }
    else {
        textParent.innerHTML = textOutput;
    }
}

// let temp = "hello"
// console.log(temp.match("H"));

readMD();
