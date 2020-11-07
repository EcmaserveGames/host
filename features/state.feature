Feature: State
    In order to keep the UI in sync
    As a developer
    I want my connected socket to receiver game state from controlling web server

    Scenario: State update broadcasts to all connections on a game
        Given a client creates a new game
        And the client is receiving game state messages
        When an action is performed
        Then the game state is emitted on all connections

    