# JS编码与解码

用URL传参不可避免地要转换UTF-8编码，这里主要要用到两个函数：`encodeURIComponent`和`decodeURIComponent`，效果如下面的代码所示：

```js
const origin = "字符串String001"
console.log(origin);//字符串String001
let originEn = encodeURIComponent(origin);
console.log(originEn);//%E5%AD%97%E7%AC%A6%E4%B8%B2String001
let origenDe = decodeURIComponent(originEn);
console.log(origenDe);//字符串String001
```

可以发现，上面的转换是不太全面的，那么在参考文章中给出了套完全转换的js函数：

```js
function encodeUtf8(text) {
    const code = encodeURIComponent(text);
    const bytes = [];
    for (var i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else bytes.push(c.charCodeAt(0));
    }
    return bytes;
}
```

```js
function decodeUtf8(bytes) {
    var encoded = "";
    for (var i = 0; i < bytes.length; i++) {
        encoded += '%' + bytes[i].toString(16);
    }
    return decodeURIComponent(encoded);
}
```

下面是使用示例：

```js
var array = encodeUtf8("字符串String001");
console.log(array);     //(18) [229, 173, 151, 231, 172, 166, 228, 184, 178, 83, 116, 114, 105, 110, 103, 48, 48, 49]
var content = decodeUtf8(array);
console.log(content);   //字符串String001
```

前后端交流应当是用得到的。

## 参考文章 {refernce}

- [Js中进行utf-8的编码和解码](https://blog.csdn.net/swimming_in_IT_/article/details/81117514)
