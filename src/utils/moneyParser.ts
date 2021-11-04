export const parseMoney = (value: string | number): number => {
  if (typeof value === 'string') {
    return parseFloat(
      value.replace(/(\.)/g, '').replace(',', '.'),
    )
  }
  return value
}
