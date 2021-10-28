# New Typescript Project from scratch

1. Generate gitignore

   `$ npx gitignore node `

2. Generate package.json

`$ yarn init --yes`

In package.json update:

```
{
  "name": "typescript-samples",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "license": "MIT",
  "scripts": {
    "build": "tsc",
    "dev": "yarn build -watch --preserveWatchOutput",
    "lint": "eslist src --ext js,ts",
    "test": "jest"
  }
}
```
