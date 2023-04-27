# Passfort Tech Challenge - React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup
- npm install
- create .env.local file in the root directory with your api url in e.g. API_URL="http://localhost:5003/"
- npm start

## Available Scripts


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## If i'd have had more time
- I'd have added some e2e tests using cypress
- More thorough tests surrounding the markdown formatting, and routing
- Implemented being able to add a new revision

## Approach
- I tried to keep all components as small and reusable as possible
- I tried to account for api errors, and loading states
- I would have used react-refetch, but I was getting an error with it and react 18 and as this task has a time limit, I used react-query instead to save time.
- I toyed with using typescript, usually I would have done this but today I just used js and proptypes, again to save time.

Look forward to receving your feedback!