"use strict";

//抄来的js引入函数
function loadScript(src, callback) {
  var script = document.createElement("script"),
    // head = document.getElementsByTagName('head')[0];
    head = document.querySelector("head");
  script.type = "text/javascript";
  script.charset = "UTF-8";
  script.src = src;
  if (script.addEventListener) {
    script.addEventListener(
      "load",
      function () {
        callback();
      },
      false
    );
  } else if (script.attachEvent) {
    script.attachEvent("onreadystatechange", function () {
      var target = window.event.srcElement;
      if (target.readyState == "loaded") {
        callback();
      }
    });
  }
  head.appendChild(script);
}

//载入showdown
loadScript(
  "https://cdn.jsdelivr.net/npm/showdown@1.9.1/dist/showdown.min.js",
  function () {
    console.log("showdown succeed");
    // hljs.initHighlightingOnLoad();
    setShowdown();
    setUpEnv();
    readMD();
  }
);

//配置showdown
function setShowdown() {
  showdown.setOption("headerLevelStart", 2);
  showdown.setOption("tables", true);
  showdown.setOption("ghCompatibleHeaderId", true); //保证TOC跳转正确性
  showdown.setOption("customizedHeaderId", true);
}

function setUpEnv() {
  //改变标题
  let title = decodeURIComponent(window.location.search.slice(1));
  document.querySelector("title").innerText = title;
}

function readMD() {
  let MDtitle = document.querySelector("title").innerText + ".md";
  let xhr = new XMLHttpRequest(); //建立对象
  xhr.open("get", MDtitle, true); //打开文档
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      analyseText(xhr.responseText, function () {
        loadScript("/commonConfigs/prism.js", function () {
          console.log("prism succeed");
        })
      }
      );
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

function analyseText(inputText, callback) {
  let tempSave = inputText;
  let firstTitle;
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
  } else {
    TOCIndex = firstTitleIndex;
  }
  //暂时把目录吃掉了
  let mainText = tempSave.slice(TOCIndex + 2);
  writeHTML(mainText, "paper", "article");
  callback();
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
  } else {
    textParent.innerHTML = textOutput;
  }
}
