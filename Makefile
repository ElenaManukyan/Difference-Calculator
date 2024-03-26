lint:
	npx eslint .

make jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest
