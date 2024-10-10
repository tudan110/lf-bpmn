# Vue2 + JS + Webpack For SFC template

LfBpmn

> 支持 Vue 2 的 bpmn 流程设计器。

<p align='center'>
<a href="https://github.com/tudan110/lf-bpmn/blob/main/README.md">English</a> | <b>简体中文</b>
</p>

## 功能

- 设计 bpmn 流程

## 安装

确保先安装依赖：

```bash
# sh
npm install
```

## 开发

启动开发服务：

```sh
npm run dev
```

## 构建

构建库用于生产或发布：

```sh
npm run lib
```

构建示例项目用于生产或发布：

```sh
npm run build
```

## 检查并修复文件
```
npm run lint
```

## 发布包到 npm

登录 npm 库
```sh
npm login
```

发布
```sh
npm publish --access public
```

## 如何使用 lib 文件？

### 注意

确保你的项目中已经安装并注册了 element-ui

```js
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
```

### npm 安装

```sh
npm i lf-bpmn
```

### 全局导入
在 main.js 中导入并注册组件
```js
import Vue from 'vue'
import LfBpmn from 'lf-bpmn'

Vue.use(LfBpmn)
```

### 手动导入
```js
import LfBpmn from 'lf-bpmn'

export default {
    components: {
        LfBpmn
    }
}
```

### 不使用构建工具或通过 `CDN` 引入

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <!-- 确保你的当前目录有该产物 -->
    <script src="/lib/lf-bpmn.umd.js"></script>
    <style>
        #app {
            font-family: Avenir, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;
            color: #2c3e50;
            margin-top: 60px;
        }
    </style>
</head>
<body>
<div id="app">
    <lf-bpmn></lf-bpmn>
</div>
</body>
<script>
    var app = new Vue({
        el: '#app'
    })
</script>
</html>
```

## 示例

```vue

```

## License

Made with ❤️

Published under [MIT License](./LICENSE).
