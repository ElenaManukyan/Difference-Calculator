# Difference Calculator (gendiff)

### Tests and code analysis:
[![Actions Status](https://github.com/SierraMoiseevna/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/SierraMoiseevna/frontend-project-46/actions)
<a href="https://codeclimate.com/github/ElenaManukyan/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/c6b14fa220654c350868/maintainability" /></a>
![example workflow](https://github.com/ElenaManukyan/frontend-project-46/actions/workflows/gendiff.yml/badge.svg)
<a href="https://codeclimate.com/github/ElenaManukyan/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/c6b14fa220654c350868/test_coverage" /></a>

**Difference Calculator** is a CLI utility for comparing two data structures. It identifies and displays the differences between them in various formats. This tool is widely used in real-world scenarios, such as tracking configuration changes or analyzing test results.

## Features

- Supports **JSON** and **YAML** input formats.
- Generates output in three formats:
  - **Stylish** (tree-like structure)
  - **Plain text** (detailed textual description)
  - **JSON** (structured data for further processing)

---

## Requirements
Node.js >= 14

## Installation

1. Make sure you have Node.js version 14 or higher installed.
2. Clone the repository:
   ```bash
   git clone https://github.com/ElenaManukyan/Difference-Calculator.git
   ```
3. Navigate to the project directory:
   ```bash
   cd Difference-Calculator
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

## Development and Testing
### Linting:
The project uses ESLint with Airbnb's coding standards. To lint the code, run:
```bash
npx eslint .
```
or:
```bash
make lint
```
### Testing:
Tests are written using the Jest framework. To run all tests, execute:
```bash
npm test
```
or:
```bash
make test
```
### Formatting:
To ensure consistent code style, use Prettier:
```bash
npx prettier --write .
```

## Usage
The gendiff command compares two files and outputs their differences.
```
gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version          output the version number
  -f, --format <format>  output format (default: "stylish")
  -h, --help             display help for command
```

## Usage examples:
### Creating difference between 2 flat .json files:
<a href="https://asciinema.org/a/wFWF5AqXjojXDuEojlMvfCECk" target="_blank"><img src="https://asciinema.org/a/wFWF5AqXjojXDuEojlMvfCECk.svg" /></a>
### Creating difference between 2 flat .yml files:
<a href="https://asciinema.org/a/q4Xka24rRLdQ9zNwl9homl9IH" target="_blank"><img src="https://asciinema.org/a/q4Xka24rRLdQ9zNwl9homl9IH.svg" /></a>
### Creating difference between 2 nested .json files:
<a href="https://asciinema.org/a/Zw9pZ5YBVlFb0yrgsWjRLlTqx" target="_blank"><img src="https://asciinema.org/a/Zw9pZ5YBVlFb0yrgsWjRLlTqx.svg" /></a>
### Creating difference between 2 nested .yml files:
<a href="https://asciinema.org/a/AhsxXTzZ2hWLuwpTFB6UJZY3g" target="_blank"><img src="https://asciinema.org/a/AhsxXTzZ2hWLuwpTFB6UJZY3g.svg" /></a>
### Creating difference between 2 nested .json files with '--format plain' parameter:
<a href="https://asciinema.org/a/Hpy9BeZuExat5NBKhNcTEIg5h" target="_blank"><img src="https://asciinema.org/a/Hpy9BeZuExat5NBKhNcTEIg5h.svg" /></a>
### Creating difference between 2 nested .yml files with '--format plain' parameter:
<a href="https://asciinema.org/a/jgRLQdWb2JdAEqMMVm82GMWvj" target="_blank"><img src="https://asciinema.org/a/jgRLQdWb2JdAEqMMVm82GMWvj.svg" /></a>
### Creating difference between 2 nested .json files with '--format json' parameter:
<a href="https://asciinema.org/a/NoEleeTrbm6oqmjppzvpS4rwm" target="_blank"><img src="https://asciinema.org/a/NoEleeTrbm6oqmjppzvpS4rwm.svg" /></a>
### Creating difference between 2 nested .yml files with '--format json' parameter:
<a href="https://asciinema.org/a/5y4XCnqantyqQO5YPWFjxBdAW" target="_blank"><img src="https://asciinema.org/a/5y4XCnqantyqQO5YPWFjxBdAW.svg" /></a>
