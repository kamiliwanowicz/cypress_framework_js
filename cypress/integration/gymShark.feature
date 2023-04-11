Feature: Gym Shark website tests

    @GymSharkTestOne
    Scenario: Add a random product from Mens New Releases
    Given I go to Mens New Releases
    When I add a random item to the basket
    Then I verify that the item has been added successfully
    And I verify values on checkout