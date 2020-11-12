---
inject: true
to: src/routes.js
before: module.exports = routes
---
routes.post('/<%= name %>s', <%= name %>Controller.create)
routes.get('/<%= name %>s', <%= name %>Controller.getAll)
routes.get('/<%= name %>s/:id', <%= name %>Controller.getById)
routes.put('/<%= name %>s/:id', <%= name %>Controller.update)
routes.delete('/<%= name %>s/:id', <%= name %>Controller.delete)
