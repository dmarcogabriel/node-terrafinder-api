import { UploadedFile, FileArray } from 'express-fileupload'
import { forIn, isArray, isNil } from 'lodash'
import PropertyModel, { Property } from '../../models/Property'
import { saveFileOnStorage, deleteFileFromStorage } from '../../services/fileUpload.service'
import { createPropertyFilter } from '../../utils/filterParser'
import propertyMapper from './property.mapper'
import { parseMoney } from '../../utils/moneyParser'

const create = async (data: Property): Promise<Property> => {
  const property = new PropertyModel(propertyMapper.map({
    ...data,
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

const updateProperty = async (id: string, data: Property): Promise<Property> => {
  const property = await PropertyModel.findById(id)

  if (data.name) property.name = data.name
  if (data.ownerName) property.ownerName = data.ownerName
  if (data.description) property.description = data.description
  if (data.propertyKind) property.propertyKind = data.propertyKind
  if (data.nearbyCity) property.nearbyCity = data.nearbyCity
  if (data.cep) property.cep = data.cep
  if (data.amount) property.amount = parseMoney(data.amount)
  if (data.size) property.size = data.size
  if (data.state) property.state = data.state
  if (data.farming) property.farming = data.farming
  if (data.activities) property.activities = data.activities
  if (data.presentationPhoto) property.presentationPhoto = data.presentationPhoto
  if (data.photos) property.photos = data.photos
  if (data.isActive) property.isActive = data.isActive

  await property.save()
  return property
}

interface GetFiltersResponse {
  kinds: string[]
  states: string[]
  sizes: string[]
}

const getFilters = async (query: any): Promise<GetFiltersResponse> => {
  const removeDuplicatedFilters = <T>(options: T[]) => options.filter(
    (option, i, optionList) => i === optionList.indexOf(option),
  )
  const properties = await PropertyModel.find(createPropertyFilter(query))

  const propertyKinds: string[] = removeDuplicatedFilters<string>(
    properties.map((property) => property.propertyKind),
  )
  const propertyStates: string[] = removeDuplicatedFilters<string>(
    properties.map((property) => property.state),
  )
  const propertySizes: string[] = removeDuplicatedFilters<string>(
    properties.map((property) => property.size),
  )

  return {
    kinds: ['', ...propertyKinds],
    states: ['', ...propertyStates],
    sizes: ['', ...propertySizes],
  }
}

export default {
  create,
  getProperties,
  getByUserId,
  getById,
  updatePhotos,
  deleteProperty,
  activateProperty,
  updateProperty,
  getFilters,
}
