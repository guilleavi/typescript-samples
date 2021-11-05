# New Typescript Project from scratch

1.  Generate gitignore

    `$ npx gitignore node `

    Add `temp` folder

2.  Generate package.json

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

    `$ yarn add -D typescript eslint jest`

    `$ volta pin node yarn`

3.  Init repo

    `$ git init`

    `$ git add -A`

    `$ git commit -m 'Initial commit'`

4.  tsconfig

    `$ yarn tsc --init`

    Update:

    ```
      "compilerOptions": {
        "composite": true,
        "target": "ES2018",
        "outDir": "dist",
        "rootDir": "src",
        "declaration": true,
        "types": [], // node_module types are not going to be available
        "esModuleInterop": false, // if this is 'on', all the apps that consumes your lib will need that 'on'
        "skipLibCheck": false, // if this is 'on', all the apps that consumes your lib will need that 'on'. This skip cheking the types in your node_modules
        "noUnusedParameters": true,
        "noUnusedLocals": true,
        "noImplicitReturns": true,
        "stripInternal": true,
      },
      "include": ["src"]
    ```

5.  Create src folder

    `$ mkdir src`

6.  eslint

    `$ yarn eslint --init`

    ```
    {
        "env": {
            "browser": true,
            "es2021": true
        },
        "extends": [
            "eslint:recommended",
            "prettier",
            "prettier/@typescript-eslint", // very important so eslint and prettier don't fight each other
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "ecmaVersion": 12,
            "project": "tsconfig.eslint.json"
        },
        "plugins": [
            "@typescript-eslint"
        ],
        "rules": {
            "prefer-const": "error",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-unused-params": "off",
        },
       "overrides": [
           {
               "files": [
                   "tests/**/*.ts"
               ],
               "env": {
                   "jest": true,
                   "node": true
               }
           }
       ]
    }
    ```

7.  Create tsconfig.eslint.json

    ```{
      "extends": "./tsconfig.json",
      "compilerOptions": {
        "types": [
          "jest"
        ]
      },
      "include": [
        "src",
        "tests"
      ]
    }
    ```

8.  Tests with jest

    `$ yarn add -D jest @types/jest @babel/preset-env @babel/preset-typescript`

    `$ mkdir tests`

    `$ cd tests`

    `$ touch tsconfig.json`

    ```
    {
      "extends": "../tsconfig.json",
      "references": [
        {
          "name": "typescript-samples",
          "path": ".."
        }
      ],
      "compilerOptions": {
        "types": [
          "jest"
        ],
        "rootDir": "..",
        "noEmit": true // no generate js files on build
      },
      "include": [
        "."
      ] // everything in test folder
    }
    ```

9.  Create babel preset

    On root folder:

    `$ touch .babelrc`

    ```
      {
        "presets": [
          [
            "@babel/preset-env",
            {
              "targets": {
                "node": 10
              }
            }
          ],
          "@babel/preset-typescript"
        ]
      }
    ```

10. Create repo
    `$ gh repo create typescript-samples`

11. API Extractor

    `$ yarn add -D @microsoft/api-extractor @microsoft/api-documenter`

    `$ yarn api-extractor init`

    Update api-extractor.json

          "mainEntryPointFilePath": "<projectFolder>/dist/index.d.ts",
          "untrimmedFilePath": "<projectFolder>/dist/<unscopedPackageName>-private.d.ts",
          "betaTrimmedFilePath": "<projectFolder>/dist/<unscopedPackageName>-beta.d.ts",
          "publicTrimmedFilePath": "<projectFolder>/dist/<unscopedPackageName>.d.ts",

    Create etc folder

    `$ mkdir etc`
    `$ yarn build`
    `$ yarn api-extractor run --local`

    If you remove the --local and the API changes, it will return an error. This is to prevent API changes on prod.

    `$ yarn api-documenter markdown -i temp -o docs`
