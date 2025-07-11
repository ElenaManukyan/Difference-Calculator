🔍 # Difference Calculator (gendiff)   

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Actions Status](https://github.com/SierraMoiseevna/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/SierraMoiseevna/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/c6b14fa220654c350868/maintainability)](https://codeclimate.com/github/ElenaManukyan/frontend-project-46/maintainability)
![example workflow](https://github.com/ElenaManukyan/frontend-project-46/actions/workflows/gendiff.yml/badge.svg)
<a href="https://codeclimate.com/github/ElenaManukyan/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/c6b14fa220654c350868/test_coverage" /></a>

A CLI tool for comparing files (JSON/YAML) and displaying differences in multiple formats.

🌟 ## Features

- Supports JSON and YAML input formats
- Three output formats:
  - **Stylish** (default) - colored tree-like output
  - **Plain** - clean textual description
  - **JSON** - machine-readable format

---

⚙️ ## Installation

```bash
# Clone repository
git clone https://github.com/ElenaManukyan/Difference-Calculator.git
cd Difference-Calculator

# Install dependencies
npm install

# Install globally (optional)
npm install -g .
```

🛠 ## Development and Testing
```bash
# Run linter
npx eslint .
make lint

# Run tests
npm test
make test

# Run formatter
npx prettier --write .
```  

🚀 ## Usage
```
gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version          output the version number
  -f, --format <format>  output format (default: "stylish")
  -h, --help             display help for command
```  
📋 ## Examples
### Compare flat files
```
# JSON files
gendiff file1.json file2.json

# YAML files
gendiff file1.yml file2.yml
```  
### Compare nested structures
```
# With plain format
gendiff --format plain nested1.json nested2.json

# Get JSON output
gendiff --format json nested1.yml nested2.yml
```

🎥 ## Demo:
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
