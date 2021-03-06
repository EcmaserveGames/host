Feature: Server Runtime
    In order to create a game
    As a developer
    I want to be able to start a server

    Scenario: Server startup
        Given server is running
        Then an API is available

    Scenario: Server can add custom routes
        Given server is running
        Then the game can provide their own routes