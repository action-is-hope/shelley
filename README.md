# Shelley

[![Main workflow](https://github.com/action-is-hope/shelley/actions/workflows/main.yml/badge.svg)](https://github.com/action-is-hope/shelley)

Shelley is an accessible _headless_ (unstyled by default) UI library for React and is built primarily upon [Adobe React Aria](https://react-spectrum.adobe.com/react-aria/index.html) and [Adobe React Stately](https://react-spectrum.adobe.com/react-stately/index.html) allowing you to implement your own design system quickly and with confidence.

For styling Shelley implements [Wix's Stylable](https://stylable.io/), huge props to the team over at Wix Engineering for giving us CSS back with a bang!

## Getting started

There are currently two ways of starting working with Stylable:

- Quickly start a new project from a [boilerplate](https://stylable.io/docs/getting-started/boilerplate)
- Integrate into a new or existing project by [manually configuring](https://stylable.io/docs/getting-started/manual-integration) Stylable.

Optionally (highly recommended), you can install [Stylable Intelligence](https://stylable.io/docs/getting-started/tooling/stylable-intelligence), an extension providing IDE support for code completion and diagnostics (currently supported only for Visual Studio Code).
## Development

The following scripts are available:

`npm start` - Starts Storybook for component development.

`npm run clean` - Delete the `dist` folder. Uses [rimraf](https://github.com/isaacs/rimraf).

`npm run typecheck` - Verify syntactic/semantic correctness. Uses [typescript](https://github.com/microsoft/TypeScript).

`npm run lint` - Verify best practices and find common issues. Uses [eslint](https://github.com/eslint/eslint).

`npm test` - Execute `typecheck`, `lint`, `unit-test` and `cypress` scripts.

`npm run build` - Builds the package ready for npm into `dist`. The contents of this folder can then be deployed to npm.

`npm run build-storybook` - Builds the static Storybook site into `static-storybook` ready for deployment to Netifly on merge into `main`.
