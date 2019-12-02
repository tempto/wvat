Feature: Obtaining meaningfull exit codes from the tool
    The user wants to obtain different error codes for tool's success and failure scenarios

Scenario: The application ran sucessfully
    Given the tool executed sucessfully
    When the tool's execution finishes
    Then the tool's return code is equal to "0"

Scenario: The application's execution fails
    When the tool's execution fails
    Then the tool's return code is different than "0"
