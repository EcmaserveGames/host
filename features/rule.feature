Feature: Rules
    In order to validate actions and manipulate the current game state
    As a developer
    I must be able to add rules to the game

    Scenario: A rule allows an action to manipulate the game state
        Given a client creates a new game
        And the client is receiving game state messages
        And participant is connected to an actions socket
        When a game participant performs an action
        Then rules are applied to game state
        And game state is updated

    Scenario: A rule disallows an action to be performed
        Given a client creates a new game
        And the client is receiving game state messages
        And participant is connected to an actions socket
        When a game participant performs an action thats not allowed
        Then the action is rejected by rules
        And game state is not updated