1.  API Extractor

    - Generating API documentation
    - Tells you if there are any changes in your API surface associated with a code change
    - Allows you to provide multiple variants of your public API surface, at various levels of release maturity (i.e., "beta")

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

2.  API Documenter

    `$ yarn api-documenter markdown -i temp -o docs`
