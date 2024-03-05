import { AbstractRunner } from './abstract.runner';
import { GenerateOptions } from './types';

export default (options: GenerateOptions) => {
  const {
    dryRun = false,
    folder = 'src/app',
    force = false,
    internalArguments = '',
    language = 'ts',
    name = 'app',
    schematicsName = '@rhtml/schematics',
    spec = false,
    type = 'module',
  } = options;
  return new AbstractRunner('npx schematics').run(
    `${schematicsName}:${type} --name=${name} --force=${force} --dryRun=${dryRun} ${
      spec ? '--spec' : ''
    } --language='${language}' --sourceRoot='${folder}' ${internalArguments}`
  );
};
