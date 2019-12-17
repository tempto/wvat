Feature: Obtaining CVEs from a set of given technologies
    The user wants to obtain the mapping between technologies and cves

Scenario: The user asks for cves 
    Given the technology "react"
    When the user invokes the tool's cves command
    Then the user is informed with the technologies CVES