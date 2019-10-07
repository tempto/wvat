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

## Hapiness Meter
[Link to Spreadsheet](https://docs.google.com/spreadsheets/d/1f-j3I1IS-ggwGQmMnuANsPem4z-6J0BrLMBvI6Y8bHI/edit?ts=5d8a3d9d#gid=0)

## WVAT

wvat
====

Web Vulnerability Assessment Tool

<!-- toc -->
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

_See code: [src/commands/hello.js](https://github.com/feup-tbs/wvat/blob/v0.0.0/src/commands/hello.js)_

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

_See code: [src/commands/test.js](https://github.com/feup-tbs/wvat/blob/v0.0.0/src/commands/test.js)_
<!-- commandsstop -->
