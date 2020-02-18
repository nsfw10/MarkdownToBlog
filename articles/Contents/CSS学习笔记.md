# 笔记

<!-- TOC -->

- [笔记](#笔记)
    - [CSS 添加方式](#css-添加方式)
    - [CSS 基础语法](#css-基础语法)
    - [CSS 颜色](#css-颜色)
        - [单词表示法](#单词表示法)
        - [十六进制表示法](#十六进制表示法)
        - [rgb 表示法](#rgb-表示法)
    - [CSS 背景样式](#css-背景样式)
        - [CSS 边框样式](#css-边框样式)
        - [CSS 文字样式](#css-文字样式)
        - [段落样式](#段落样式)
        - [容器](#容器)
    - [CSS 复合样式](#css-复合样式)
    - [CSS 选择器](#css-选择器)
        - [id 选择器](#id-选择器)
        - [class 选择器](#class-选择器)
        - [标签选择器](#标签选择器)
        - [群组选择器](#群组选择器)
        - [通配选择器](#通配选择器)
        - [层次选择器](#层次选择器)
        - [属性选择器](#属性选择器)
        - [伪类选择器](#伪类选择器)
    - [CSS 样式继承](#css-样式继承)
    - [CSS 优先级](#css-优先级)
    - [CSS 盒子模型](#css-盒子模型)
        - [盒子模型的问题](#盒子模型的问题)
    - [标签分类](#标签分类)
        - [按类型划分](#按类型划分)
        - [按内容分类](#按内容分类)
        - [按显示](#按显示)
    - [属性：显示框类型](#属性显示框类型)
    - [标签嵌套规范](#标签嵌套规范)
    - [overflow 溢出隐藏](#overflow-溢出隐藏)
    - [透明度与手势](#透明度与手势)
    - [宽高进阶](#宽高进阶)
    - [默认样式](#默认样式)
        - [CSS reset](#css-reset)
    - [float 与文档流](#float-与文档流)
        - [利用 clear 属性清除 float 浮动的影响](#利用-clear-属性清除-float-浮动的影响)
    - [position 定位](#position-定位)
    - [CSS Sprite](#css-sprite)

<!-- /TOC -->

## CSS 添加方式

1. 内联样式：
   利用`style`属性
2. 内部样式：
   在`<head></head>`中写`<style></style>`。
   可以复用代码。
3. 外部样式
   引入.css
   使用`<link rel="stylesheet" href="xxx.css">`标签

## CSS 基础语法

格式：  
选择器{属性 1:值 1;属性 2:值 2;}

单位：  
px、%

## CSS 颜色

### 单词表示法

透明：transparent
![CSS颜色名称](<img for notes/CSS 颜色名称.jpg>)

### 十六进制表示法

例如：`#000000,#fffff`

### rgb 表示法

例如：`rgb(0,0,0); rgb(255,255,255)`

## CSS 背景样式

| 属性                  | 含义               | 值                                 |
| --------------------- | ------------------ | ---------------------------------- |
| background-color      | 颜色               | 见上                               |
| background-image      | 图片               | :url(xxx);                         |
| background-repeat     | 平铺方式           | repeat-x/repeat-y/repeat/no-repeat |
| background-position   | 位置               | : x y ;（可以%）/x: lcr/y: ucb     |
| background-attachment | 随滚动条的滚动方式 | scroll/fixed                       |

- 当 background-attachment 的值为 scroll 时，按照当前元素进行偏移。
- 当 background-attachment 的值为 fixed 时，按照浏览器进行偏移。
- 奇奇怪怪的属性暂时不要用比较好

### CSS 边框样式

| 属性         | 含义 | 值                  |
| ------------ | ---- | ------------------- |
| border-style | 样式 | solid/dashed/dotted |
| border-width | 大小 | px                  |
| border-color | 颜色 | 颜色                |

针对某边单独设置：`border-right-style: xxx ;`

### CSS 文字样式

字体类型：`font-family`

- 英文字体
- 中文字体（中英文一般都会被改变）
- 衬线字体与非衬线体：有无棱角
- 字体名字中出现空格则必须加单引号

字体大小：`font-size`

- 数值单位是 px
- 默认 16px
- 字体大小一般是**偶数**，方便对齐
- 单词取值：xx-small/x-small/small/medium/large/x-large/xx-large(不确定性较大)

字体粗细：`font-width`

- normal/bold
- 数值（100、200...900）

字体样式：`font-style`

- normal/italic
- oblique 也表示斜体，可以为没有倾斜属性的字体设置

字体颜色：`color`

### 段落样式

文本装饰：`text-decoration`取值

- :underline;
- overline
- line-through
- none
- 添加多值时用空格隔开

大小写：`text-transform`

- lowercase 全小写
- uppercase 全大写
- capitalize 首字母全大写

首行缩进：`text-indent`

- 单位 px
- 单位 em，一个 em 即是一个字体大小单位。

文本对齐：`text-align`

- left/right
- center 居中
- justify 两侧对齐

行高：`line-height`

- 行高=字体+上边距
- 单位 px
- 比例值（scale） 不加单位

字间距：`letter-spacing`  
词间距：`word-spacing`（针对英文段落）

强制折行：  
`word-break: break all ;`（暴力）  
`word-wrap: break-word ;`（温和）

### 容器

块（division）：`<div></div>`，用来划分一个区域，相当于一块区域容器。

内联：`<span></span>`，用以修饰文字。

## CSS 复合样式

一个属性控制多个样式。

```css
div {
  /* 不需要关心顺序的复合样式： */
  background: red url() repaet 0 0;
  border: 2px red solid;
  /* 需要关心顺序的复合样式：*/
  font: bold italic 16px/30px 宋体;
  /* weight style size/line-height family */
}
```

如非必要，不要混用单一与复合样式，如果迫不得已，那么先写复合。

## CSS 选择器

### id 选择器

css: #elem{}  
html: id="elem"

注意：

1. 在一个页面中，id 应该是唯一的；
2. id 名只能包含：数字/字母/-/\_，且第一位不能是数字；
3. 命名方式有：小驼峰式(smallSearchBotton)，下划线写法(small_search_botton)，短线写法(small-search-botton)
4. 快捷创建，如 div#ele + tab。

### class 选择器

css: .elem{}
html: class ="elem"

或者 p.box

注意：

1. class 选择器是可以复用的；
2. 可以添加多个 class 样式；
3. 多个样式时，样式的优先级根据 CSS 决定，而不是 class 属性中的顺序；
4. 快捷创建，如 p.ele + tab。

### 标签选择器

css: div{}
html: `<div>`

1. 去掉某些标签的默认样式
2. 应用于层次选择器

### 群组选择器

css: div , #ele , .title {}

### 通配选择器

css: \*{}

### 层次选择器

1. 父子 M>N { }
   指向直属于 M 下的所有 N
2. 后代 M N { }
   指向隶属于 M 下的所有 N
3. 相邻 M+N { }
   指向 M 的下一个 N
4. 兄弟 M~N { }
   指向 M 下面的所有 N

### 属性选择器

![属性选择器](<img for notes/属性选择器.png>)

### 伪类选择器

css: M:伪类{}

| 伪类                   | 含义                 |
| ---------------------- | -------------------- |
| :link                  | 访问前样式           |
| :visited               | 访问后样式           |
| :hover                 | 鼠标移入时的样式     |
| :active                | 鼠标按下时的样式     |
| :after{content:"xxx"}  | 在对象后添加文本内容 |
| :before{content:"xxx"} | 在对象前添加文本内容 |
| :checked               | 已选                 |
| :disabled              | 不可选               |
| :focus                 | 悬浮                 |

1. link 与 visited 只能加给`<a>`
2. 四个伪类都生效，顺序为`L V H A`
3. 一般网站只能这样去设置：`a{} a:hover{}`
4. checked/disabled/focus 针对表单

结构伪类

1. :nth-of-type()、:nth-child()
   ()中填写数字，从 1 开始
   也可以写 n，或者例如 2n 代表偶数
2. :first-of-type、:first-child
3. :last-of-type、:last-child
4. :only-of-type、:only-child

## CSS 样式继承

文字相关的样式可以被继承，布局类则不可。但可以设置继承属性 inherit。

## CSS 优先级

1. 相同样式：后面的样式优先级更高
2. 内部样式与外部样式：优先级相同，后引入的优先级更高
3. 单一样式优先级：`<style>` 行间 1000 > id 100 > class 10> 元素 tag 1> \* > 继承
4. !important 写在属性后，提升样式优先级，非规范方式，不建议使用。
5. 标签+类 > 单类
6. 单类 = 群组
7. 层次优先级
   1. 权重比较 相加
   2. 约分比较 约去相同等级的选择器
   3. 为了避免麻烦，尽可能控制层次在三级以内

## CSS 盒子模型

组成：content -> padding -> border ->margin

> 类似于 物品 -> 填充物 -> 包装盒 -> 盒子间的间距

- width、height 作用到 content
- padding ：内边距
  - 只写一个值：上下左右
  - 写两个值：上下、左右
  - 写四个值：上、右、下、左（顺时针）
  - padding-up/right/bottom/left
- margin ：内边距
  - 只写一个值：上下左右
  - 写两个值：上下、左右
  - 写四个值：上、右、下、左（顺时针）
  - margin-up/right/bottom/left

1. 背景颜色最远会填充到 border 一层
2. 文字只在 content
3. padding 非负，margin 可负（制造重叠）

`box-sizing`：可以改变盒子模型的展示形态

- 默认值：content-box
  使 height、width 只作用于 content
- 可选值：content-border
  使 height、width 作用于 content、padding、margin
  - 可以解决百分比问题

### 盒子模型的问题

- margin 叠加问题：
  上（一个盒子的下内填充）下（一个盒子的上内填充）margin 会出现叠加
- 解决方案

  - BFC 规范
  - 想办法只给一个元素添加间距（迷惑）

- margin 传递问题：
  在嵌套的结构中，margin-top 会出现传递问题，会带动父容器。
- 解决方案

  - BFC 规范
  - 给父容器加边框（限制性巨大）
  - margin 换成 padding，调节父容器的 padding

- margin 自适应居中

  - margin-left:auto 挤到右侧
  - margin-right:auto 挤到左侧
  - 同时写上，挤到中间，可以写 margin: 0 auto
  - 上下自适应：css3

- 不设置 content 的现象
  会自动不溢出。

## 标签分类

### 按类型划分

1. block 块
   1. 独占一行
   2. 支持所有样式
   3. 不写 width 时，默认与父元素相同
   4. 占有区域为矩形
   5. div p ul li h1...
2. inline 内联
   1. 可以并排
   2. 不支持部分样式，不是一个完整的盒
   3. 不写 width 时，由内容决定
   4. 占有区域不一定是矩形
   5. 在代码中换行则不产生空隙(可以通过设置父容器字体大小为 0)
   6. span a em strong img...
3. inline-block
   1. 上述特点兼而有之。
   2. input select...

### 按内容分类

1. flow 流
2. metadata 元数据
3. section 分区
4. heading 标题
5. phrasing 措辞的
6. embedded 嵌入的
7. interactive 互动的

[W3C](W3C：https://www.w3.org/TR/html5/dom.html)

### 按显示

- 替换元素 需要给属性进行显示
  - img input...
- 非替换元素 只写标签即可显示
  - div p h...

## 属性：显示框类型

display: block/inline/inline-block/none/flex/grid 也就是产生强制转换

display:none 和 visibility:hidden 都是不可见，但前者不占空间，后者占空间。

## 标签嵌套规范

1. 固定嵌套顺序
   - ul li
   - dl dt dd
   - table tr td
2. 块可以嵌套内联
3. 一般来说块可以嵌套块，但 p 嵌套 div 是不合理的
4. 内联不能嵌套块标签 -特殊情况，a 可以嵌套块

## overflow 溢出隐藏

可选值：

1. visible
2. hidden
3. scroll 强制提供双向滚动条
4. auto
5. overlow-x,overflow-y

## 透明度与手势

opacity : 0（透明）~1（全不透明）

1. 仍占空间
2. 子内容透明

rgba : (r,g,b,a) a 取 0~1

cursor : 鼠标手势

- default
- pointer (手)
- move (四向箭头)
- 自定义
  - 准备.cur .ico 图片
  - `cursor: url(),auto`

## 宽高进阶

最大最小宽高  
`min/max-width/height`，本质是大小比较。

%只继承自父容器，如果要容器适应屏幕的高，则需要设置`html,body { height:100% }`

## 默认样式

无默认样式: div,span

有默认样式：

- body margin 8px
- h1 margin 上下 21.440px
- p margin 上下 16px
- ul margin 上下 16px
  padding 左 40px
  list-style disc

### CSS reset

一个方案:

```css
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: #666;
}
img {
  display: block;
}
/* 内联由于对齐文字基线而不是底线，会导致与块之间产生缝隙 可以写:vertical-align : bottom/baseline*/
```

## float 与文档流

即结构的默认排列方式。block 默认从上至下，inline 默认从左至右。

加`float`的元素将脱离文档流，会沿着父容器靠左或靠右排列，挨着前一个浮动元素进行排列。

1. 取值有 left/right/none。
2. 只会影响后面的元素
3. 内容默认提升半层
4. 默认宽由内容决定
5. 会进行换行排列
6. 换行位置按照最后一块决定 P79 12:00
7. 一般加给块元素

### 利用 clear 属性清除 float 浮动的影响

用在下方元素：`clear:left/right/both`，防止塌陷。

注意：clear 只对块有效

对于父元素：

1. 固定宽高：不推荐，不能把高度固定死，不适合做自适应的效果。
2. 父元素浮动：不推荐，因为父容器浮动也会影响到后面的元素。
3. overflow：hidden (BFC 规范)，如果有子元素想溢出，那么会受到影响
4. display：inline-block (BFC 规范)，不推荐，父容器会影响到后面的元素
5. 设置空标签：不推荐，会多添加一个标签。[P81](https://www.bilibili.com/video/av52670599?p=81)
6. after 伪类：推荐，是空标签的加强版，目前各大公司的做法。

```html
<style>
   .clear:after{content:'';clear:both;display:block}
   div div{float:left}
<style>
<div class="clear">
   <div></div>
</div>
```

## position 定位

属性：`left/right/up/bottom`

position 的值：

- static(默认)
- relative
  - 元素不会脱离文档流
  - 如果没有定位偏移量，不体现影响
  - 相对原位置进行偏移
- absolute
  - 使元素脱离文档流
  - 使内联元素支持宽高
  - 使块元素默认宽依据内容决定
  - 相对于有偏移的祖先元素进行偏移，否则相对于整个文档进行偏移。
- fixed
  - 使元素脱离文档流
  - 使内联元素支持宽高
  - 使块元素默认宽依据内容决定
  - 相对于浏览器窗口进行偏移，不受浏览器滚动条的影响
- sticky
  - 在指定位置进行粘性操作

`z-index`定位层级

整数确定层级高度

## CSS Sprite

CSS 雪碧，一种网页图片应用处理方式，允许你将一个页面涉及到的所有零星图片都包含到一张大图中加载。
