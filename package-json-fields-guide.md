# package.json: Important Fields Explained with Examples

A `package.json` file is the metadata file for a Node.js project. It tells Node.js, npm, and tools how to run, package, and describe the project.

Example:

```json
{
  "name": "my-api",
  "version": "1.2.0",
  "description": "A sample REST API",
  "private": true,
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.1.0"
  }
}
```

---

## 1. `name`

The package name.

```json
"name": "my-api"
```

- Must be lowercase
- Can include hyphen and underscore
- Used in npm install and package publishing

Example:

```json
"name": "node-backend-course"
```

---

## 2. `version`

The package version using semantic versioning (SemVer).

```json
"version": "1.2.3"
```

Version format:

```text
MAJOR.MINOR.PATCH
```

Examples:

- `1.0.0` = first release
- `1.2.0` = new feature added
- `1.2.1` = bug fix

---

## 3. `description`

A short summary of what the project does.

```json
"description": "A backend API for customer management"
```

This is useful for npm search and project documentation.

---

## 4. `private`

Prevents the package from being published to npm.

```json
"private": true
```

Use this for internal apps or projects that should not be shared publicly.

---

## 5. `main`

The entry file of the package when someone imports it.

```json
"main": "server.js"
```

If a user does:

```js
require("my-api")
```

Node.js will load `server.js`.

Example:

```json
"main": "dist/index.js"
```

---

## 6. `type`

Defines how Node.js should interpret `.js` files.

```json
"type": "module"
```

This allows using:

```js
import express from 'express';
```

instead of CommonJS:

```js
const express = require('express');
```

Without `type`, Node.js assumes CommonJS by default.

---

## 7. `module`

Used mainly by bundlers like webpack, Rollup, or Vite for the ESM build.

```json
"module": "dist/index.esm.js"
```

This is not used by Node.js directly, but by frontend tooling.

---

## 8. `scripts`

