const _rangeValidator = (amount, min, max) => amount >= min && amount <= max
const _defaultValidator = (value, compValue) => value === compValue

module.exports = {
  filtersObj: {
    amount: _rangeValidator,
    size: _rangeValidator,
    propertyKind: _defaultValidator,
    state: _defaultValidator,
  },
}
