lint:
	npx eslint --config eslint.config.js .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

install:
	npm ci

test-yml:
	node src/parsers.js

gendiff:
	node bin/genDiffMain.js

