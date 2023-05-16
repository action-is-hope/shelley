<p align="center">
  <a href="https://www.shelley.earth">
    <img width="250px" src="">
  </a>
</p>

<h1 align="center">S H E L L E Y</h1>

<div align="center">
  [![Known Vulnerabilities](https://snyk.io/test/github/action-is-hope/shelley/badge.svg)](https://snyk.io/test/github/action-is-hope/shelley)
  [![Build Status](https://github.com/action-is-hope/shelley/actions/workflows/main.yml/badge.svg)](https://github.com/action-is-hope/shelley)
  [![codecov](https://codecov.io/gh/action-is-hope/shelley/branch/main/graph/badge.svg?token=xxxx)](https://codecov.io/gh/action-is-hope/shelley)
  [![Contributions Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
</div>

## Overview

## Usage

## Docs

To read the documentation, please visit our [Documentation](DOCUMENTATION.md)

## Contributing

[Contributing](CONTRIBUTING.md)

## Development

The following scripts are available:

`npm start` - Starts Storybook for component development.

`npm run clean` - Delete the `dist` folder. Uses [rimraf](https://github.com/isaacs/rimraf).

`npm run typecheck` - Verify syntactic/semantic correctness. Uses [typescript](https://github.com/microsoft/TypeScript).

`npm run lint` - Verify best practices and find common issues. Uses [eslint](https://github.com/eslint/eslint).

`npm test` - Execute `typecheck`, `lint`, `unit-test` and `cypress` scripts.

`npm run build` - Builds the package ready for npm into `dist`. The contents of this folder can then be deployed to npm.

`npm run build-storybook` - Builds the static Storybook site into `static-storybook` ready for deployment to Netifly on merge into `main`.
