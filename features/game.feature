Feature: Games
    In order to host multiple game sessions
    As a developer
    I must be able to initiate a new game

    Scenario: New game instance can be started
        When a client creates a new game
        Then a game instance id is returned
        And that game is available on a websocket

    Scenario: Game state can be persisted
        Given a client creates a new game
        And participant is connected to an actions socket
        And a game participant performs an action
        When the host is restarted
        And the client connects to game state
        Then the game state is persisted