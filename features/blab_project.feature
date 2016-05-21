Feature: Creating a project
  In order to compensate members of a project
  As blocklab
  We want to publicly keep track of its members contributions

  Scenario:
    Given a prospect project owner "0x9a9f2672a4563a7f20b63831a731ccd01afa7f33"
    Given an amount of initial tokens 200
    When blocklab creates a project
    Then the project-owner holds 200 tokens