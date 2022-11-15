# Url shortener
 this is a simple app that shortens links.
 
## How to run the project

```bash
# first we need to enter the server directory
cd server

# install server dependencies
npm install or yarn install 

# start server at localhost:5000
npm start

# with the server started we need to start the frontend
# returning to the root of the project we will do
cd ../frontend

# install front-end dependencies
npm install or yarn install 

# after the dependencies are installed let's initialize the front-end project
# open project on localhost:5173
npm run dev
```
## front-end test
### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
# to run the test end-to-end it is necessary to start the server
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
