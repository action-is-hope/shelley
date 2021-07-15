module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "\\.st\\.css?$": require.resolve("@stylable/jest")
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(.*?\\.st\\.css$))" // libraries publish .st.css files in their dist
  ],
  testRegex: "(src/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  moduleNameMapper: {
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-raw-loader"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  testPathIgnorePatterns: ["node_modules", ".cache"],
  globals: {
    __PATH_PREFIX__: ""
  },
  testURL: "http://localhost",
  // setupFiles: ["<rootDir>/loadershim.js"],
  setupFilesAfterEnv: ["<rootDir>/setup-test-env.ts"]
};
