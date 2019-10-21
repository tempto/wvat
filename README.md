# T2G1 - Web Vulnerability Assessment Tool

## Team

- Ângelo Teixeira - up201606516@fe.up.pt, **Surrogate Product Owner (SPO)**
- Bruno Sousa, up201604145@fe.up.pt
- Claudio Lemos, up201603542@fe.up.pt
- João Lemos, up201000660@fe.up.pt
- João Maduro, up201605219@fe.up.pt
- Miguel Carvalho, up201605757@fe.up.pt
- Rui Alves, rui.pedro.alves@fe.up.pt, **Team Leader (TL)**
- Tiago Ribeiro, up201605619@fe.up.pt

## Product Owners

- João Pedro Dias, jpmdias@fe.up.pt
- Pedro Sousa, pedrodanielsousa1@gmail.com
- Luís Catarino, luiscatarino@adamantsec.com

## Happiness Meter

The project's happiness meter is available in [this Spreadsheet](https://docs.google.com/spreadsheets/d/1f-j3I1IS-ggwGQmMnuANsPem4z-6J0BrLMBvI6Y8bHI/edit?ts=5d8a3d9d#gid=0).

## Project setup and development

### Installing dependencies

In order to setup the project, install all the project's dependencies:

```
npm install
```

### Linting

The project is developed using the `ECMAScript 2018` standards. To lint the developed code, run: 

```
npm run lint
```

To fix all the automatically fixable errors, run:

```
npm run lint-fix
```

### Testing

For unit test development, the `jest` library is being used. To run all test suites, run:

```
npm test
```

In order to perform coverage analysis, building a detailed report, run:

```
npm run test-coverage
```

## Staging and Production Bundles

When built, the bundle is uploaded to [Dropbox](https://www.dropbox.com/home/LDSO%20T2G1) using the `upload_dropbox.sh` script (available in the project's root folder). This folder is shared amongst the project's developers and Product owners.

The `staging` bundle is being built and auto-deployed to dropbox's `dev` folder when commits are merged to the `develop` branch.

The `production` bundle is being built and auto-deployed to dropbox's `prod` folder when commits are merged to the `master` branch.

The built bundle features executables for multiple operating systems (Windows and Unix-based) and architectures (x64 and x86).

### Running the Tool from the bundle

#### Windows

To run the tool, simply run the executable file. Executing it will display help on how to run the different available features.

#### Unix-based systems 

The bundle features an executable file (`wvat`) under the `bin` folder. Executing it will display help on how to run the different available features.

## WVAT

wvat
====

Web Vulnerability Assessment Tool

<!-- toc -->
* [T2G1 - Web Vulnerability Assessment Tool](#t2g1---web-vulnerability-assessment-tool)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g wvat
$ wvat COMMAND
running command...
$ wvat (-v|--version|version)
wvat/0.0.0 linux-x64 node-v10.16.3
$ wvat --help [COMMAND]
USAGE
  $ wvat COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wvat hello`](#wvat-hello)
* [`wvat help [COMMAND]`](#wvat-help-command)
* [`wvat test`](#wvat-test)

## `wvat hello`

Describe the command here

```
USAGE
  $ wvat hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/hello.js)_

## `wvat help [COMMAND]`

display help for wvat

```
USAGE
  $ wvat help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `wvat test`

Test commmand description

```
USAGE
  $ wvat test

OPTIONS
  -n, --test1=test1  test flag 1
  -t, --test2=test2  test flag 2
```

_See code: [src/commands/test.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/test.js)_
<!-- commandsstop -->
