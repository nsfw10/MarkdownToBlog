let headerF = function() {
  const headerT = `
    <div id="logo" class="l">
    <h1 class="l"><a href="./index.html">@社蕙主义</a></h1>
    <p class="l">Megumism<br>春社野蕙，生生不息</p>
    </div>
    <ul class="nav r">
    <li><a href="/articles/articles.html">文章</a></li>
    <li><a href="/designs/designs.html">设计</a></li>
    <li><a href="/resources/resources.html">资源</a></li>
    <li><a href="/collections/collections.html">收藏</a></li>
    </ul>
    `;
  let header = document.querySelector("header");
  header.className = "container clear";
  header.innerHTML = headerT;
};

let footerF = function() {
  const footerT = `
    <div id="links" class="clear">
    <h2>———友情链接———</h2>
        <ul class="clear">
            <li>
                <a href="https://www.jonbgua.com/" target="_blank">酱瓜的博客</a>
            </li>
            <li>
                <a href="https://www.sufeqs.com/" target="_blank">曲水流觞的博客</a>
            </li>
            <li>
                <a href="http://www.neptuuz.com/wordpress/" target="_blank">Seaform的博客</a>
            </li>
        </ul>
    </div>
    <p>由社蕙设计 Copyright © 2020 Non-sense 图片素材均取自@NoriZC</p>
`;

  let footer = document.querySelector("footer");
  footer.className = "container clear";
  footer.innerHTML = footerT;
};

headerF();
footerF();
