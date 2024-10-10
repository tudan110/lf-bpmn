# Vue2 + JS + Webpack For SFC template

LfBpmn

> BPMN process designer with Vue 2 support.

<p align='center'>
<b>English</b> | <a href="https://github.com/tudan110/lf-bpmn/blob/main/README.zh-CN.md">简体中文</a>
</p>

## Features

- Design the bpmn process

## Installation

Make sure to install the dependencies first:

```bash
# sh
npm install
```

## Development

Start the development server:

```sh
npm run dev
```

## Build

Build the library for production or publishing:

```sh
npm run lib
```

Build the example project for production or publishing:

```sh
npm run build
```

## Check and Fix Files
```
npm run lint
```

## Publish Package to npm

Log in to the npm registry
```sh
npm login
```

Publish
```sh
npm publish --access public
```

## How to Use the lib File?

### Attention

Make sure you have installed and registered element-ui in your project.

```js
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
```

### npm Installation

```sh
npm i lf-bpmn
```

### Global Import
Import and register the component in main.js
```js
import Vue from 'vue'
import LfBpmn from 'lf-bpmn'

Vue.use(LfBpmn)
```

### Manual Import
```js
import LfBpmn from 'lf-bpmn'

export default {
    components: {
        LfBpmn
    }
}
```

### Without a Build Tool or via `CDN`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <!-- Make sure you have this file in your current directory -->
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

## Demo

```vue

```

## License

Made with ❤️

Published under [MIT License](./LICENSE).
