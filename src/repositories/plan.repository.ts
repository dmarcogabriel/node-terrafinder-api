import PlanModel from '../models/Plan'
import { Plan } from '../types'
import propertyRepository from './property/property.repository'

export const createPlan = async (data: Plan): Promise<string> => {
  const plan: Plan = new PlanModel({
    ...data,
    isActive: true,
    activationDate: new Date(),
  })
  await plan.save()
  await propertyRepository.createPlan(plan.property, plan._id)
  return plan._id
}

export const getPropertyPlan = async (propertyId: string): Promise<Plan> => {
  const plan = await PlanModel.findByPropertyId(propertyId)
  return plan
}

export const activatePlan = async (id: string): Promise<Plan> => {
  const plan = await PlanModel.activate(id)
  return plan
}

export const updatePlan = async (id: string, data: Plan): Promise<Plan | null> => {
  const plan = await PlanModel.findById(id)
  if (plan) {
    plan.type = data.type || plan.type
    plan.isActive = data.isActive || plan.isActive
    plan.activationDate = data.activationDate || plan.activationDate
    plan.updatedAt = data.updatedAt || plan.updatedAt
    await plan.save()
    return plan
  }
  return null
}

export const getPlanById = async (id: string): Promise<Plan | null> => {
  const plan = await PlanModel.findById(id)
  if (plan) return plan
  return null
}
