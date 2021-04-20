import { UploadedFile } from 'express-fileupload'

const _setFileName = (fileName: string): string => {
  const extension: string = fileName.substr(fileName.lastIndexOf('.')) // > .png
  return `${new Date().getTime()}${extension}` // > 1246548321.png
}

export const saveFileOnStorage = (file: UploadedFile): string => {
  const fileName: string = _setFileName(file.name)
  const storageDir = `${__dirname}/../storage`
  const path = `${storageDir}/${fileName}`
  file.mv(path)
  return fileName
}
