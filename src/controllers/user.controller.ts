import { Request, Response } from 'express'
import { isArray } from 'lodash'
import repository from '../repositories/user'
import { ResponseBody } from '../interfaces/ResponseBody'

const get = async (_: Request, res: Response<ResponseBody>): Promise<void> => {
  try {
    const users = await repository.getAll()
    res.status(200).json({ message: 'OK', data: { users } })
  } catch (error) {
    res.status(500).json({ message: 'not ok', data: { error } })
  }
}

const post = async (req: Request, res: Response<ResponseBody>): Promise<void> => {
  try {
    const userId = await repository.create(req.body)
    res.status(201).json({
      message: 'User created successfully.',
      data: { userId },
    })
  } catch (error) {
    res.status(500).json({ message: 'not ok', data: { error } })
  }
}

const getById = async (req: Request, res: Response<ResponseBody>): Promise<void> => {
  try {
    const user = await repository.findById(req.params.id)
    res.status(200).json({ message: 'ok', data: { user } })
  } catch (error) {
    res.status(500).json({ message: 'not ok', data: { error } })
  }
}

const uploadFile = async (req: Request, res: Response<ResponseBody>): Promise<void> => {
  if (!req.files && !req.params.id) {
    res.status(400).json({ message: 'Nenhuma imagem foi selecionada' })
  } else {
    try {
      const { params, files } = req
      const file = isArray(files.avatar) ? files.avatar[0] : files.avatar
      const avatar = await repository.updateAvatar(file, params.id)

      res.status(201).json({
        message: 'Imagem adicionada com sucesso',
        data: { avatar },
      })
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro ao fazer upload',
        data: { error },
      })
    }
  }
}

const updatePlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { plan } = req.body
    const { id } = req.params
    const user = await repository.changePlan(id, plan)

    res.status(200).json({
      message: 'Plano atualizado com sucesso!',
      data: { user },
    })
  } catch (error) {
    res.status(500).json({
      message: 'Ocorreu um erro ao atualizar o plano',
      data: { error },
    })
  }
}

export default {
  get, getById, post, uploadFile, updatePlan,
}
