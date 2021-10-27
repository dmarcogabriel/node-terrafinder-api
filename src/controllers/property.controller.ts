import { Request, Response } from 'express'
import repository from '../repositories/property'

const post = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await repository.create(req.body)
    res.status(201)
      .json({ message: 'Anúncio criado com sucesso!', data: { property } })
  } catch (error) {
    res.status(500).json({
      message: '[Error] failed to save property',
      data: { error },
    })
  }
}

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { properties, total } = await repository.getProperties(req.query)

    res.status(200).json({
      message: 'ok',
      data: { properties, total },
    })
  } catch (err) {
    res.send(err)
  }
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  try {
    const property = await repository.getById(id)

    if (!property) {
      res.status(400).json({
        message: 'Propriedade não encontrada',
      })
    } else {
      res.status(200).json({ message: 'ok', data: { property } })
    }
  } catch (error) {
    res.status(500).json({
      message: '[Error] Malformed id',
      data: { error },
    })
  }
}

const getAllByUserId = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params

  try {
    const properties = await repository.getByUserId(userId)

    if (!properties.length) {
      res.status(404).json({
        message: 'Propriedade não encontrada',
      })
    } else {
      res.status(200).json({ message: 'ok', data: { properties } })
    }
  } catch (error) {
    res.status(500).json({
      message: '[Error] Malformed id',
      data: { error },
    })
  }
}

const updatePropertyPhotos = async (req: Request, res: Response): Promise<void> => {
  if (!req.files && !req.params.id) {
    res.status(400).json({ message: 'Nenhuma imagem foi selecionada' })
  }

  try {
    const { files, params } = req
    await repository.updatePhotos(files, params.id)

    res.status(201).json({
      message: 'Imagem adicionada com sucesso',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Ocorreu um erro ao fazer upload',
      data: { error },
    })
  }
}

const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Falta o parametro ID' })
  }

  try {
    await repository.deleteProperty(req.params.id)
    res.status(201).json({
      message: 'Deletado com sucesso',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Ocorreu um erro ao deletar',
    })
  }
}

export default {
  getAll,
  getById,
  getAllByUserId,
  post,
  deleteProperty,
  updatePropertyPhotos,
}
