lint:
	npx eslint .

make jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest file1.json file2.json

test:
	npm test