module.exports = {
    testEnvironment: "node",
    coverageDirectory: "coverage",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.js"],
    reporters: ["default", ["jest-html-reporter", { outputPath: "coverage/index.html" }]],
  };
  