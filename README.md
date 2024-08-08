# Vector Sandbox

This is a sandbox environment for the [vector library](https://github.com/kurtbruns/vector.git). 

## Installation

Clone this repo and npm install.

```bash
npm install
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:4040`.

### Production build

```bash
npm run build
```

> Note: Install [http-server](https://www.npmjs.com/package/http-server) globally to deploy a simple server.

```bash
npm i -g http-server
```

You can view the deployment by creating a server in `dist`.

```bash
cd dist && http-server
```

## Local vs. external Library

If you have a local version of the `vector` library that you want to use you can link it with the following command. I also like to uninstall the library as a dependency so that if you make any changes with npm, it doesn't lead to confusion on which library is being used.

```
npm uninstall @kurtbruns/vector && npm link @kurtbruns/vector
```

### Live reloads

I've recently been installing the vector library in the `src` directory to get all the benefits of using the VSCode editor. To install the latest version:

TODO: test install script

```
./scripts/install_local.sh
```

To install a specific version:

```
./scripts/install-local.sh 0.7.1
```

To change the import statements from *external* to *local*:

```
./scripts/import_all_local.sh
```

Uncomment the line `/src/vector/` in the `.gitignore` to jump to files faster.

### Archiving Repository

To change the import statements from *local* to *external*:

```
./scripts/import_all_external.sh
```
