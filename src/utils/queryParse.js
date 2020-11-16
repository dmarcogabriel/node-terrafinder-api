module.exports = {
  propertyQueryParse(query) {
    const mongoQuery = {}

    Object.keys(query).forEach((key) => {
      if (key === 'amount' || key === 'size') {
        const [min, max] = JSON.parse(query[key])

        mongoQuery[key] = { $gte: min, $lte: max }
      } else if (key === 'propertyKind' || key === 'state') {
        mongoQuery[key] = { $eq: query[key] }
      }
    })

    return mongoQuery
  },
}
