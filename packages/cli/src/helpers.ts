/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';

export class CustomError extends Error {
  get name(): string {
    return this.constructor.name;
  }
}

export class ExitCodeError extends CustomError {
  readonly code: number;

  constructor(code: number, command?: string) {
    if (command) {
      super(`Command '${command}' exited with code ${code}`);
    } else {
      super(`Child exited with code ${code}`);
    }
    this.code = code;
  }
}

export function exitWithError(error: Error): never {
  if (error instanceof ExitCodeError) {
    process.stderr.write(`\n${chalk.red(error.message)}\n\n`);
    process.exit(error.code);
  } else {
    process.stderr.write(`\n${chalk.red(`${error}`)}\n\n`);
    process.exit(1);
  }
}
export function lazy(
  getActionFunc: () => Promise<(...args: any[]) => Promise<unknown>>
): (...args: any[]) => Promise<void> {
  return async (...args: any[]) => {
    try {
      const actionFunc = await getActionFunc();
      await actionFunc(...args);

      process.exit(0);
    } catch (error) {
      exitWithError(error);
    }
  };
}
