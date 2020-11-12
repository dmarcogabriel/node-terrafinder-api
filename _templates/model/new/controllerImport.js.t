---
inject: true
to: src/routes.js
after: express
---
const <%= name %>Controller = require('../controllers/<%= name %>')