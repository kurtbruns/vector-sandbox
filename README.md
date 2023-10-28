# Vector Sandbox

This is a sandbox environment (code space) for the [vector library](https://github.com/kurtbruns/vector.git). It's based on Tania Rascia's [Webpack boilerplate](https://github.com/taniarascia/webpack-boilerplate).

Currently, this is a place to consume the vector library in different ways to test things out while developing them.

**Note:** The library is currently linked and not installed as a dependency.

```
npm link @kurtbruns/vector
```

## Installation

Clone this repo and npm install.

```bash
npm i
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`.

### Production build

```bash
npm run build
```

> Note: Install [http-server](https://www.npmjs.com/package/http-server) globally to deploy a simple server.

```bash
npm i -g http-server
```

You can view the deploy by creating a server in `dist`.

```bash
cd dist && http-server
```
