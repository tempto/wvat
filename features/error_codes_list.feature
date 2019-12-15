Feature: Obtaining the tool error codes list
    The user wants to obtain the list of all the tool's possible error codes

Scenario: The user asks for a list of all the tool's possible error codes
    When the user invokes the tool's error-codes command
    Then the user is informed with a list of the tool's possible error codes