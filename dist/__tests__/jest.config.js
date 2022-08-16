"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const alias_hq_1 = __importDefault(require("alias-hq"));
exports.default = async () => {
    return {
        verbose: true,
        transform: {
            "\\.[jt]sx?$": [
                "esbuild-jest",
                {
                    loaders: {
                        ".spec.js": "jsx",
                        ".js": "jsx",
                    },
                },
            ],
        },
        /// This will resolve any tsconfig.compilerOptions.paths
        moduleNameMapper: alias_hq_1.default.get("jest"),
        testPathIgnorePatterns: ["/node_modules/", "/dist/", "/types/"],
        moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    };
};
//   const hq = require('alias-hq')
// module.exports = {
//     preset: 'ts-jest/presets/js-with-ts',
//     testEnvironment: 'jsdom',
//     transform: {
//         "\\.[jt]sx?$": ['esbuild-jest', {
//             loaders: {
//                 '.spec.js': 'jsx',
//                 '.js': 'jsx'
//             }
//         }
//         ]
//     },
//     moduleNameMapper: hq.get('jest'),
//     testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/'],
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
// };
// module.exports = {
//     globals: {
//       'ts-jest': {
//         tsconfig: 'tsconfig.spec.json',
//         isolatedModules: true,
//       },
//     },
//     collectCoverageFrom: ['src/**/*.ts'],
//     modulePathIgnorePatterns: ['examples/.*', 'website/.*'],
//     setupFilesAfterEnv: ['<rootDir>/src/__helpers__/setup-jest.ts'],
//     snapshotSerializers: [require.resolve('jest-snapshot-serializer-raw')],
//     testPathIgnorePatterns: ['src/__mocks__/*', '/node_modules/', '/examples/', '/e2e/.*/__tests__', '\\.snap$'],
//     transform: {
//       '^.+.tsx?$': '<rootDir>/legacy.js',
//     },
//     coverageProvider: 'v8',
//   }
//# sourceMappingURL=jest.config.js.map