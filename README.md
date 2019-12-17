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
* [Optional Technologies](#optional-technologies)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g wvat
$ wvat COMMAND
running command...
$ wvat (-v|--version|version)
wvat/1.4.0 linux-x64 node-v10.16.3
$ wvat --help [COMMAND]
USAGE
  $ wvat COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wvat about [COMMAND]`](#wvat-about-command)
* [`wvat analyse DOMAIN`](#wvat-analyse-domain)
* [`wvat crawl DOMAIN`](#wvat-crawl-domain)
* [`wvat cves TECHNOLOGY`](#wvat-cves-technology)
* [`wvat error-codes`](#wvat-error-codes)
* [`wvat exploits CVE`](#wvat-exploits-cve)
* [`wvat help [COMMAND]`](#wvat-help-command)
* [`wvat inspect URL`](#wvat-inspect-url)
* [`wvat update-cve-cache`](#wvat-update-cve-cache)
* [`wvat whois DOMAIN`](#wvat-whois-domain)

## `wvat about [COMMAND]`

Describes WVAT and its functionalities

```
USAGE
  $ wvat about [COMMAND]

ARGUMENTS
  COMMAND  name of the command to obtain its description, args, flags and examples

EXAMPLES
  about
  about whois
```

_See code: [src/commands/about.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/about.js)_

## `wvat analyse DOMAIN`

Test commmand description

```
USAGE
  $ wvat analyse DOMAIN

ARGUMENTS
  DOMAIN  domain to search subdomains

OPTIONS
  -c, --config=config
      Wvat config json file path
      Imports a json file with the following fields:
           "allow_data_reporting"[default: false] - Allows us to collect information on error
           "webtech_command"[default: null] - How to call webtech
           "amass_path"[default: "bin/amass"] - path to amass executable

  -d, --depth=depth
      [default: 2] Maximum page crawling depth

  -g, --graph
      Generate a graph of subdomains

  -j, --noCveCache
      Search without using local CVE cache

  -k, --crawlingTimeout=crawlingTimeout
      Subdomains crawling timeout

  -n, --noCrawlingCache
      Perform page crawling without using cache

  -t, --timeout=timeout
      Maximum application execution time (in seconds)

  -u, --updateCveCache
      Force update the local CVE cache

  -v, --verbose
      Verbose Mode (outputs all messages to screen)

  -w, --whitelist=whitelist
      Text file with subdomains to analyze

EXAMPLES
  analyse https://www.google.com
  analyse https://www.youtube.com -d 2 --verbose
  analyse https://www.github.com -t 10 --noCveCache --noCrawlingCache
```

_See code: [src/commands/analyse.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/analyse.js)_

## `wvat crawl DOMAIN`

Searches for all subdomains for a given domain

```
USAGE
  $ wvat crawl DOMAIN

ARGUMENTS
  DOMAIN  domain to search subdomains

OPTIONS
  -c, --config=config
      Wvat config json file path
      Imports a json file with the following fields:
           "allow_data_reporting"[default: false] - Allows us to collect information on error
           "webtech_command"[default: null] - How to call webtech
           "amass_path"[default: "bin/amass"] - path to amass executable

  -d, --depth=depth
      [default: 2] Maximum page crawling depth

  -g, --graph
      Generate a graph of subdomains

  -k, --crawlingTimeout=crawlingTimeout
      Subdomains crawling timeout

  -n, --noCrawlingCache
      Perform page crawling without using cache

  -t, --timeout=timeout
      Maximum application execution time (in seconds)

  -v, --verbose
      Verbose Mode (outputs all messages to screen)

  -w, --whitelist=whitelist
      Text file with subdomains to analyze
```

_See code: [src/commands/crawl.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/crawl.js)_

## `wvat cves TECHNOLOGY`

Searches CVEs for a given technology

```
USAGE
  $ wvat cves TECHNOLOGY

ARGUMENTS
  TECHNOLOGY  technology to search CVEs

OPTIONS
  -c, --config=config
      Wvat config json file path
      Imports a json file with the following fields:
           "allow_data_reporting"[default: false] - Allows us to collect information on error
           "webtech_command"[default: null] - How to call webtech
           "amass_path"[default: "bin/amass"] - path to amass executable

  -d, --depth=depth
      [default: 2] Maximum page crawling depth

  -g, --graph
      Generate a graph of subdomains

  -j, --noCveCache
      Search without using local CVE cache

  -k, --crawlingTimeout=crawlingTimeout
      Subdomains crawling timeout

  -n, --noCrawlingCache
      Perform page crawling without using cache

  -t, --timeout=timeout
      Maximum application execution time (in seconds)

  -u, --updateCveCache
      Force update the local CVE cache

  -v, --verbose
      Verbose Mode (outputs all messages to screen)

  -w, --whitelist=whitelist
      Text file with subdomains to analyze

EXAMPLES
  cves "React Native" --noCveCache
  cves "Windows Server" --updateCveCache
```

_See code: [src/commands/cves.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/cves.js)_

## `wvat error-codes`

Displays the meaning of the possible error codes generated by the tool

```
USAGE
  $ wvat error-codes
```

_See code: [src/commands/error-codes.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/error-codes.js)_

## `wvat exploits CVE`

Searches known exploits for a given CVE

```
USAGE
  $ wvat exploits CVE

ARGUMENTS
  CVE  CVE to search know exploits
```

_See code: [src/commands/exploits.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/exploits.js)_

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

## `wvat inspect URL`

Analyses a given webpage and displays its technologies

```
USAGE
  $ wvat inspect URL

ARGUMENTS
  URL  Webpage URL

OPTIONS
  -c, --config=config    Wvat config json file path
                         Imports a json file with the following fields:
                         "allow_data_reporting"[default: false] - Allows us to collect information on error
                         "webtech_command"[default: null] - How to call webtech
                         "amass_path"[default: "bin/amass"] - path to amass executable

  -t, --timeout=timeout  Maximum application execution time (in seconds)

  -v, --verbose          Verbose Mode (outputs all messages to screen)
```

_See code: [src/commands/inspect.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/inspect.js)_

## `wvat update-cve-cache`

Updates local CVE cache file

```
USAGE
  $ wvat update-cve-cache
```

_See code: [src/commands/update-cve-cache.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/update-cve-cache.js)_

## `wvat whois DOMAIN`

Searches for network information for a given domain

```
USAGE
  $ wvat whois DOMAIN

ARGUMENTS
  DOMAIN  domain to obtain network information

OPTIONS
  -c, --config=config    Wvat config json file path
                         Imports a json file with the following fields:
                         "allow_data_reporting"[default: false] - Allows us to collect information on error
                         "webtech_command"[default: null] - How to call webtech
                         "amass_path"[default: "bin/amass"] - path to amass executable

  -t, --timeout=timeout  Maximum application execution time (in seconds)

  -v, --verbose          Verbose Mode (outputs all messages to screen)

EXAMPLES
  whois google.com
  whois youtube.com --verbose
```

_See code: [src/commands/whois.js](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/src/commands/whois.js)_
<!-- commandsstop -->
# Optional Technologies
<!-- optionaltechnologies -->

## Webtech

In order to analyse the technologies of a webpage using Webtech, it's required to install it's python package. 

Firstly ensure that both [Python 3](https://www.python.org/downloads/) and [pip](https://pip.pypa.io/en/stable/installing/) are already installed.

Then just use pip to install it:
````
pip install webtech
````

Alternatively, download and install from the [source code](https://github.com/ShielderSec/webtech).

Then change the [configuration file](https://gitlab.com/feup-tbs/ldso1920/t2g1/blob/master/wvat-config.json) to enable Webtech usage:
```
"webtech_command": "webtech"
```
* The `webtech_command` is the Webtech's console command. The default value from the pip installation is `webtech`.

<!-- optionaltechnologiesstop -->
