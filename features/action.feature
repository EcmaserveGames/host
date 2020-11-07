Feature: Actions
    In order to facilitate gameplay
    As a developer
    I must be able to receive actions from the game participant

    Scenario: An action can be sent to the game server
        Given a client creates a new game
        And participant is connected to an actions socket
        Then an action may be sent
        And a response message will be returned