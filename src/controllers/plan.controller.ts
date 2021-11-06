import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ResponseBody } from '../interfaces/ResponseBody'
import {
  getUserPlan, createPlan, activatePlan, updatePlan,
} from '../repositories/plan.repository'

export default {
  getByUserId: async (req: Request, res: Response<ResponseBody>): Promise<void> => {
    try {
      const plan = await getUserPlan(req.params.userId)
      res.status(200).json({ message: 'alguma mensagem de sucesso', data: { plan } })
    } catch (error) {
      res.status(500).json({ message: 'alguma mensagem de erro', data: { error } })
    }
  },
  createPlan: async (req: Request, res: Response<ResponseBody>): Promise<void> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ message: 'Invalid', data: errors.array() })
    } else {
      try {
        const planId = await createPlan(req.body)
        res.status(201).json({
          message: 'Plan created successfully.',
          data: { planId },
        })
      } catch (error) {
        res.status(500).json({ message: 'alguma mensagem de erro', data: { error } })
      }
    }
  },
  activatePlan: async (req: Request, res: Response<ResponseBody>): Promise<void> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ message: 'Unable to activate plan', data: errors.array() })
    } else {
      try {
        const plan = await activatePlan(req.params.id)
        res.status(200).json({ message: 'alguma mensagem de sucesso', data: { plan } })
      } catch (error) {
        res.status(500).json({ message: 'alguma mensagem de erro', data: { error } })
      }
    }
  },
  updatePlan: async (req: Request, res: Response<ResponseBody>): Promise<void> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ message: 'Unable to update plan', data: errors.array() })
    } else {
      try {
        const plan = await updatePlan(req.params.id, req.body)
        res.status(200).json({ message: 'alguma mensagem de sucesso', data: { plan } })
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'alguma mensagem de erro', data: { error } })
      }
    }
  },
}
