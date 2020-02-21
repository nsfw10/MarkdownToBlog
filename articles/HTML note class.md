# 笔记

<!-- TOC -->

- [笔记](#笔记)
  - [VS Code 使用技巧](#vs-code-使用技巧)
  - [HTML 快捷键](#html-快捷键)
  - [HTML 标签](#html-标签)
    - [文本标签](#文本标签)
    - [图片标签与属性](#图片标签与属性)
    - [引入文件的地址路径](#引入文件的地址路径)
    - [跳转链接](#跳转链接)
    - [跳转锚点](#跳转锚点)
    - [特殊符号](#特殊符号)
    - [列表](#列表)
      - [无序列表](#无序列表)
      - [有序列表](#有序列表)
      - [定义列表](#定义列表)
      - [嵌套列表](#嵌套列表)
    - [表格标签](#表格标签)
    - [表单标签](#表单标签)

<!-- /TOC -->

## VS Code 使用技巧

- Alt + 方向键：位移所选行
- Shift + 方向键/Home/End：光标选择
- Alt + 右键多处：多光标操作
- Shift + Tab：前退格

## HTML 快捷键

- ！+ tab：快速搭建基础代码
- 标签名称 + tab：快速建立闭合标签
- li\*n + tab：快速建立 n 个列表项目
- ctrl + /：快速注释/取消注释
- shift + alt + A：快速注释/取消注释

## HTML 标签

- [HTML5 标签含义之元素周期表](http://www.html5star.com/manual/html5label-meaning/)

### 文本标签

1. 标题
   - `<h1>...</h1> ... <h6>...</h6>`
   - 其中 h1 只出现一次，h5、h6 一般不用。
2. 段落
   - `<p>...</p>`
3. 强调
   - `<em>...</em>` 展示为斜体
   - `<strong>...</strong>` 展示为加粗
   - 注意到 strong 强调性更强
4. 上标与下标
   - `<sup>...</sup>`
   - `<sub>...</sub>`
5. 删除文本与添加文本
   - `<del>...</del>`
   - `<ins>...</ins>`

### 图片标签与属性

图片标签：`<img>`

图片属性：`<img src="xxx" alt="xxx"...>`

1. src，图片源地址
2. alt，仅当图片出现问题时的替代文本
3. title，鼠标浮窗提示信息
4. width & height，图片宽高，单位是像素
   - _指定初始宽高可以避免图片撕裂段落！_

### 引入文件的地址路径

- 相对路径
  - `./img/sample.jpg` 同级 img 文件夹中的 sample.jpg
  - `../img/sample.jpg` 父级 img 文件夹中的 sample.jpg
- 绝对路径
  - `E:/database/img/sample.jpg` 本机文件
  - `https://www.pixiv.com/s/114514.jpg` URL 写法

### 跳转链接

标签：`<a>...</a>`

1. href，链接地址
2. target，链接打开的方式
   - `_self` 在当前页面打开
   - `_blank` 新窗口打开

定义非绝对的链接地址所相对的默认 URL：`<base>`

写在`<head>`中，规定链接那两个属性的默认值，比如：`<base target="_blank">`即规定了链接默认在新页面中打开。

### 跳转锚点

标签：`<a>...</a>`

实现：

```html
<a href="#place">跳转起始点</a>
<!--用#号接被跳转位置的id，id在被跳转位置中标记出来-->
<h2 id="place">目标跳转段落</h2>
```

或者：

```html
<a href="#place">跳转起始点</a>
<!--用#号接被跳转位置的name，name在被跳转位置的前一行用新的<a>标记出来，中间不带任何东西-->
<a name="place"></a>
<h2>目标跳转段落</h2>
```

### 特殊符号

| 特殊字符 | 含义     | 代码           |
| -------- | -------- | -------------- |
| &emsp;   | 空格     | `&emsp; &nbsp` |
| &copy;   | 版权     | `&copy;`       |
| &reg;    | 注册商标 | `&reg;`        |
| <        | 小于号   | `&lt;`         |
| >        | 大于号   | `&gt;`         |
| &        | 和号     | `&amp;`        |
| ￥       | 人民币   | `&yen;`        |
| °        | 度       | `&deg;`        |

### 列表

#### 无序列表

```html
<ul>
  <!--unordered list-->
  <li>list item1</li>
  <li>list item2</li>
  <li>list item3</li>
</ul>
<!--在<ul><li>之间不能插入其他标签-->
```

type 属性：控制标记样式

- disc 默认实心圆
- circle 空心圆
- square 实心方块
- etc.

#### 有序列表

```html
<ol>
  <!--ordered list用的比较少-->
  <li>list item1</li>
  <li>list item2</li>
  <li>list item3</li>
</ol>
<!--在<ul><li>之间不能插入其他标签-->
```

type 属性：控制标记样式

- 1 默认
- a/A
- i/I

#### 定义列表

```html
<dl>
  <!--defination list-->
  <dt>被定义文本1</dt>
  <!--定义专业术语或者名词-->
  <dd>定义1</dd>
  <!--对名词进行解释和描述-->
  <dt>被定义文本1</dt>
  <dd>定义1</dd>
</dl>
```

#### 嵌套列表

```html
<!--神仙快捷键：ul>li*2>ol>li*2-->
<ul>
  <li>
    A
    <ol>
      <li>1</li>
      <li>2</li>
    </ol>
  </li>
  <li>
    B
    <ol>
      <li>1</li>
      <li>2</li>
    </ol>
  </li>
</ul>
```

### 表格标签

| 含义           | 标签                  |
| -------------- | --------------------- |
| 表格最外层容器 | `<table></table>`     |
| 定义表格行     | `<tr></tr>`           |
| 定义表头       | `<th></th>`           |
| 定义表格单元   | `<td></td>`           |
| 定义表格标题   | `<caption></caption>` |

应用：

```html
<table>
  <caption>
    表格标题
  </caption>
  <tr>
    <th>表头一</th>
    <th>表头二</th>
  </tr>
  <tr>
    <td>单元一</td>
    <td>单元二</td>
  </tr>
</table>
```

另外三个语义化**双标签**:
`<tHead> <tBody> <tFoot>`
用来标记表格各个部分，在不标记的情况下可能会导致属性支配失效。

| 表格属性    | 含义             | 位置       | 值                | 单位               |
| ----------- | ---------------- | ---------- | ----------------- | ------------------ |
| border      | 表格边框         | `<table>`  | 数值              | 像素               |
| cellpadding | 单元格内的空间   | `<table>`  | 数值              | 像素               |
| cellspacing | 单元格之间的空间 | `<table>`  | 数值              | 像素               |
| rowspan     | 合并行           | `<th>`     | 数值              | 表头支配的列数     |
| colspan     | 合并列           | `<td>`     | 数值              | 该单元格所占的行数 |
| align       | 左右对齐方式     | 任何位置？ | left/center/right | 左/中/右           |
| valign      | 上下对齐方式     | 任何位置？ | top/middle/bottom | 上/中/下           |

### 表单标签

表单的最外层容器：`<form></form>`

action：数据提交位置

用于搜集用户信息：`<input>`

| type 属性   | 含义               |
| ----------- | ------------------ |
| text        | 文本输入框（普通） |
| password    | 密码输入框         |
| checkbox    | 多选输入框         |
| checked     | 预选               |
| radio       | 单选输入框         |
| file        | 上传文件           |
| submit      | 提交按钮           |
| reset       | 重置按钮           |
| disabled    | 禁用               |
| placeholder | 预显示文字         |

```html
<form>
  <input type="checkbox" checked disabled />教务处
  <input type="checkbox" />图书馆 <input type="checkbox" />餐厅
  <p>输入用户名</p>
  <input type="text" placeholder="社蕙人" />
  <p>输入密码</p>
  <input type="password" />
  <p>登录方式</p>
  <input type="radio" name="gender" />男 <input type="radio" name="gender" />女
  <!--如果不给radio赋name，则其与checkbox无异，都可以多选-->
</form>
```

多行文本框：`<textarea></textarea>`

cols/rows：列/行

下拉菜单：

`<select></select>`

- size 展示列数
- multiple 多选

`<option></option>`

- selected 默认
- disabled 不可选

```html
<form action="https://www.baidu.com">
  <textarea cols="10" rows="10"></textarea>
  <select>
    <option selected disabled>请选择</option>
    <!--默认“请选择”且不能再被选-->
    <option>隐私</option>
    <option>公开</option>
  </select>
  <p><input type="submit" /><input type="reset" /></p>
</form>
```

辅助表单：`<label>`

```html
<form>
  <p>登录方式</p>
  <input type="radio" name="gender" id="man"/><label for="man">男</lable>
  <input type="radio" name="gender" id="woman"/><label for="woman">女</lable>
  <!--这样一来，点击label中的文本，则会映射到input中的行为-->
</form>
```

两者嵌套时，应当：

```html
<form>
  <table>
    ...
  </table>
</form>
```
