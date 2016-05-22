Feature: Adding members to a project
  In order to keep track of the contributions of project members
  As the project manager
  I want to assign tokens to individual members

  Scenario:
    Given a project owner "0x9a9f2672a4563a7f20b63831a731ccd01afa7f33"
    When adding the member "0xf169ef68f693bd67473387e2a8bbec2005279db3" to the project
    Then "0xf169ef68f693bd67473387e2a8bbec2005279db3" owns 0 tokens in the project

  Scenario:
    Given a project owned by "0x9a9f2672a4563a7f20b63831a731ccd01afa7f33" with initial tokens of 200
    Given a project member "0xf169ef68f693bd67473387e2a8bbec2005279db3"
    When assigning 20 tokens to the member "0xf169ef68f693bd67473387e2a8bbec2005279db3"
    Then member "0xf169ef68f693bd67473387e2a8bbec2005279db3" has 20 tokens
    Then the project he participates in has 180 tokens

  Scenario Outline:
    Given a project owned by <owner> with initial tokens of <initial_tokens>
    Given a project member <member>
    When assigning <assigned_tokens> tokens to the member <member>
    When assigning <assigned_tokens> tokens to the member <member>
    Then member <member> has <assigned_tokens> tokens
    Then the project he participates in has <project_available_tokens> tokens

    Examples:
      | owner                                        | initial_tokens | member                                       | assigned_tokens | project_available_tokens |
      | "0x9a9f2672a4563a7f20b63831a731ccd01afa7f33" | 200            | "0x1aa57f91504ea0956ccb6ccf80e5d030cd69bef2" | 50              | 100                      |
      | "0xf169ef68f693bd67473387e2a8bbec2005279db3" | 1000           | "0x961b471ef34a6c010d3c2ee94dd77d4d23352cc3" | 200             | 600                      |

  Scenario:
    Given a project owned by "0x9a9f2672a4563a7f20b63831a731ccd01afa7f33" with initial tokens of 200