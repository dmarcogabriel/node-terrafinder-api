---
to: src/app/models/<%= h.inflection.capitalize(name) %>.js
unless_exists: true
---
const {Schema, model} = require('mongoose')

const <%= h.inflection.capitalize(name) %>Schema = new Schema({
  updatedAt: {type: Date, default: Date.now()},
  createdAt: {type: Date, default: Date.now()},
})

module.exports = model('<%= h.inflection.capitalize(name) %>', <%= h.inflection.capitalize(name) %>Schema)
