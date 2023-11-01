# Vector Sandbox

This is a sandbox environment for the [vector library](https://github.com/kurtbruns/vector.git). 

**Note:** To link a local version with unpublished changes run the following command. I like to also uninstall the current version in case you add any depenencies and the link is blown away leading to confusion.

```
npm uninstall @kurtbruns/vector && npm link @kurtbruns/vector
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
