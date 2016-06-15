Feature:
  In order to get compensation for the work on a project
  As a project member
  I want to exchange some of my tokens to fiat currency

  Scenario:
    Given a project owned by "0x9a9f2672a4563a7f20b63831a731ccd01afa7f33" with initial tokens of 200
    Given a member "0xf169ef68f693bd67473387e2a8bbec2005279db3" has 20 tokens
    When member "0xf169ef68f693bd67473387e2a8bbec2005279db3" exchanges 10 tokens to euro
    Then member "0xf169ef68f693bd67473387e2a8bbec2005279db3" has 10 tokens