# Changelog

## October 2019 Week 4 (version 1.0)

Downloads: [Windows](https://www.dropbox.com/home/LDSO%20T2G1/prod/dist/win) | [Unix-based Systems](https://www.dropbox.com/home/LDSO%20T2G1/prod/dist/wvat-v1.0.0)

Welcome to the October 2019 Week 4 release of *WVAT - Web Vulnerability Assessment Tool*. This patch's key highlights include:

- User-friendly CLI application setup to access other features;
- Thorough help section of tool's usage and specific commands usage;
- Find *CVE*s (Common Vulnerabilities and Exposures) for a given technology
- Find known *Exploits* for a given *CVE*

### Key Features

#### Help Section

The help section can be consulted using the `help` command:

![WVAT help Command](https://user-images.githubusercontent.com/25830462/67376426-016a3c00-f57c-11e9-87e7-c2cdf403c1a6.jpg)

#### Searching *CVE*s for a Technology

The *CVE* searching can be used with the `cves <technology>` command:

![WVAT cves Command](https://user-images.githubusercontent.com/25830462/67376419-ffa07880-f57b-11e9-8b41-5de531808e27.jpg)

#### Searching *Exploits* for a *CVE*

The *Exploits* searching can be used with the `exploits <cve>` command:

![WVAT exploits Command](https://user-images.githubusercontent.com/25830462/67376417-ff07e200-f57b-11e9-83e8-e93ad708a305.jpg)

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

## November 2019 Week 2 (version 2.0)

Downloads: [Windows](https://www.dropbox.com/home/LDSO%20T2G1/prod/dist/win) | [Unix-based Systems](https://www.dropbox.com/home/LDSO%20T2G1/prod/dist/wvat-v2.0.0)

Welcome to the November 2019 Week 2 release of *WVAT - Web Vulnerability Assessment Tool*. This patch's key highlights include:

- CLI user experience enhancements
- Analyse technologies present in a given Web page
- CLI error codes description improvement
- Improved tool's overal testing techniques
- Added Sentry for error logging and monitoring

### Key Features

#### Analyse page technologies

The *Technologies Analysis* can be used with the `analyze <endpoint>` command:

![WVAT analyze Command](https://user-images.githubusercontent.com/25830462/68221531-765c5d80-ffe1-11e9-8a92-d0ca32bb640f.jpg)

#### Application Error Codes

The full *Application Error Codes* explanation can be obtained with the `error-codes` command:

![WVAT error-codes Command](https://user-images.githubusercontent.com/25830462/68222045-4cf00180-ffe2-11e9-8f65-6c1bade4fcd9.jpg)

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
