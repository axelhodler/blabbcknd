Feature: Adding members to a project
  In order to keep track of the contributions of project members
  As the project manager
  I want to assign tokens to individual members

  Scenario:
    Given a project owner "0x9a9f2672a4563a7f20b63831a731ccd01afa7f33"
    When adding the member "0xf169ef68f693bd67473387e2a8bbec2005279db3" to the project
    Then "0xf169ef68f693bd67473387e2a8bbec2005279db3" owns 0 tokens in the project