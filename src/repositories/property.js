const Property = require('../models/Property')
const { saveFileOnStorage } = require('../services/fileUpload')
const { propertyQueryParse } = require('../utils/queryParse')

exports.create = async (data) => {
  const property = new Property(data)
  await property.save()
  return property
}

exports.get = async (query) => {
  const properties = await Property.find()
  const total = await Property.countDocuments()
  if (Object.keys(query).length) {
    const filtered = await Property.find(propertyQueryParse(query))
    return { properties: filtered }
  }
  return { properties, total }
}

exports.getById = async (id) => Property.findById(id).populate('user')

exports.getByUserId = async (userId) => Property.where('user', userId)

exports.savePhotos = async (files, id) => {
  const property = await Property.findById(id)
  Object.keys(files).forEach(async (key) => {
    const fileName = saveFileOnStorage(files[key])
    property.photos = [...property.photos, fileName]
  })
  property.updatedAt = Date.now()
  await property.save()
}
