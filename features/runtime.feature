Feature: Server Runtime
    In order to create a game
    As a developer
    I want to be able to start a server

    Scenario: Server startup
        Given server is running
        Then a websocket is available
        And an API is available