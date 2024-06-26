/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    clearMocks: true,
    forceExit: true,
    coverageProvider: "v8",
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    testMatch: ["**/__tests__/**/*[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    transform: {
        "^.\\.(ts|tsx)$": "ts-jest",
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
};