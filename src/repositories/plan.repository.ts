import { forIn } from 'lodash'
import PlanModel from '../models/Plan'
import { Plan } from '../types'
import userRepository from './user'

export const createPlan = async (data: Plan): Promise<string> => {
  const plan: Plan = new PlanModel({
    ...data,
    isActive: true,
    activationDate: new Date(),
  })
  await plan.save()
  await userRepository.changePlan(plan.user, plan._id)
  return plan._id
}

export const getUserPlan = async (userId: string): Promise<Plan> => {
  const plan = await PlanModel.findByUserId(userId)
  return plan
}

export const activatePlan = async (id: string): Promise<Plan> => {
  const plan = await PlanModel.activate(id)
  return plan
}

export const updatePlan = async (id: string, data: Plan): Promise<Plan> => {
  const plan = await PlanModel.findById(id)
  forIn(data, (value, key: keyof Plan) => {
    if (plan[key]) (plan as any)[key] = value // ! this is not the best way of doing this
  })
  await plan.save()
  return plan
}
