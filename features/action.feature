Feature: Actions
    In order to facilitate gameplay
    As a developer
    I must be able to receive actions from the game participant

    Scenario: An action can be sent to the game server
        Given participant is connected to an actions socket
        Then an action may be sent