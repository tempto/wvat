# Changelog

## Release 3 - November 2019 Week 4 (version 1.2)

Downloads: [Windows](https://www.dropbox.com/home/LDSO%20T2G1/prod/dist/win) | [Unix-based Systems](https://www.dropbox.com/home/LDSO%20T2G1/prod/dist/wvat-v1.2.0)

Welcome to the November 2019 Week 4 release of *WVAT - Web Vulnerability Assessment Tool*. This patch's key highlights include:

- CLI user experience enhancements
- Crawling web pages of a Domain
- Caching web pages crawling results to enhance future analysis
- Enhanced CVE searching results and reduce waiting time by introducing CVE Caching
- Improved exploits results for CVEs, by adding more exploit databases alternatives

### Closed Issues

#### Feature-related Issues

- 

#### Technical Issues

- 

### Commit History

- 

## Release 2 - November 2019 Week 2 (version 1.1)

Downloads: [Windows](https://www.dropbox.com/home/LDSO%20T2G1/prod/dist/win) | [Unix-based Systems](https://www.dropbox.com/home/LDSO%20T2G1/prod/dist/wvat-v1.1.0)

Welcome to the November 2019 Week 2 release of *WVAT - Web Vulnerability Assessment Tool*. This patch's key highlights include:

- CLI user experience enhancements
- Analyse technologies present in a given Web page
- CLI error codes description improvement
- Improved tool's overal testing techniques
- Added Sentry for error logging and monitoring

### Closed Issues

#### Feature-related Issues

- [Technologies used in a Page](#22)
    - [Extract technologies and versions from a Webpage](#49)
    - [Implement Tech-listing Unit Tests](#50)
- [Application exit codes system](#11)
    - [Define application return/error codes system](#44)
- [Application error codes listing command](#12)
    - [Create a command to show errors info (error codes meaning)](#71)
    - [Setup oclif/cli-ux to beautify cli output](#72)
- [Application timeout](#5)
    - [Setup timeout handler when respective flag is checked](#40)
    - [Implement CLI timeout Unit Tests](#41)
- [Verbose mode](#6)
    - [Setup logger for verbose setting flag](#42)
    - [Implement Verbose setting Unit Tests](#43)

#### Technical Issues

- [Add test Coverage and Mutation to CI](#91)
- [Bumping of Versions/timestamp on deliverables](#90)
- [Setup property-based tests with fast-check](#82)
- [Setup Sentry](#93)
- [Setup Code Quality analysis](#92)

### Commit History

- [Updated existing commands to inherit from the new decorator base command](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/02112f94)
- [Added sentry exception handling](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/b5cfcc4b)
- [Added sentry setup](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/ca71158b)
- [Updated code_quality job to allow failure](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/ac2ba061)
- [Added code quality automatic analysis to CI pipeline](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/abee6aad)
- [Added javascript code quality analysis using jshint](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/01306c3e)
- [Formatted files according to eslint rules ](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/d36001bb)
- [Added logger and initCommand unit tests](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/9278c6f4)
- [Added ability to delete logger singleton](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/07992cf7)
- [Changed flags name pattern and array](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/8568f3ec)
- [Moved verbose flag logic to Logger class](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/cda80050)
- [Created logger singleton and common settings file](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/5e5b1dfe)
- [Added file for flags and log4js dependency](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/6fd347f6)
- [Measured Timeout in seconds](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/4c6b7e77)
- [Tried to test function timeout without success](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/f7cd2680)
- [Created TimeoutHandler and added TIMEOUT flag](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/7192ace6)
- [Added file for flags and log4js dependency](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/1243dcd1)
- [Added 'error-codes' command to list the possible error codes](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/5e3d97cc)
- [Added cli-ux module to print tables in the CLI](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/bf16b6f7)
- [Added analyze commamd](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/4a51143d)
- [Added Tech Analyzer test](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/e3effcff)
- [Added webpage technology analysis](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/be208882)
- [Added errors centralized file](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/145697fd)
- [Updated test suites with chai BDD syntax](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/2da5e5e0)
- [Added Chai module for BDD testing](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/a9fde9ab)

## Release 1 - October 2019 Week 4 (version 1.0)

Downloads: [Windows](https://www.dropbox.com/home/LDSO%20T2G1/prod/dist/win) | [Unix-based Systems](https://www.dropbox.com/home/LDSO%20T2G1/prod/dist/wvat-v1.0.0)

Welcome to the October 2019 Week 4 release of *WVAT - Web Vulnerability Assessment Tool*. This patch's key highlights include:

- User-friendly CLI application setup to access other features;
- Thorough help section of tool's usage and specific commands usage;
- Find *CVE*s (Common Vulnerabilities and Exposures) for a given technology
- Find known *Exploits* for a given *CVE*

### Closed Issues

#### Feature-related Issues

- [Application List of Settings](#3)
    - [Setup NodeJS CLI framework](#37)
    - [Setup Configuration state accessible to all the modules](#38)
    - [Implement CLI settings Unit Tests](#39)
- [Finding CVEs for a given Technology](#24)
    - [Get CVEs from CVEs website endpoint and parse CVEs list from HTML](#51)
    - [Implement CVE list parsing Unit Tests](#52)
- [Obtaining exploits link for a given CVE](#28)
    - [Build link to exploits list (from Exploit-db) with CVE query](#58)
    - [Implement link to exploits list Unit Tests](#59)
- [Help Section acces](#4)
    - [Show the help section when running `wvat help`](#70)
- [Verify current Tool Version](#10)

#### Technical Issues

- [Research Wappalyzer and alternatives in order to list existing techs in a web page](#48)
- [Configure CI Lint Job](#66)
- [Configure CI Audit Job](#67)
- [Configure CI Test Job](#68)
- [Configure JS linting](#65)
- [Configure tool 'build' script for building the tool deliverable bundle](#69)
- [Setup mutation testing with stryker](#81)