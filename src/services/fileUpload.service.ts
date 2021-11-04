import { UploadedFile } from 'express-fileupload'
import fs from 'fs-extra'
import path from 'path'

const _storageDir = path.join(__dirname, '..', 'storage')

const _setFileName = (fileName: string): string => {
  const extension: string = fileName.substr(fileName.lastIndexOf('.')) // > .png
  return `${new Date().getTime()}${extension}` // > 1246548321.png
}

export const saveFileOnStorage = (file: UploadedFile): string => {
  const fileName: string = _setFileName(file.name)
  file.mv(path.join(_storageDir, fileName))
  return fileName
}

export const deleteFileFromStorage = (fileName: string): boolean => {
  try {
    fs.unlinkSync(path.join(_storageDir, fileName))
    console.log(`File ${fileName} deleted!`)
    return true
  } catch (error) {
    console.error(`Failed to delete file: ${fileName}`)
    console.error(error.message)
    return false
  }
}
