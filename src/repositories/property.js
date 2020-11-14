const Property = require('../app/models/Property')
const {saveFileOnStorage} = require('../services/fileUpload')

exports.get = async (id = null) => {
  if (id) {
    return Property.findById(id).populate('user')
  }
  const properties = await Property.find()
  const total = await Property.count()

  return {properties, total}
}

exports.create = async data => {
  const property = new Property(data)

  await property.save()

  return property
}

exports.getByUserId = async (userId) => {
  return Property.where('user', userId)
}

exports.delete = async id => Property.findByIdAndRemove(id)

exports.savePhotos = async (files, id) => {
  const property = await Property.findById(id)

  Object.keys(files).forEach(async key => {
    const fileName = saveFileOnStorage(files[key])

    property.photos = [...property.photos, fileName]
  })
  property.updatedAt = Date.now()

  await property.save()
}

exports.getById = async id => Property.findById(id)