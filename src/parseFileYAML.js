import yaml from 'js-yaml';
import fs from 'node:fs';

const parseFileYAML = (filepath) => {
  const yamlFile = fs.readFileSync(filepath, 'utf8');
  const loadedYaml = yaml.load(yamlFile);
  //console.log(`loadedYaml= ${JSON.stringify(loadedYaml)}`);
  //console.log(`loadedYaml typeof= ${typeof loadedYaml}`);
  //const yamlAsJSON = JSON.stringify(loadedYaml, null, 2);
  //return JSON.parse(yamlAsJSON);
  const yamlAsJSON = loadedYaml;
  return yamlAsJSON;
};

export default parseFileYAML;
