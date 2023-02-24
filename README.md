# Shelley

[![Main workflow](https://github.com/action-is-hope/shelley/actions/workflows/main.yml/badge.svg)](https://github.com/action-is-hope/shelley)

## Development

The following scripts are available:

`npm start` - Starts Storybook for component development.

`npm run clean` - Delete the `dist` folder. Uses [rimraf](https://github.com/isaacs/rimraf).

`npm run typecheck` - Verify syntactic/semantic correctness. Uses [typescript](https://github.com/microsoft/TypeScript).

`npm run lint` - Verify best practices and find common issues. Uses [eslint](https://github.com/eslint/eslint).

`npm test` - Execute `typecheck`, `lint`, `unit-test` and `cypress` scripts.

`npm run build` - Builds the package ready for npm into `dist`. The contents of this folder can then be deployed to npm.

`npm run build-storybook` - Builds the static Storybook site into `static-storybook` ready for deployment to Netifly on merge into `main`.