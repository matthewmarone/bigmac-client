# Big Mac Test - Client

Created for Mr. Casey Stein, who presumably loves cheeseburgers. 

Jump to:

- [About the App](#about)
- [Install and Run](#install-and-run)
- [Available Scripts](#available-scripts)

The following client is written in [React](https://reactjs.org/) and is built to work with the Node.js/GraphQL [Big Mac Test Server](https://github.com/matthewmarone/big-mac-test-server).  If you haven’t already, please first install and launch the the Big Mac Test Sever [here](https://github.com/matthewmarone/big-mac-test-server).

## About the App

This test client attempts to demonstrate the following, but not limited to:

1. An understanding of the basic concepts of React:
   - Simple modular design using React Components
   - State management with React Hooks
2. A well laid out project
   - Although a simple project, the app was built in such a way that it would be easy to add new "calculator views" quickly in the future, leveraging some of the same components needed for the Big Mac Calculator. 
3. A Cache first design
   - This App uses the industry leading [Apollo GraphQL](https://www.apollographql.com/docs/react/) client to query, cache, and persist the server's response(s).
   - After the first download the user can continue to refresh the page, even with the server turned off. Upon each refresh, the client attempts a single "base query" to update it's locally persisted cache of the big mac index, however, the client is still able to use the calculator with the previously cached index while it waits for possible changes from the server.
4. Unit testing 
   - Testing React components with Jest
5. Other
   - **Mobile first**, and laid out in such a way that it would be easy to add ADA compliance later.  Matthew is not an ADA Compliance expert, but willing to learn and/or self teach!
   - Theming, there is a theme folder where all colors and styles could be globally modified based on [MaterialUI's Theming](https://material-ui.com/customization/theming/)

## Install and Run

**_Note: It is required to first install and run the_** [Big Mac Test Server](https://github.com/matthewmarone/big-mac-test-server)

```
git clone https://github.com/matthewmarone/bigmac-client.git
npm install
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
