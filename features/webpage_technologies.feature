Feature: Obtaining webpage technologies
    The user wants to obtain the technologies used on a webpage

Scenario: The user asks for webpage technologies 
    Given the webpage "http://google.com"
    When the user invokes the tool's inspect command
    Then the user is informed with webpage technologies