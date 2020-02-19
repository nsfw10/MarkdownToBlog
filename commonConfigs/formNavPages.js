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
      function() {
        callback();
      },
      false
    );
  } else if (script.attachEvent) {
    script.attachEvent("onreadystatechange", function() {
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
  function() {
    console.log("succeed");
    setShowdown();
    setUpEnv();
    readLog();
  }
);

//配置showdown
function setShowdown() {
  //   showdown.setOption("headerLevelStart", 2);
  showdown.setOption("tables", true);
  showdown.setOption("ghCompatibleHeaderId", true); //保证TOC跳转正确性
  showdown.setOption("customizedHeaderId", true);
}

function setUpEnv() {
  //改变标题
  let title = decodeURIComponent(window.location.search.slice(1));
  document.querySelector("title").innerText = title;
  document.querySelector("h2").innerText = title;
}

function readLog() {
  let xhr = new XMLHttpRequest(); //建立对象
  xhr.open("get", "/articles/articlesLog.md", true); //打开文档
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      analyseLog(xhr.responseText);
    } else if (xhr.status == 404) {
      console.log(xhr.status);
    }
  };
}

function analyseLog(textInput) {
  let tempsave = textInput;
  let columnIndexStart = tempsave.match("## " + document.querySelector("title").innerText
  ).index + ("## " + document.querySelector("title").innerText +"\n\n"
  ).length;
  let columnIndexEnd = tempsave.slice(columnIndexStart).match(/[^#]##[^#]/).index + columnIndexStart;
  let column = tempsave.slice(columnIndexStart,columnIndexEnd);//取得##栏目中的所有内容
  let articleIndex = column.match(/###/g);
  for(let i=0;i<articleIndex.length;i++){
      let article;
      if(i==articleIndex.length){
          article=column.slice(articleIndex[i]);
      }
      else{
          article=column.slice(articleIndex[i],articleIndex[i+1]);
      }
      console.log(article);
  }
}
