# 操作中的笔记

## 注意事项

- 若父元素设置min-height，子元素不会继承。

## 图片水平居中

```html
<div id="window" class="container_fluid">
  <img src="img/69371385_p0.jpg" alt="noriZC" />
</div>
```

第一种操作：这意味着**图片的宽度始终和浏览器一致**进行缩放，高度随之改变

```css
#window {
  position: relative;
}
#window img {
  width: 100%;
  /* right: 5%; */
  margin: 0 auto;
}
```

第二种操作：这意味着**图片锁定高度**水平居中，左右两侧会出现溢出

```css
#windowTest {
  height: 650px;
  text-align: center; /* 父容器设置内容居中 */
  overflow: hidden;
}
#windowTest img {
  display: inline-block; /* 改变形态 */
  height: 650px;
  margin: 0 -100%; /* 让图片边不会抵着父容器 */
}
```

## 快元素垂直居中

```css
#box {
    width: 300px;
    height: 300px;
    background: #ddd;
    position: relative;
}
#child {
    background: orange;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
}
```
