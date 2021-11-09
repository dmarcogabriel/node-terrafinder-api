import { UploadedFile, FileArray } from 'express-fileupload'
import { forIn, isArray, isNil } from 'lodash'
import PropertyModel, { Property } from '../../models/Property'
import { saveFileOnStorage, deleteFileFromStorage } from '../../services/fileUpload.service'
import { createPropertyFilter } from '../../utils/filterParser'
import { parseMoney } from '../../utils/moneyParser'
import propertyMapper from './property.mapper'

const create = async (data: Property): Promise<Property> => {
  const property = new PropertyModel(propertyMapper.map({
    ...data,
    amount: parseMoney(data.amount),
    isActive: false,
  }))
  await property.save()
  return property
}

interface GetPropertiesResponse {
  properties: Array<Property>
  total: number
}

const getProperties = async (query: any): Promise<GetPropertiesResponse> => {
  const filter = createPropertyFilter(query)
  const properties = await PropertyModel.find(isNil(filter) ? null : filter)
  const total = await PropertyModel.countDocuments()
  return { properties, total }
}

const getById = async (id: string): Promise<Property> => {
  const property: Property = await PropertyModel.findWithUser(id)
  return property
}

const getByUserId = async (userId: string): Promise<Array<Property>> => {
  const properties = await PropertyModel.findByUserId(userId)
  return properties
}

const updatePhotos = async (files: FileArray, id: string): Promise<void> => {
  const property: Property = await PropertyModel.findById(id)

  forIn(files, (file: UploadedFile | Array<UploadedFile>) => {
    const fileToSave = isArray(file) ? file[0] : file
    const fileName = saveFileOnStorage(fileToSave)
    property.photos = [...property.photos, fileName]
  })

  property.updatedAt = new Date()
  await property.save()
}

const deleteProperty = async (id: string): Promise<void> => {
  const deletedProperty = await PropertyModel.findByIdAndDelete(id)
  if (deletedProperty.photos) {
    deletedProperty.photos.forEach((image) => {
      deleteFileFromStorage(image)
    })
  }
}

const activateProperty = async (id: string): Promise<Property> => {
  const property: Property = await PropertyModel.findWithUser(id)
  property.isActive = true
  property.updatedAt = new Date()
  await property.save()
  return property
}

export default {
  create,
  getProperties,
  getByUserId,
  getById,
  updatePhotos,
  deleteProperty,
  activateProperty,
}
