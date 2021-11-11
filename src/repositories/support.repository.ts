import SupportModel from '../models/support.model'
import { Support } from '../types'

export default {
  async createMessage(data: Support): Promise<string> {
    const support = new SupportModel(data)
    await support.save()
    return support._id
  },
}
