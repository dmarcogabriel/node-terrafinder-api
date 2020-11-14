const Property = require('../app/models/Property')
const { saveFileOnStorage } = require('../services/fileUpload')
const { filtersObj } = require('../utils/filters')

exports.get = async (query) => {
  const properties = await Property.find()
  const total = await Property.countDocuments()

  if (Object.keys(query).length) {
    const filteredProperties = Object.keys(query)
      .map((key) => properties.filter((property) => filtersObj(property[key])))

    return { properties: filteredProperties }
  }

  return { properties, total } // todo: ver o que está vindo no total
}

exports.create = async (data) => {
  const property = new Property(data)

  await property.save()

  return property
}

exports.getByUserId = async (userId) => Property.where('user', userId)

exports.delete = async (id) => Property.findByIdAndRemove(id)

exports.savePhotos = async (files, id) => {
  const property = await Property.findById(id)

  Object.keys(files).forEach(async (key) => {
    const fileName = saveFileOnStorage(files[key])

    property.photos = [...property.photos, fileName]
  })
  property.updatedAt = Date.now()

  await property.save()
}

exports.getById = async (id) => Property.findById(id).populate('user')
