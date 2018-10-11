# fis-livereload

> 因为 fis3 的 livereload 总是报错，所以自己实现 livereload。

fis-livereload 使用最新的 [livereload](https://www.npmjs.com/package/livereload) ,并且不会出现 `fis3 release -wL` 报错的情况。

## 示例

```js
var fisLivereload = require('fis-livereload').create()
fis.media('dev').match('*.html', {
    postprocessor: fisLivereload
})
```

```shell
## 开发
fis3 release -w -d ./output
## 发布
fis3 release prod -d ./output
```


## 配置

```js
require('fis-livereload').create(livereloadSettings , watchDir)
```

`livereloadSettings` 对应 https://www.npmjs.com/package/livereload#server-api 的配置。

`watchDir` 指的是监听哪个目录的文件修改。默认获取 `fis3 release -w -d ./output` 中配置的 `./output` 。也可以自行指定。

`watchDir` 需要是绝对路径。（`/Users/nimo/Documents/onface/fis-livereload/example/output` 或 `C:/Users/foo`）

> `fis3 release -w` 这种使用默认产出目录的情况无法获取 watchDir 。因为作者没有找到 fis3 提供的获取产出目录接口。
