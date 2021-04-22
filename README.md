# Terrafinder API

## Config

Make shure you have a mongodb server.

Create a `.env` file and run the scripts below. 

## Scripts:

To install node_modules run:

`$ npm i`

To start app run:

`$ npm run dev`

## Architecture

The application code architecture is commonly used by the community, containing 
3 main layers that are `services`, `controllers` and `routes`:

```
src/
 |
 -- __tests__/: contains the the hole application testing suites
 -- config/: it contains the application core configuration
 -- controllers/: contains the controllers of the application
 -- models/: here is where the database models are located
 -- repositories/: this is the layer that access the database (crud)
 -- routes/: here is stored all the application routes
 -- services/: contains the application services
 -- utils/: contains the application utilities, validators, parsers and helpers
 ```

## TO DO:
* Add an index page
* Add an api/ index page
* Add routes to README file