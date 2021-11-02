import { UploadedFile, FileArray } from 'express-fileupload'
import { forIn, isArray } from 'lodash'
import PropertyModel, { Property } from '../models/Property'
import { saveFileOnStorage } from '../services/fileUpload.service'
import { parseRangeFilter } from '../utils/filterParser'
import { FarmQueryString } from '../types'

const create = async (data: Property): Promise<Property> => {
  const property = new PropertyModel(data)
  await property.save()
  return property
}

interface GetPropertiesResponse {
  properties: Array<Property>
  total: number
}

const getProperties = async (query: FarmQueryString): Promise<GetPropertiesResponse> => {
  const filter = parseRangeFilter(query)
  const properties = await PropertyModel.find(filter)
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
  await PropertyModel.findByIdAndDelete(id)
}

export default {
  create, getProperties, getByUserId, getById, updatePhotos, deleteProperty,
}
