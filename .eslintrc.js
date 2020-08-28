module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    // "eslint:recommended",
    // "plugin:react/recommended",
    // "plugin:@typescript-eslint/recommended",
    // // "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // "prettier/@typescript-eslint",

    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
    // "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
    jest: true
  },
  plugins: ["@typescript-eslint", "react-hooks"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/prop-types": "off", // Disable prop-types as we use TypeScript for type checking
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-unused-vars": "off",
    "ts/no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/no-unescaped-entities": 0
  },
  overrides: [
    // Override some TypeScript rules just for .js files
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off" //
      }
    }
  ]
};
