# stablepay-dev

## Starting the dApp

To start the app simply write:

```npm i && npm start```

The dApp will receive connections at: http://localhost:8080

## Tests

To run tests (backend and frontend) simply do:

```npm test```

## Server routes

* Backend code /server/dai.js
* Frontend code /frontend/index.js

## Backend API

To query directly the DAI balance of the address:

* Route: http://localhost:3000/balance/:address
* Method: GET
* Param: ETH address
* Response:

```
    {
      success: true,
      DAIBalance: {},
      TokenInfo: {}
    }
```