import { Command } from 'commander';

import { lazy } from '../../helpers';

export function registerGenerateCommands(program: Command) {
  program
    .command('generate')
    .description('Generate specific schematic')
    .option('-n, --name <name>', 'Name of the generated schematic')
    .option(
      '-t, --type <type>',
      'Specify type name can be one of the followings "controller", "module", "service"'
    )
    .option('-f, --force', 'Force create schematics even with errors')
    .option('--language <language>', 'Language can be ts or js')
    .option(
      '--folder <folder>',
      'Choose folder where schematics will be generated default is src/app'
    )
    .option(
      '--dry-run',
      'Dry run the command to see if the folder structure will be correct'
    )
    .option(
      '--spec',
      'Whether or not to create .spec tests when creating schematics'
    )
    .action(lazy(() => import('./generate').then((m) => m.default)));
}
