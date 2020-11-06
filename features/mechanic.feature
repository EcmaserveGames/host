Feature: Mechanic
    In order manipulate the current game state
    As a developer
    I must be able to add game mechanics to drive the game play

    Scenario: A game mechanic manipulates game state
        Given the client is receiving game state messages
        And participant is connected to an actions socket
        When a game participant performs an action
        Then the game mechanic is carried out
        And game state is updated