Contains commands used for development, testing, and deployment.

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "jest",
  "build": "tsc"
}
```

You run them with:

```bash
npm run start
npm run test
```

Common script examples:

```json
"scripts": {
  "lint": "eslint .",
  "format": "prettier --write .",
  "start": "node app.js",
  "dev": "node --watch app.js"
}
```

---

## 9. `keywords`

Used to describe the project for search indexing.

```json
"keywords": ["nodejs", "api", "backend", "express"]
```

Helpful when publishing packages to npm.

---

## 10. `homepage`

The homepage URL for the project.

```json
"homepage": "https://myproject.example.com"
```

---

## 11. `bugs`

URL or email for bug reports.

```json
"bugs": {
  "url": "https://github.com/org/project/issues"
}
```

You can also use a string:

```json
"bugs": "https://github.com/org/project/issues"
```

---

## 12. `license`

Project license.

```json
"license": "MIT"
```

Common licenses:

- MIT
- Apache-2.0
- GPL-3.0
- ISC

---

## 13. `author`

Project author information.

```json
"author": "Vinay Madarkhandi"
```

Can also be an object:

```json
"author": {
  "name": "Vinay Madarkhandi",
  "email": "vinay@example.com",
  "url": "https://example.com"
}
```

---

## 14. `contributors`

List of other contributors.

```json
"contributors": [
  "Alice",
  "Bob"
]
```

---

## 15. `repository`

Where the code lives, usually GitHub.

```json
"repository": {
  "type": "git",
  "url": "https://github.com/org/project.git"
}
```

Short form:

```json
"repository": "github:org/project"
```

---

## 16. `dependencies`

Packages required for the application to run in production.

```json
"dependencies": {
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "dotenv": "^16.4.5"
}
```

These are installed when someone runs:

```bash
npm install
```

Example usage:

```js
const express = require('express');
```

---

## 17. `devDependencies`

Packages only needed while developing, testing, or building the app.

```json
"devDependencies": {
  "jest": "^29.7.0",
  "nodemon": "^3.1.0",
  "eslint": "^8.0.0"
}
```

These are installed with:

```bash
npm install --save-dev jest
```

Used for tools like:

- test runners
- linters
- bundlers
- transpilers

---

## 18. `peerDependencies`

Packages that the project expects the consumer to provide.

```json
"peerDependencies": {
  "react": "^18.0.0"
}
```

Common in libraries. Example: a plugin for React expects React to already exist in the project.

---

## 19. `optionalDependencies`

Dependencies that are not required for the app to run.

```json
"optionalDependencies": {
  "fsevents": "^2.3.3"
}
```

If installation fails, npm continues without crashing the install.

---

## 20. `bundledDependencies`

Packages that should be included when publishing the package.

```json
"bundledDependencies": [
  "some-local-package"
]
```

This is useful when shipping a package as a single bundle.

---

## 21. `engines`

Specifies which Node.js or package manager versions are supported.

```json
"engines": {
  "node": ">=18.0.0",
  "npm": ">=9.0.0"
}
```

Example warning:

```bash
npm WARN EBADENGINE Unsupported engine
```

---

## 22. `os` and `cpu`

Restrict the package to particular operating systems or CPUs.

```json
"os": [
  "darwin",
  "linux"
],
"cpu": [
  "x64",
  "arm64"
]
```

This is useful for native modules or platform-specific tools.

---

## 23. `files`

Controls which files get published to npm.

```json
"files": [
  "dist",
  "README.md",
  "LICENSE"
]
```

Only those files are included in the package.

---

## 24. `bin`

Executable files to expose as CLI commands.

```json
"bin": {
  "mycli": "./bin/mycli.js"
}
```

After installing, users can run:

```bash
mycli
```

---

## 25. `man`

Manpage documentation for CLI tools.

```json
"man": [
  "./docs/mycli.1"
]
```

---

## 26. `directories`

Defines common project directories.

```json
"directories": {
  "lib": "src",
  "doc": "docs",
  "test": "tests"
}
```

This gives metadata about where files are located.

---

## 27. `config`

Project-specific configuration keys.

```json
"config": {
  "port": 3000,
  "env": "development"
}
```

You can access these in scripts with:

```bash
npm run start
```

or from code using environment variables or config libraries.

---

## 28. `publishConfig`

Config used when publishing the package.

```json
"publishConfig": {
  "access": "public",
  "registry": "https://registry.npmjs.org/"
}
```

This is commonly used for private registries or package access control.

---

## 29. `exports`

Controls what modules can be imported from the package.

```json
"exports": {
  ".": "./dist/index.js",
  "./feature": "./dist/feature.js"
}
```

This is important for package consumers and helps expose a clean API.

Example:

```js
import { createUser } from 'my-package';
import { helper } from 'my-package/feature';
```

---

## 30. `types` or `typings`

Points to TypeScript declaration files.

```json
"types": "dist/index.d.ts"
```

or

```json
"typings": "dist/index.d.ts"
```

Used by TypeScript editors and tools.

---

## 31. `sideEffects`

Tells bundlers whether the module has side effects when imported.

```json
"sideEffects": false
```

This helps optimize bundle size in production builds.

---

## 32. `workspaces`

Used for monorepos that contain multiple packages.

```json
"workspaces": [
  "packages/*",
  "apps/*"
]
```

Example structure:

```text
repo/
  package.json
  packages/
    frontend/
    backend/
```

---

## 33. `packageManager`

Specifies the package manager and version for the project.

```json
"packageManager": "npm@10.8.2"
```

Useful for consistency across developer machines and CI pipelines.

---

## 34. `tslib` or Other Custom Fields

You can also add custom fields if your tooling needs them.

```json
"customConfig": {
  "apiUrl": "https://api.example.com"
}
```

These are not standard Node.js fields, but can be used by custom scripts or tools.

---

# Example of a Complete package.json

```json
{
  "name": "my-backend-app",
  "version": "1.0.0",
  "description": "A Node.js backend for managing users",
  "private": true,
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "lint": "eslint ."
  },
  "keywords": ["node", "backend", "api"],
  "author": {
    "name": "Vinay Madarkhandi",
    "email": "vinay@example.com"
  },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/org/my-backend-app.git"
  },
  "homepage": "https://my-backend-app.example.com",
  "bugs": {
    "url": "https://github.com/org/my-backend-app/issues"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.1.0",
    "eslint": "^8.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

# Quick Summary

The most important `package.json` fields for a Node.js project are:

- `name` – project name
- `version` – package version
- `description` – summary
- `main` – entry file
- `type` – ESM vs CommonJS
- `scripts` – commands to run
- `dependencies` – required runtime packages
- `devDependencies` – development tools
- `engines` – supported runtime versions
- `repository` – source code URL
- `license` – legal usage information

These fields help Node.js, npm, and tooling understand and manage the project correctly.

---

## Final Note

If you are learning Node.js, remember that `package.json` is the heart of a JavaScript project. It tells the system what the project is, how to run it, what dependencies it needs, and how it should be distributed or published.
