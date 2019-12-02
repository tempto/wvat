Feature: Obtaining the tool version
    The user wants to obtain the tool's version

Scenario: The tool version is available
    When the user invokes the tool with the "--version" flag
    Then the user is informed with the tool's version
