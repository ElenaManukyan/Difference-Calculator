import yaml from 'js-yaml';
import fs from 'node:fs';

const parseFileYAML = (filepath) => {
  const yamlFile = fs.readFileSync(filepath, 'utf8');
  const loadedYaml = yaml.load(yamlFile);
  const yamlAsJSON = JSON.stringify(loadedYaml, null, 2);
  return JSON.parse(yamlAsJSON);
};

export default parseFileYAML;
