# Linkit
## Overview
Linkit is a basic LinkTree clone but with a couple of differences. First is that the link pamphlet that is generated will need to expire after some duration, and second is that you can make anonymous circulars. This project will be built with Next.js, React, and GraphQL.

## User Requirements
The project should allow the user to do the below at the minimum:
- make a pamphlet with multiple links with different names
- make a pamphlet without having to register

Secondary requirements for the project expand on the above by letting the user do the below:
- create an account using existing socials(FB, Google, etc) and create/ read/ update/ delete pamphlets attached to said account
- delete your account

## Technical Requirements
The project has the below requirements:
- deploys via CI and automates tags
- uses GraphQL instead of the traditional REST API
- uses Prettier and pre-commit hooks
- if user auth is involved, use Permit or Grant instead of Passport
- deploys thru Heroku

## Roadmap
Initial roadmap looks roughly like the below:
```
  init research -> basic backend set up -> set up the React app -> set up adding anonymous pamphlets -> set up proper data flow
```
This would probably let us hit v0.5.0 and probably would take 2-3 months(underestimates not withstanding).