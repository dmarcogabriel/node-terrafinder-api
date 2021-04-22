---
to: src/routes/<%= h.inflection.camelize(name, true) %>.routes.ts
unless_exists: true
---
import { Router } from 'express'
import {
  post, get, getById, put, remove,
} from '../controllers/<%= h.inflection.camelize(name, true) %>.controller'

export const create<%= h.inflection.capitalize(name) %>Routes = (router: Router): void => {
  router.post('/<%= h.inflection.dasherize(h.inflection.pluralize(name)) %>', post)
  router.get('/<%= h.inflection.dasherize(h.inflection.pluralize(name)) %>', get)
  router.get('/<%= h.inflection.dasherize(h.inflection.pluralize(name)) %>/:id', getById)
  router.put('/<%= h.inflection.dasherize(h.inflection.pluralize(name)) %>', put)
  router.delete('/<%= h.inflection.dasherize(h.inflection.pluralize(name)) %>', remove)
}
