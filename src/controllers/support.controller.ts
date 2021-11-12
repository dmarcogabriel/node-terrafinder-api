import { Request, Response } from 'express'
import supportRepository from '../repositories/support.repository'

export default {
  createSupport: async (req: Request, res: Response): Promise<void> => {
    try {
      await supportRepository.createMessage(req.body)
      res.status(201).json({
        message: 'Support message created successfully.',
      })
    } catch (error) {
      console.error('support.controller > createSupport', error)
      res.status(500).json({ message: 'alguma mensagem de erro', data: { error } })
    }
  },

}
