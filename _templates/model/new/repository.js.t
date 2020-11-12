---
to: src/repositories/<%= name %>.js
unless_exists: true
---
const <%= h.inflection.capitalize(name) %> = require('../app/models/<%= h.inflection.capitalize(name) %>')

exports.get = async (id = null) => {
  if (id) {
    return <%= h.inflection.capitalize(name) %>.findById(id)
  }
  const <%= h.inflection.pluralize(name, 's') %> = await <%= h.inflection.capitalize(name) %>.find()
  const total = await <%= h.inflection.capitalize(name) %>.count()

  return {<%= h.inflection.pluralize(name, 's') %>, total}
}

exports.create = async data => {
  const <%= name %> = new <%= h.inflection.capitalize(name) %>(data)

  await <%= name %>.save()
}

exports.put = (data, id) => {
  const update = {$set: {data}}

  const options = {omitUndefined: true}

  return <%= h.inflection.capitalize(name) %>.findByIdAndUpdate(id, update, options)
}

exports.delete = id => <%= h.inflection.capitalize(name) %>.findByIdAndRemove(id)