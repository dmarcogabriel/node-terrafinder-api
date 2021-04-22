---
inject: true
to: src/routes/index.ts
before: const router = Router()
---
import { create<%= h.inflection.capitalize(name) %>Routes } from './<%= h.inflection.camelize(name, true) %>.routes'
