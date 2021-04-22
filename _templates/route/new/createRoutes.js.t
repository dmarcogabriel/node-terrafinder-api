---
inject: true
to: src/routes/index.ts
before: export default router
---
create<%= h.inflection.capitalize(name) %>Routes(router)
