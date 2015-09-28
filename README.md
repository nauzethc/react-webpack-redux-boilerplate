# react-webpack-redux-boilerplate
Minimal boilerplate for ReactJS+Redux with dev environment.

 - [React](https://github.com/facebook/react)
 - [babel-loader](https://github.com/babel/babel-loader) (ES6 + JSX transpiler)
 - [webpack](https://github.com/webpack/webpack) (Module bundler)
 - [webpack-dev-server](https://github.com/webpack/webpack-dev-server) (Web server for development usage)
 - [react-hot-loader](https://github.com/gaearon/react-hot-loader) (hot module replacement)
 - [redux](https://github.com/rackt/redux) (State container)
 - [redux-thunk](https://github.com/gaearon/redux-thunk) (Async functions dispatching for Redux)
 - [react-redux](https://github.com/rackt/react-redux) (React bindings for React)
 - [eslint](https://github.com/eslint/eslint) and [csslint](https://github.com/CSSLint/csslint) (Source code linters)

## Usage
```
npm install
npm start
```
or
```
npm run debug
```
to start with `redux-devtools` enabled.

Go to http://localhost:8080

## Linting
```
npm run lint
```

## Build
```
npm run build
```
It builds full project to `build` folder