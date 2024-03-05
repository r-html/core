# @rhtml/cli

#### Installation

```bash
npm i @rhtml/cli -g
```

#### Usage

##### Generate schematic can be 'module', 'controller', 'service'

```bash
rhtml generate --name test --type module
```

##### General Help

```bash
Usage: rhtml [options] [command]

Options:
  -V, --version       output the version number
  -h, --help          display help for command

Commands:
  generate [options]  Generate specific schematic
  help [command]      display help for command
```

##### Generate Help

```bash
Usage: rhtml generate [options]

Generate specific schematic

Options:
  -n, --name <name>      Name of the generated schematic
  -t, --type <type>      Specify type name can be one of the followings "controller", "module", "service"
  -f, --force            Force create schematics even with errors
  --language <language>  Language can be ts or js
  --folder <folder>      Choose folder where schematics will be generated default is src/app
  --dry-run              Dry run the command to see if the folder structure will be correct
  --spec                 Whether or not to create .spec tests when creating schematics
  -h, --help             display help for command
```
