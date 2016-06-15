Feature: Creating a project
  In order to compensate members of a project
  As blocklab
  We want to publicly keep track of its members contributions

  Scenario:
    Given a prospect project owner "0x9a9f2672a4563a7f20b63831a731ccd01afa7f33"
    Given an amount of initial tokens 200
    When blocklab creates a project
    Then the project-owner holds 200 tokens

  Scenario Outline:
    Given a prospect project owner <owner>
    Given an amount of initial tokens <tokens>
    When blocklab creates a project
    Then the project-owner holds <tokens> tokens
    Then the project has the id <project_id>

    Examples:
      | owner                                        | tokens | project_id |
      | "0x9a9f2672a4563a7f20b63831a731ccd01afa7f33" | 150    | 1          |
      | "0xf169ef68f693bd67473387e2a8bbec2005279db3" | 1000   | 2          |