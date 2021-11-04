import { parseMoney } from '../moneyParser'

describe('utils/moneyParser', () => {
  describe('parseMoney', () => {
    it('should format correctly', () => {
      expect(parseMoney('1.444,33')).toEqual(1444.33)
    })

    it('should format correctly high value', () => {
      expect(parseMoney('999.991.444,33')).toEqual(999991444.33)
    })

    it('should format correctly low value', () => {
      expect(parseMoney('3,33')).toEqual(3.33)
    })
  })
})
