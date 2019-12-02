// module.exports = {
//   preset: "jest-preset-gatsby/typescript",

//   transform: {
//     "\\.st\\.css?$": require.resolve("@stylable/jest")
//   },
//   transformIgnorePatterns: [
//     "/node_modules/(?!(.*?\\.st\\.css$))" // libraries publish .st.css files in their dist
//   ],
//   setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"]
// };

// module.exports = {
//   transform: {
//     "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`
//   },
//   moduleNameMapper: {
//     ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
//     ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`
//   },
//   testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
//   transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
//   globals: {
//     __PATH_PREFIX__: ``
//   },
//   testURL: `http://localhost:8000`,
//   setupFiles: [`<rootDir>/loadershim.js`]
// };

// module.exports = {
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//     "^.+\\.jsx?$": "<rootDir>/jest-preprocess.js"
//     // "\\.st\\.css?$": require.resolve("@stylable/jest")
//   },
//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
//   moduleNameMapper: {
//     ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
//     ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
//       "<rootDir>/__mocks__/file-mock.js"
//   },
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   testPathIgnorePatterns: ["node_modules", ".cache", "public"],
//   transformIgnorePatterns: [
//     // "node_modules/(?!(.*?\\.st\\.css$))",
//     "node_modules/(?!(gatsby)/)"
//   ],
//   globals: {
//     __PATH_PREFIX__: ""
//   },
//   testURL: "http://localhost",
//   setupFiles: ["<rootDir>/loadershim.js"],
//   setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"]
// };
// rule.exclude = /\.st\.css$/;

module.exports = {
  transform: {
    "\\.st\\.css?$": require.resolve("@stylable/jest"),
    "^.+\\.jsx?$": "<rootDir>/jest-preprocess.js",
    "^.+\\.tsx?$": `<rootDir>/jest-preprocess.js`
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  moduleNameMapper: {
    // ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-raw-loader"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [
    "node_modules",
    ".cache",
    "/node_modules/(?!(.*?\\.st\\.css$))"
  ],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  globals: {
    __PATH_PREFIX__: ""
  },
  testURL: "http://localhost",
  setupFiles: [`<rootDir>/loadershim.js`]
};
