Feature: Obtaining the tool help
    The user wants to obtain help information on how to run the tool

Scenario: The user asks for help regarding tool's usage
    When the user invokes the tool using the "--help" flag
    Then the user is informed with the tool's version, usage and available commands
