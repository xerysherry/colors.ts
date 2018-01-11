Colors For Typescript/TypeScript 
================================

How to install?
-----------

Please copy lib/* to your project path, or your favourite.

How to use?
-----------

It's very easy. First, please import colors.ts in your source, like this:

```TypeScript 
import {Colors} from './lib/colors';
```

or

```TypeScript 
require('./lib/colors');
```


Next to use it.

```TypeScript 
console.log("this is a red string".red);
Colors("red", "this is a red string too!");
```

Theme
-----

You can use a custom theme.

```TypeScript 
Colors.theme({error:"red"})
console.log("this is a error".error);
Colors.theme({error:"bgRed"})
console.log("this is a error".error);
```

Theme have 4 useful propertis(verbose, info, debug, error) and 10 custom properties(custom0 ~ custom10).

Sample
------

In /sample/, you will found some sample. It is very easy and clear.

Screenshot
----------

[windows_cmd](https://raw.githubusercontent.com/xerysherry/colors.ts/master/screenshot/windows_cmd.png)
[centos_console](https://raw.githubusercontent.com/xerysherry/colors.ts/master/screenshot/centos_console.png)

Enjoy it!

TypeScript 命令行输出颜色库
=========================

如何安装？
--------

拷贝lib到你的工程路径下, 或者任意你喜欢的地方。

如何使用？
--------

非常简单！在代码中Import它，像这样：

```TypeScript 
import {Colors} from './lib/colors'；
```

或者

```TypeScript 
require('./lib/colors');
```

接着，就可以使用啦。

```TypeScript 
console.log("this is a red string".red);
Colors("red", "this is a red string too!");
```

主题
----

你可以使用自定义主题

```TypeScript 
Colors.theme({error:"red"})
console.log("this is a error".error);
Colors.theme({error:"bgRed"})
console.log("this is a error".error);
```

主题相关属性包括，verbose, info, debug, error四个常用的，以及custom0~custom9十个自定义位置。

例子
----

你可以在/Sample/下找到相关例子，它们都非常简单和清晰。

截图
----
[windows_cmd](https://raw.githubusercontent.com/xerysherry/colors.ts/master/screenshot/windows_cmd.png)
[centos_console](https://raw.githubusercontent.com/xerysherry/colors.ts/master/screenshot/centos_console.png)

请使用它，希望你们喜欢！
