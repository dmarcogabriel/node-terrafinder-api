const storageDir = `${__dirname}/../storage`

const setFileName = (fileName) => {
  const extension = fileName.substr(fileName.lastIndexOf('.')) // > .png
  return `${new Date().getTime()}${extension}` // > 1246548321.png
}

module.exports= {
  saveFileOnStorage: (file) => {
    const fileName = setFileName(file.name)
    const path = `${storageDir}/${fileName}`
    file.mv(path)

    return fileName
  },
}
