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
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            analyseLog(xhr.responseText);
        } else if (xhr.status == 404) {
            console.log(xhr.status);
        }
    };
}

let columnTemplate = (filename, title, author, timeInclude, introduction, labels) => `
<a href="/articleDisplay.html?${filename}">
    <h3>${title}</h3>
</a>
<ul id="info" class="clear">
    <ul id="labels" class="clear">
        ${labels}
    </ul>
<li id="author">${author}<li>
<li id="timeInclude">${timeInclude}<li>
<li id="introduction">${introduction}</li>
</ul>
`;

function analyseLog(textInput) {
    let h2IndexStart =
        textInput.match("## " + document.querySelector("title").innerText).index +
        ("## " + document.querySelector("title").innerText + "\n\n").length;
    let h2IndexEnd =
        textInput.slice(h2IndexStart).match(/^##[^#]|[^#]##[^#]/).index +
        h2IndexStart;
    if (h2IndexStart != h2IndexEnd) {//目录中有文章
        let h2Content = textInput.slice(h2IndexStart, h2IndexEnd); //取得##栏目中的所有内容
        let h3 = h2Content.match(/###.*\n/g);
        let h3Index = h3.map(temp => h2Content.match(temp).index); //取得了##标题的位置(.map属实牛啤)
        let h3Content = [];
        for (let i = 0; i < h3.length; i++) {
            if (i == h3.length) {
                h3Content[i] = h2Content.slice(h3Index[i]);
            } else {
                h3Content[i] = h2Content.slice(h3Index[i], h3Index[i + 1]);
            }
            //标题去MD化
            h3[i] = h3[i].replace("### ", "");
            //标题去掉Code Prettier在中英文间加上的空格
            h3[i] = h3[i].replace(
                /(?<=[\u4e00-\u9fa5]) (?=[a-zA-Z])|(?<=[a-zA-Z]) (?=[\u4e00-\u9fa5])/g,
                ""
            );
            //提取元信息
            let title = h3Content[i].match(/(?<=- 标题：).*(?=\n)/);
            let author = h3Content[i].match(/(?<=- 作者：).*(?=\n)/);
            let time = h3Content[i].match(/(?<=- 时间：).*(?=\n)/);
            let introduction = h3Content[i].match(/(?<=- 简介：).*(?=\n)/);
            //切割标签
            let labels = h3Content[i].match(/(?<=- 标签：).*(?=\n)/);
            labels = String(labels).split("、");
            for (let i = 0; i < labels.length; i++) {
                labels[i] = "<li>" + labels[i] + "</li>\n";
            }

            let column = document.createElement("li");
            column.innerHTML = columnTemplate(
                h3[i],
                title,
                author,
                time,
                introduction,
                labels
            );
            let columns = document.getElementById("columns");
            columns.appendChild(column);
        }
    } else {//目录中无文章
        let column = document.createElement("li");
        column.innerHTML = "<li id=\"introduction\">站主暂时没有打理这个栏目呢，请去别的栏目逛逛吧</li>";
        let columns = document.getElementById("columns");
        columns.appendChild(column);
    }
}
