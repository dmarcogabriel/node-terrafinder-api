export const parseMoney = (value: string | number): number => {
  if (typeof value === 'string') {
    const parsed = parseFloat(
      value.replace(/(\.)/g, '').replace(',', '.'),
    )
    return parsed
  }
  return value
}
