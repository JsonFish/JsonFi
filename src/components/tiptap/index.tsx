"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";

const Tiptap = () => {
  const [text, setText] = useState("");
  const mdStr =
    '---\ntheme: channing-cyan\nhighlight: a11y-dark\n---\n这道面试题涉及的知识点有点多，主要就是想考察你的js功底<br>\n实现的方法一般要重写对象的 `valueOf()` 方法 或者 `toString()` 方法<br>\n例如：\n```js\n        const a = {\n            value: 1,\n            toString() {\n                return this.value++;\n            }\n        }\n        console.log(a == 1 && a == 2 && a == 3) // true\n```\n### 首先搞懂`=`,`==`和`===` \n- **单等号`=`** 常用于赋值操作，这个不再过多讲了\n- **双等号`==`** 是**等于操作符**,如果两边的值相等就会返回 `true` ,因为js中存在`类型隐式转换机制`，所以使用`==`时会先进行类型转换，然后在进行比较。\n```js\nconsole.log("2" == 2) //true\nconsole.log(true == 1) //true\nconsole.log(null == undifined) //true\n```\n- **三等号`===`** **恒等操作符**，与双等号不同的是，三等号不会进行类型转换，也就是说三等号两边的数据，必须类型相同，值相同，才会返回 `true`\n```js\nconsole.log(true === 1) //false\nconsole.log("2" === 2) //false\nconsole.log(null === undifined) //false\n```\n### 搞懂双等号`==`过程中的的隐式类型转换机制\n\n当使用`==`比较时，如果一个运算对象是原始值，而另一个运算对象是对象（`object`），则该对象将转换为没有首选类型的原始值。该过程中会调用引用类型值原型上的 `valueOf()` 和 `toString()` 方法，将其转化为原始类型。这两个方法的返回值会根据需要进行转换。具体的调用顺序如下：\n1. **如果运算对象不是字符串，则先尝试调用 `valueOf()`**： 如果对象具有 `valueOf()` 方法，运算对象不是字符串，且返回的值是原始值（非对象），则直接使用该值进行比较。\n2. **没有 `valueOf()`**： 如果对象没有 `valueOf()` 方法，或者 `valueOf()` 返回的是对象，那么 JavaScript 将调用对象的 `toString()` 方法。\n3.  **如果运算对象是字符串或者没有`valueOf()`，则先调用 `toString()`**： 如果对象具有 `toString()` 方法且返回的值是原始值（非对象），则直接使用该值进行比较。\n4. **没有 `toString()`** 如果对象没有 `toString()` 方法，或者 `toString()` 返回的是对象，则会抛出 `TypeError` 错误。\n### Object.prototype.valueOf()\n**MDN上描述**：`valueOf` 方法`将对象转换成基本类型值`。你很少需要自己调用 `valueOf` 方法；当遇到需要基本类型值的对象时，JavaScript 会自动的调用该方法。强制数字类型转换和强制基本类型转换优先会调用该方法，而强制字符串转换会优先调用 `toString()`，<br>\n基本的 `valueOf()` 方法返回 `this` 值本身，如果尚未转换为对象，则转换成对象。因此，任何基本类型转换算法都不会使用它的返回值。<br>\n```js\n    const a = {\n      value: 1,\n    }; \n    console.log(a.valueOf()); // {value: 1}\n```\n所以使用 `==` 与数值进行比较时，会优先调用 `Object.prototype.valueOf()`方法，而这个方法是返回对象本身，所以我们可以重写 `Object.prototype.valueOf()` 方法，改变其返回值：\n```js\n    const a = {\n      value: 1,\n      valueOf() {\n        return this.value; \n      },\n    };\n    console.log(a.valueOf()); // 1\n```\n利用闭包的特性:\n```js\n    const a = {\n      value: 1,\n      valueOf() {\n        return this.value++;\n      },\n    };\n    console.log(a.valueOf()); // 1\n    console.log(a.valueOf()); // 2\n    console.log(a.valueOf()); // 3\n```\n回到下面这个代码中，因为使用`==`类型转换会默认调用 `Object.prototype.valueOf()`方法，所以这就很容易明白了\n```js\n        const a = {\n            value: 1,\n            valueOf() {\n                return this.value++;\n            }\n        }\n        console.log(a == 1 && a == 2 && a == 3) // true\n        console.log(a.valueOf() == 1 && a.valueOf() == 2 && a.valueOf() == 3) // true\n```\n### Object.prototype.toString()\n**MDN上描述**:调用 `toString` 方法`将对象转换为一个原始值`。你很少需要自己去调用 `toString` 方法；当遇到需要原始值的对象时，JavaScript 会自己调用它。`强制数字类型转换`和`强制基本类型转换`优先会调用 `valueOf` 方法，而`强制字符串转换`会优先调用 `toString()`，并且 `toString()` 很可能返回字符串值（甚至对于 `Object.prototype.toString()` 基本实现也是如此），因此在这种情况下不会调用 `valueOf()`。<br>\n所以重写 `Object.prototype.toString()` 也会实现上面的 `valueOf` 效果。因为我们没有重写 `valueOf`,而 `valueOf` 返回的是对象本身，将会默认继续调用 `toString` 方法。\n```js\n    const a = {\n      value: 1,\n      toString() {\n        return this.value++;\n      }\n    };\n    console.log(a.toString()); // 1\n    console.log(a.toString()); // 2\n    console.log(a.toString()); // 3\n ```\n```js\n    const a = {\n      value: 1,\n      toString() {\n        return this.value++;\n      }\n    };\n    console.log(a == 1 && a == 2 && a == 3) // true\n```';

  useEffect(() => {
    // 使用 Next.js API 路由作为代理，解决 CORS 问题
    fetch("/api/article?id=47")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.content);
        setText(data.data.content);
      })
      .catch((error) => {
        console.error("获取文章失败:", error);
      });
  }, []);
  const editor = useEditor({
    // element: document.querySelector("#editor"),
    extensions: [StarterKit, Markdown],
    content: mdStr,
    contentType: "markdown",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
