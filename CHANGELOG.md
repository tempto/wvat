# Changelog

## Release 5 - December 2019 Week 3 (version 1.4)

Downloads: [Windows](https://www.dropbox.com/sh/z7cwhf3y0v3cwjl/AADHcpxdUunlB0hM_f1u9sVxa/dist/win?dl=0&subfolder_nav_tracking=1) | [Unix-based Systems](https://www.dropbox.com/sh/z7cwhf3y0v3cwjl/AAACbWlNnoyyJ848SFA6F79Xa/dist?dl=0&subfolder_nav_tracking=1)

Welcome to the December 2019 Week 3 release of *WVAT - Web Vulnerability Assessment Tool*. This patch's key highlights include:

- Adding an HTML security analysis report for easy human visualization
- Adding a JSON security analysis report for easy machine parsing
- Integrating support for *Webtech* technologies analysis in the application
- Adding subdomains graph generating to analysis pipeline 
- Introducing the *analyse* command to execute the full analysis pipeline
- Adding several multi-threading optimizations to improve application performance
- Introducing the *about* command with application presentation
- Addressed minor bugs in pages crawling and CVE searching
- Adding support to subdomains crawling whitelist specification

### Closed Issues

#### Feature-related Issues

- [Subdomains crawling Graph](#143)
- [Full analysis pipeline integration command](#136)
- [No-Cache CVE searching standardization](#120)
    - [Standardize CVEs results with and without caching](#120)
    - [Enhance test suite for CVE scraping results](#121)
- [Tool About Command](#146)
- [Subdomain Crawling Whitelist](#14)
    - [Implement function/module to read subdomains whitelist from a file](#138)
    - [Use the subdomains whitelist (from file) to crawl pages (instead of amass)](#139)
    - [Implement tests for subdomains whitelist](#140)

#### Technical Issues

- [Fix parsing error in Webtech output](#151)
- [Fix broken regex exceptions in CVE local cache search](#152)
- [Add CVE links to CVE-MITRE and NIST to both JSON and HTML reports](#153)
- [Fix parsing error in Webtech output](#151)

### Commit History

- ...

------------
------------

## Release 4 - December 2019 Week 1 (version 1.3)

Downloads: [Windows](https://www.dropbox.com/sh/z7cwhf3y0v3cwjl/AADHcpxdUunlB0hM_f1u9sVxa/dist/win?dl=0&subfolder_nav_tracking=1) | [Unix-based Systems](https://www.dropbox.com/sh/z7cwhf3y0v3cwjl/AAACbWlNnoyyJ848SFA6F79Xa/dist?dl=0&subfolder_nav_tracking=1)

Welcome to the December 2019 Week 1 release of *WVAT - Web Vulnerability Assessment Tool*. This patch's key highlights include:

- Application structural refactor
- Test suites enhancement
- Automated acceptance tests
- JSON report artefact presentation
- Manual updating of local cache files options
- Data Reporting is now optional
- Domain Network Information extracting
- Tool configuration JSON file

### Closed Issues

#### Feature-related Issues

- [JSON Report](#33)
    - [Implement saving analysis results (from all the tool's steps) in a JSON file](#60)
    - [Implement JSON file generation Unit Tests](#61)
- [JSON Report creation data](#35)
    - [Perform file saving with a `security_analysis_<timestamp>.json` title format](#62)
    - [Store the analysis timestamp in a field of the JSON content](#63)
    - [Implement report timestamp Unit Tests](#64)
- [CVE cache manual update](#26)
    - [Create a command to manually update the local CVE cache](#113)
- [Domain Network Information](#123)
    - [Investigate node modules that perform network analysis tasks](#125)
    - [Create command to get network information from Domain](#126)
- [HTML Report](#51)
    - [Research way to populate an HTML template with JS variables](#87)
    - [Stylize HTML report](#88)
    - [Create HTML report structure](#89)

#### Technical Issues

- [Create a standardized return for tech analysis sub-modules](#109)
- [Improve tech analysis module test suite](#110)
- [Make sentry logs opt-in](#114)
- [Research about Automated Acceptance Tests tools / modules](#127)
- [Setup automated Acceptance Tests](#128)
- [Add Acceptance Tests automation to CI pipeline](#129)
- [Add 'What Is New' wiki page for Sprint 4](#115)
- [Add 'Product Owner Meeting' page for Sprint 4](#116)
- [Update Changelog for Sprint 4](#117)
- [Add 'Burndown chart and End of project estimate' page for Sprint 4](#118)
- [Add 'Velocity Analysis and Burndown Chart' page for Sprint 4](#119)
- [Tool version bump for the end of Sprint 4](#122)

### Commit History

- [fix: fixed relative paths for bin/ files in subdomain crawler](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/ee3a6658)
- [feat: Added subdomain crawling via amass tool](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/cf2cdda2)
- [feat: Added install script](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/67ba837c)
- [feat: Added go dependency check](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/9204748f)
- [fix: Added jq installation](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/1969403f)
- [fix: Added bundle script to staging too](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/c2894c72)
- [enhancement: Added tables and collapsibles to HTML report](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/7ab8b166)
- [fix: Updated Logger calls](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/b16b2b8e)
- [feat: Added unit testing to HTML report creation](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/f70501ce)
- [fix: Corrected mustache template on the details section of the HTML](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/7e48cab9)
- [feat: Added HTML report generation tests](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/4b452e98)
- [feat: Added HTML report generation module](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/3c037d39)
- [feat: Updated .gitignore with HTML report generated files](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/46bb1e59)
- [feat: Added tool error codes list acceptance test automation](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/58157aa0)
- [feat: Added exit codes acceptance test automation](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/a413bce0)
- [feat: Added tool help acceptance test automation](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/9019f755)
- [devops: Added acceptance tests to CI pipeline](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/067b9093)
- [feat: Added tool version acceptance test automation](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/e841daf0)
- [feat: Added cucumberjs setup for automated acceptance tests](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/569c897c)
- [feat: Added network info module test suite](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/5ee5f613)
- [feat: Added command to get domain network information](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/4ea1f1b4)
- [enhancement: Added iplocation module to extract domain location](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/95045bc1)
- [enhancement: Added domain-ping module to extract more info about domain](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/882c0e8f)
- [feat: Added NetworkInfo module to fetch domain network info](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/e7226f25)
- [enhancement: Add windows 64 bit exe bundle and removed 32 bit exe](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/32827f39)
- [feat: Added Amass path config var](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/d8c87f5a)
- [enhancement: Finished Bundle Script](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/b8e612e5)
- [enhancement: Finished bundle script for x64 architecture](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/77e0299d)
- [feat: Started bundle script](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/b24b1a61)
- [feat: Updated Base Command sentry logging](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/d32dbafe)
- [feat: Added hook to deal with tool config parsing](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/3b8394db)
- [feat: Added utility functions to handle tool config json file](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/2ac12b17)
- [feat: Updated Config object to allow tool configuration](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/5d7f1f22)
- [enhancement: Changed Wappalyser return to standard](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/81f59848)
- [feature: Added TechAnalyser tests](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/461c37b7)
- [enhancement: Changed Wappalyser tests](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/700e5091)
- [enhacement: Updated inspect command](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/319efc7b)
- [feature: TechAnalyser calls multiple tech finders](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/96b9baa4)
- [enhacement: Refactored Wappalyser code](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/0e349442)
- [feat: Added TechAnalyser abstract class](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/77b351f8)
- [feat: Added command to update cve cache](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/2295845e)
- [fix: Updated Logger calls](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/80ca3b69)
- [feat: Added report generation tests](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/79b04edb)
- [feat: Added report generation module](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/e79bf199)
- [feat: Updated .gitignore with report generated files](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/6efaf6ba)
- [fix: Added before script node modules installing to deploy script](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/78002267)
- [fix: Added build dependency to deploy jobs](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/6fb0cbf1)
- [refactor: Separated coverage analysis and mutation into different jobs](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/d09df108)
- [fix: Updated ci config file dependencies](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/244473f0)
- [refactor: Added default command parse implemention](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/ba9fb569)
- [refactor: Updated Logger test suite](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/dcbe05f5)
- [refactor: Updated Logger singleton class](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/9da439f6)
- [refactor: Removed initCommand](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/4595878c)

------------
------------

## Release 3 - November 2019 Week 4 (version 1.2)

Downloads: [Windows](https://www.dropbox.com/sh/z7cwhf3y0v3cwjl/AADHcpxdUunlB0hM_f1u9sVxa/dist/win?dl=0&subfolder_nav_tracking=1) | [Unix-based Systems](https://www.dropbox.com/sh/z7cwhf3y0v3cwjl/AAACbWlNnoyyJ848SFA6F79Xa/dist?dl=0&subfolder_nav_tracking=1)

Welcome to the November 2019 Week 4 release of *WVAT - Web Vulnerability Assessment Tool*. This patch's key highlights include:

- CLI user experience enhancements
- Crawling web pages of a Domain
- Caching web pages crawling results to enhance future analysis
- Enhanced CVE searching results and reduce waiting time by introducing CVE Caching
- Improved exploits results for CVEs, by adding more exploit databases alternatives

### Closed Issues

#### Feature-related Issues

- [Crawling depth specification for the page Crawling process](#16)
    - [Limit the crawling maximum depth](#46)
    - [Implement Crawling-depth Unit Tests](#47)
- [CVE local Caching](#25)
    - [Fetch online CVE list, in csv format, and store it in the local storage](#54)
    - [Implement query system to get CVEs related to a given technology or set of technologies](#56)
    - [Implement CVE local storage Unit Tests](#57)
- [Domain Crawling results Caching](#15)
    - [Store the results of a crawl in a file](#85)
    - [Retrieve previous crawling result from file](#86)
- [Technologies with no version identification](#36)
    - [Extract the number of technologies without version in wappalizer result](#83)
- [Link CVEs to various exploit databases alternatives](#105)
    - [Link known exploits databases links to found CVEs](#78)
    - [Implement Exploits-related Unit Tests](#80)


#### Technical Issues

- [Research Wappalyzer and alternatives in order to list existing techs in a web page](#48)
- [Configure CI Lint Job](#66)
- [Configure CI Audit Job](#67)
- [Configure CI Test Job](#68)
- [Configure JS linting](#65)
- [Configure tool 'build' script for building the tool deliverable bundle](#69)
- [Setup mutation testing with stryker](#81)
- [Improve security checks in CI pipeline](#101)
- [Create Potential Security Vulnerabilities document in the Wiki](#102)
- [Create custom docker image to install pipeline dependencies](#103)
- [Tool version bump for the end of Sprint 3](#104)
- [Update Changelog for Sprint 3](#96)
- [Add 'What Is New' wiki page for Sprint 3](#97)
- [Add 'Velocity Analysis and Burndown Chart' page for Sprint 3](#98)
- [Add 'Burndown chart and End of project estimate' page for Sprint 3](#99)
- [Add 'Product Owner Meeting' page for Sprint 3](#100)
- [Research way to populate an HTML template with JS variables](#87)

### Commit History

- [fix: Updated test suite with Logger changes](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/50bed9e8)
- [fix: Updated crawler to only crawl inside the domain](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/f08ea5a8)
- [fix: Logger level](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/d9be5485)
- [doc: Added Closed Issues and Commit History sections to CHANGELOG](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/8b586b86)
- [doc: Updated sprint 3 CHANGELOG with increment description](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/53e40ec1)
- [refactor: Updated rapid7 exploits building function](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/713c90a4)
- [feat: Added exploits listing to CVEs listing](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/4cf8028d)
- [feat: Added multiple hyperlinks building to the exploits command](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/a20cd835)
- [feat: Added link building for Circl exploits db](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/ecae4bad)
- [feat: Added link building for Rapid7 exploits db](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/46429e9b)
- [refactor: Updated Exploit-DB exploits fetching](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/b7bfbbcf)
- [feat: Added utilities to validate different CVE formats](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/ea1081b2)
- [refactor: Updated ExploitsFetcher module name to Exploit](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/d1acdbe5)
- [fix: Updated flag names due to collisions](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/66358654)
- [feat: Improved CVEs module test suite](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/d3e0422e)
- [feat: Improved utils module test suite](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/9901032c)
- [feat: Updated cves command with caching options](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/b3c6b16a)
- [refactor: Updated CVEListFetcher module name to CVEs](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/44f8ce05)
- [feat: Added local cache entries parsing after search](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/8331a503)
- [feat: Installed csv-parse module](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/b1e2850f)
- [feature: Documented new CVEListFetcher modules documentation](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/3cc5155f)
- [enhancement: Updated CVE Search command to search with an enhanced query regex](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/40d8f540)
- [feat: Added package for CVE searching](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/8e5180d8)
- [feat: Added test command to download cve](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/769acaa7)
- [feat: Added function to store CVEs fil](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/fbb82d38)
- [feat: Added function to parse CVEs fil](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/d345f357)
- [feat: Finished pages crawle](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/0724760e)
- [fix: Fixed Domain Crawle](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/f0015de3)
- [enhancement: Changed domain cache key to handle distinguish multiple depth](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/5a3bb0b7)
- [feat: Added crawling comman](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/f1720a46)
- [fix: Addressed review suggestion](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/4f451176)
- [feat: Added Domain Crawler test](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/88fe8f0f)
- [enhancement: Updated .gitignore to handle node-persist folde](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/8944caf9)
- [feat: Added cache storag](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/547ffb3a)
- [feat: Finished the crawling modul](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/a8486364)
- [feat: Implemented Domain Crawler modul](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/10354a34)
- [enhancement: Added documentation to missing function in TechAnalyser module](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/0e83925d)
- [enhancement: Added documentation to the Utils module](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/79eb427d)
- [enhancement: Added documentation to the CVEListFetcher module](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/0d64e0c8)
- [enhancement: Added documentation to the BaseCommand class](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/2db1717a)
- [enhancement: Added documentation to the Errors and Flags constant objects](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/556db908)
- [enhancement: Added documentation to the Logger Singleton class](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/2de9bcd6)
- [enhancement: Added documentation to InitCommand module](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/2ffe7731)
- [enhancement: Added documentation to HandleTimeout module](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/f100edc5)
- [enhancement: Added documentation to ExploitsFetcher module](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/6841319c)
- [enhancement: Added documentation to Config class](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/77cb6f81)
- [feat: Added tech no-version counting tests](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/ca31ef33)
- [fix: Changed analyze command name to inspect](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/cf68c5c6)
- [feat: Added function to calculate no version tech](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/9fcb4cd9)
- [fix: Removed double jest dependency](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/3859447e)
- [devops: Added retirejs security analysis to CI pipeline](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/afdcd8d7)
- [feat: Added retirejs setup](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/f7461104)
- [devops: Added custom image to deploy stages that installs building dep](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/01ce2d51)
- [devops: Bumped tool's version to v1.1.0](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/89245f9c)
- [doc: Added Commit History section to CHANGELOG](https://gitlab.com/feup-tbs/ldso1920/t2g1/commit/86c68eef)

------------
------------

## Release 2 - November 2019 Week 2 (version 1.1)

Downloads: [Windows](https://www.dropbox.com/sh/z7cwhf3y0v3cwjl/AADHcpxdUunlB0hM_f1u9sVxa/dist/win?dl=0&subfolder_nav_tracking=1) | [Unix-based Systems](https://www.dropbox.com/sh/z7cwhf3y0v3cwjl/AACfMq8gbIbMzufO4Jo1AfZ9a/dist/wvat-v1.1.0?dl=0&subfolder_nav_tracking=1)

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

------------
------------

## Release 1 - October 2019 Week 4 (version 1.0)

Downloads: [Windows](https://www.dropbox.com/sh/z7cwhf3y0v3cwjl/AADHcpxdUunlB0hM_f1u9sVxa/dist/win?dl=0&subfolder_nav_tracking=1) | [Unix-based Systems](https://www.dropbox.com/sh/z7cwhf3y0v3cwjl/AABVmS2VRE_PhM7p67Ixs6zba/dist/wvat-v1.0.0?dl=0&subfolder_nav_tracking=1)

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