#! /usr/bin/env node

import { program } from 'commander';

import { commands } from './commands';

export const main = (argv: string[]) => {
  program.name('rhtml').version('0.0.1');

  commands.map((command) => command(program));

  program.on('command:*', () => {
    console.log();
    console.log(`Invalid command: ${program.args.join(' ')}`);
    console.log();
    program.outputHelp();
    process.exit(1);
  });

  program.parse(argv);
};

/* If command is executed without arguments show help page */
if (process.argv.length === 2) {
  process.argv.push('-h');
}

main(process.argv);
