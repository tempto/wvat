# WVAT - Web Vulnerability Assessment Tool

*WVAT* is an open-source CLI tool to analyse a domain, its subdomains and respective pages, extracting the used technologies to find their vulnerabilities in order to cross-reference them with known exploits.

To contribute, please refer to [Contributing](https://github.com/tempto/wvat/blob/master/CONTRIBUTING.md).

## Usage 
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

## Commands
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

_See code: [src/commands/about.js](https://github.com/tempto/wvat/tree/master/src/commands/about.js)_

## `wvat analyse DOMAIN`

Generate full domain report

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

_See code: [src/commands/analyse.js](https://github.com/tempto/wvat/tree/master/src/commands/analyse.js)_

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

_See code: [src/commands/crawl.js](https://github.com/tempto/wvat/tree/master/src/commands/crawl.js)_

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

_See code: [src/commands/cves.js](https://github.com/tempto/wvat/tree/master/src/commands/cves.js)_

## `wvat error-codes`

Displays the meaning of the possible error codes generated by the tool

```
USAGE
  $ wvat error-codes
```

_See code: [src/commands/error-codes.js](https://github.com/tempto/wvat/tree/master/src/commands/error-codes.js)_

## `wvat exploits CVE`

Searches known exploits for a given CVE

```
USAGE
  $ wvat exploits CVE

ARGUMENTS
  CVE  CVE to search know exploits
```

_See code: [src/commands/exploits.js](https://github.com/tempto/wvat/tree/master/src/commands/exploits.js)_

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

_See code: [src/commands/inspect.js](https://github.com/tempto/wvat/tree/master/src/commands/inspect.js)_

## `wvat update-cve-cache`

Updates local CVE cache file

```
USAGE
  $ wvat update-cve-cache
```

_See code: [src/commands/update-cve-cache.js](https://github.com/tempto/wvat/tree/master/src/commands/update-cve-cache.js)_

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

_See code: [src/commands/whois.js](https://github.com/tempto/wvat/tree/master/src/commands/whois.js)_
<!-- commandsstop -->
