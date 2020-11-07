Feature: Users
    In order to build player context aware rules, masks and mechanics
    As a developer
    I want to be able to identify participants in the game

    Scenario: Identify a user
        Given a client creates a new game
        And the client is receiving game state messages
        When an action is performed by an ineligible participant
        Then the ineligile action is rejected by rules
        And game state is not updated