import { Request, Response } from 'express'
import { ResponseBody } from '../interfaces/ResponseBody'
import {
  getPropertyPlan, createPlan, activatePlan, updatePlan,
} from '../repositories/plan.repository'

export default {
  getByPropertyId: async (req: Request, res: Response<ResponseBody>): Promise<void> => {
    try {
      const plan = await getPropertyPlan(req.params.propertyId)
      res.status(200).json({ message: 'alguma mensagem de sucesso', data: { plan } })
    } catch (error) {
      res.status(500).json({ message: 'alguma mensagem de erro', data: { error } })
    }
  },
  createPlan: async (req: Request, res: Response<ResponseBody>): Promise<void> => {
    try {
      const planId = await createPlan(req.body)
      res.status(201).json({
        message: 'Plan created successfully.',
        data: { planId },
      })
    } catch (error) {
      res.status(500).json({ message: 'alguma mensagem de erro', data: { error } })
    }
  },
  activatePlan: async (req: Request, res: Response<ResponseBody>): Promise<void> => {
    try {
      const plan = await activatePlan(req.params.id)
      res.status(200).json({ message: 'alguma mensagem de sucesso', data: { plan } })
    } catch (error) {
      res.status(500).json({ message: 'alguma mensagem de erro', data: { error } })
    }
  },
  updatePlan: async (req: Request, res: Response<ResponseBody>): Promise<void> => {
    try {
      const plan = await updatePlan(req.params.id, req.body)
      res.status(200).json({ message: 'alguma mensagem de sucesso', data: { plan } })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'alguma mensagem de erro', data: { error } })
    }
  },
}
