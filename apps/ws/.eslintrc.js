/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@echo/eslint-config/server.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
}
