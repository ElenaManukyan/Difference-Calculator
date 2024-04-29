### Hexlet tests and linter status:
[![Actions Status](https://github.com/SierraMoiseevna/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/SierraMoiseevna/frontend-project-46/actions)
<a href="https://codeclimate.com/github/ElenaManukyan/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/567e889cf3a5d076d28d/maintainability" /></a>
![example workflow](https://github.com/ElenaManukyan/frontend-project-46/actions/workflows/gendiff.yml/badge.svg)
<a href="https://codeclimate.com/github/ElenaManukyan/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/567e889cf3a5d076d28d/test_coverage" /></a>
# Description:
This console utility can calculate difference between 2 structures of data.
## Opportunities of the utility:
* Support for different input formats: yaml, json;
* Generating a report in the form of plain text, stylish and json;
## Installation:
`make install`
## How to use:
`node bin/genDiffMain.js -h

  Usage: gendiff [options] <filepath1> <filepath2>

  Compares two configuration files and shows a difference.

  Options:
    -V, --version        output the version number
    -f, --format [type]  output format
    -h, --help           output usage information`
## Usage examples:
### Creating difference between 2 flat .json files:
<a href="https://asciinema.org/a/653783" target="_blank"><img src="https://asciinema.org/a/653783.svg" /></a>
### Creating difference between 2 flat .yml files:
<a href="https://asciinema.org/a/653784" target="_blank"><img src="https://asciinema.org/a/653784.svg" /></a>
### Creating difference between 2 nested .json files:
<a href="https://asciinema.org/a/653785" target="_blank"><img src="https://asciinema.org/a/653785.svg" /></a>
### Creating difference between 2 nested .yml files:
<a href="https://asciinema.org/a/653787" target="_blank"><img src="https://asciinema.org/a/653787.svg" /></a>
### Creating difference between 2 nested .json files with '--format' parameter:
<a href="https://asciinema.org/a/653786" target="_blank"><img src="https://asciinema.org/a/653786.svg" /></a>
### Creating difference between 2 nested .yml files with '--format' parameter:
<a href="https://asciinema.org/a/653788" target="_blank"><img src="https://asciinema.org/a/653788.svg" /></a>
### Creating difference between 2 nested .yml files with '--format' parameter = 'json':
<a href="https://asciinema.org/a/653945" target="_blank"><img src="https://asciinema.org/a/653945.svg" /></a>
